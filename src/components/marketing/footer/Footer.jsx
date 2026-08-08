import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-white px-6 pb-10 pt-16 lg:px-10">
      <div className="mx-auto max-w-7xl">

        {/* Main Footer */}
        <div className="grid gap-12 border-b border-neutral-200 pb-12 md:grid-cols-2 lg:grid-cols-5">

          {/* Brand */}
          <div className="lg:col-span-2">

            <Link
              href="/"
              className="inline-flex items-center gap-2"
            >
              <span className="text-xl font-bold text-neutral-900">
                ◈
              </span>

              <span className="text-xl font-bold tracking-tight text-neutral-900">
                BuildStack
              </span>
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-6 text-neutral-500">
              Your roadmap to becoming a better developer.
            </p>

            {/* Social Icons */}
            <div className="mt-6 flex items-center gap-4">

              <a
                href="#"
                aria-label="GitHub"
                className="text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-900"
              >
                GitHub
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-900"
              >
                LinkedIn
              </a>

              <a
                href="#"
                aria-label="X"
                className="text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-900"
              >
                X
              </a>

              <a
                href="#"
                aria-label="YouTube"
                className="text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-900"
              >
                YouTube
              </a>

            </div>

          </div>

          {/* Platform */}
          <div>
            <h3 className="text-sm font-semibold text-neutral-900">
              Platform
            </h3>

            <ul className="mt-5 space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-sm text-neutral-500 hover:text-neutral-900"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/learn"
                  className="text-sm text-neutral-500 hover:text-neutral-900"
                >
                  Learn
                </Link>
              </li>

              <li>
                <Link
                  href="/roadmaps"
                  className="text-sm text-neutral-500 hover:text-neutral-900"
                >
                  Roadmaps
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className="text-sm text-neutral-500 hover:text-neutral-900"
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="text-sm text-neutral-500 hover:text-neutral-900"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-neutral-900">
              Resources
            </h3>

            <ul className="mt-5 space-y-3">
              <li>
                <Link
                  href="/roadmaps"
                  className="text-sm text-neutral-500 hover:text-neutral-900"
                >
                  All Roadmaps
                </Link>
              </li>

              <li>
                <Link
                  href="/bookmarks"
                  className="text-sm text-neutral-500 hover:text-neutral-900"
                >
                  Bookmarks
                </Link>
              </li>

              <li>
                <Link
                  href="/notes"
                  className="text-sm text-neutral-500 hover:text-neutral-900"
                >
                  Notes
                </Link>
              </li>

              <li>
                <Link
                  href="/progress"
                  className="text-sm text-neutral-500 hover:text-neutral-900"
                >
                  Progress
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-neutral-900">
              Legal
            </h3>

            <ul className="mt-5 space-y-3">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-neutral-500 hover:text-neutral-900"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  href="/terms"
                  className="text-sm text-neutral-500 hover:text-neutral-900"
                >
                  Terms of Service
                </Link>
              </li>

              <li>
                <Link
                  href="/refund"
                  className="text-sm text-neutral-500 hover:text-neutral-900"
                >
                  Refund Policy
                </Link>
              </li>

              <li>
                <Link
                  href="/cookies"
                  className="text-sm text-neutral-500 hover:text-neutral-900"
                >
                  Cookies
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col gap-3 pt-6 text-sm text-neutral-500 sm:flex-row sm:items-center sm:justify-between">

          <p>
            © 2026 BuildStack.
          </p>

          <p>
            All rights reserved.
          </p>

        </div>

      </div>
    </footer>
  );
}