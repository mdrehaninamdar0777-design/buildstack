/**
 * BuildStack Frontend API Client
 *
 * Provides a centralized HTTP fetch wrapper that communicates with the Express backend.
 *
 * Security & Design Rules:
 * - Uses NEXT_PUBLIC_API_URL with http://localhost:5000 as fallback.
 * - Obtains Firebase ID tokens on demand via the client Firebase Auth SDK.
 * - NEVER stores authentication tokens in localStorage or sessionStorage.
 * - Attaches tokens as `Authorization: Bearer <token>` on protected endpoints.
 * - Handles JSON and text error responses gracefully with clear error messages.
 * - Contains NO server secrets or Firebase Admin SDK references.
 */

import { auth } from "./firebase";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

/**
 * Obtain a fresh Firebase ID token directly from the in-memory Firebase auth state.
 * Returns null if no user is currently authenticated.
 *
 * @param {boolean} [forceRefresh=false] - force token refresh
 * @returns {Promise<string|null>}
 */
export async function getAuthToken(forceRefresh = false) {
  if (!auth.currentUser) return null;
  try {
    return await auth.currentUser.getIdToken(forceRefresh);
  } catch (err) {
    console.error("[API] Failed to retrieve Firebase ID token:", err);
    return null;
  }
}

/**
 * Base fetch utility with automatic token injection and structured error handling.
 *
 * @param {string} endpoint - API path (e.g. "/api/users/sync") or full URL
 * @param {Object} [options={}] - Fetch configuration options
 * @param {boolean} [options.requiresAuth=true] - Whether to attach the Authorization header
 * @param {string} [options.token] - Optional explicit ID token (e.g. immediately after signup/login)
 * @param {Object} [options.headers] - Additional HTTP headers
 * @param {any} [options.body] - Request body (plain objects are automatically JSON serialized)
 * @returns {Promise<any>}
 */
export async function apiFetch(endpoint, options = {}) {
  const {
    requiresAuth = true,
    token: explicitToken,
    headers = {},
    body,
    ...fetchOptions
  } = options;

  const url =
    endpoint.startsWith("http://") || endpoint.startsWith("https://")
      ? endpoint
      : `${API_BASE_URL.replace(/\/+$/, "")}/${endpoint.replace(/^\/+/, "")}`;

  const requestHeaders = {
    ...headers,
  };

  // Determine token to attach
  let token = explicitToken;
  if (!token && requiresAuth) {
    token = await getAuthToken();
  }

  if (token) {
    requestHeaders["Authorization"] = `Bearer ${token}`;
  } else if (requiresAuth && explicitToken === undefined && !auth.currentUser) {
    // If auth is explicitly required and user is definitely not signed in
    // we still attempt the call if callers didn't strictly forbid it,
    // or the server will return 401.
  }

  // Handle JSON serialization for plain object bodies
  let requestBody = body;
  if (
    body &&
    typeof body === "object" &&
    !(body instanceof FormData) &&
    !(body instanceof Blob) &&
    !(body instanceof URLSearchParams)
  ) {
    requestHeaders["Content-Type"] =
      requestHeaders["Content-Type"] || "application/json";
    requestBody = JSON.stringify(body);
  }

  let response;
  try {
    response = await fetch(url, {
      ...fetchOptions,
      headers: requestHeaders,
      body: requestBody,
    });
  } catch (networkErr) {
    console.error("[API] Network request failed:", {
      url,
      method: fetchOptions.method || "GET",
      error: networkErr?.message || String(networkErr),
    });

    const err = new Error(
      `Unable to connect to backend server at ${API_BASE_URL}. Please ensure the server is running.`
    );
    err.original = networkErr;
    err.isNetworkError = true;
    throw err;
  }

  const contentType = response.headers.get("content-type");
  const isJson = contentType && contentType.includes("application/json");
  let data;
  try {
    data = isJson ? await response.json() : await response.text();
  } catch (parseErr) {
    console.error("[API] Failed to parse response body:", parseErr?.message);
    data = null;
  }

  if (!response.ok) {
    const message =
      (isJson && data?.message) ||
      (typeof data === "string" && data.length < 200 ? data : null) ||
      response.statusText ||
      `Request failed with status ${response.status}`;

    console.warn("[API] HTTP error response:", {
      url,
      status: response.status,
      message,
    });

    const error = new Error(message);
    error.status = response.status;
    error.data = data;
    error.isHttpError = true;
    throw error;
  }

  return data;
}

/**
 * Synchronize the authenticated Firebase user with MongoDB Atlas.
 * Calls POST /api/users/sync with the user's Firebase ID token.
 *
 * @param {Object} [payload={}] - Optional user attributes, e.g. { displayName: "..." }
 * @param {string} [token] - Optional explicit ID token
 * @returns {Promise<{ success: boolean, user: Object }>}
 */
export async function syncUserWithBackend(payload = {}, token = null) {
  return await apiFetch("/api/users/sync", {
    method: "POST",
    token,
    requiresAuth: true,
    body: payload,
  });
}

/**
 * Retrieve the current authenticated user's MongoDB profile.
 * Calls GET /api/users/me.
 *
 * @param {string} [token] - Optional explicit ID token
 * @returns {Promise<{ success: boolean, user: Object }>}
 */
export async function getCurrentUserProfile(token = null) {
  return await apiFetch("/api/users/me", {
    method: "GET",
    token,
    requiresAuth: true,
  });
}

/**
 * Update the authenticated user's MongoDB profile.
 * Calls PUT /api/users/me with only the allowed fields.
 *
 * Allowed fields: name, role, bio, location, avatar, skills, links
 * Any other key is silently stripped by the server.
 *
 * @param {Object} payload - Profile fields to update
 * @param {string} [token] - Optional explicit ID token
 * @returns {Promise<{ success: boolean, user: Object }>}
 */
export async function updateUserProfile(payload = {}, token = null) {
  return await apiFetch("/api/users/me", {
    method: "PUT",
    token,
    requiresAuth: true,
    body: payload,
  });
}

/**
 * Retrieve the current authenticated user's dashboard statistics and progress.
 * Calls GET /api/users/me/dashboard.
 *
 * @param {string} [token] - Optional explicit ID token
 * @returns {Promise<{ success: boolean, dashboard: Object }>}
 */
export async function getDashboardStats(token = null) {
  return await apiFetch("/api/users/me/dashboard", {
    method: "GET",
    token,
    requiresAuth: true,
  });
}

const api = {
  apiFetch,
  getAuthToken,
  syncUserWithBackend,
  getCurrentUserProfile,
  updateUserProfile,
  getDashboardStats,
};

export default api;

