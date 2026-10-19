import Link from "next/link";
import { BuildStackLogo } from "@/components/shared";

export default function Footer() {
  return (
    <footer className="w-full border-t border-neutral-100 bg-white px-6 pb-12 pt-16 lg:px-10">
      <div className="mx-auto max-w-7xl">

        {/* Main Footer */}
        <div className="grid gap-10 pb-12 md:grid-cols-2 lg:grid-cols-5">

          {/* Brand */}
          <div className="lg:col-span-1">
            <BuildStackLogo href="/" size={24} />

            <p className="mt-4 max-w-xs text-xs leading-6 text-neutral-500">
              Your roadmap to becoming a better developer.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex items-center gap-4 text-xs font-medium text-neutral-500">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-neutral-900"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-neutral-900"
              >
                LinkedIn
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-neutral-900"
              >
                X (Twitter)
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-neutral-900"
              >
                YouTube
              </a>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
              Platform
            </h3>

            <ul className="mt-4 space-y-2.5 text-xs">
              <li>
                <Link href="/" className="text-neutral-500 transition hover:text-neutral-900">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/learn" className="text-neutral-500 transition hover:text-neutral-900">
                  Learn
                </Link>
              </li>
              <li>
                <Link href="/learn/roadmaps" className="text-neutral-500 transition hover:text-neutral-900">
                  Roadmaps
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-neutral-500 transition hover:text-neutral-900">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-neutral-500 transition hover:text-neutral-900">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
              Resources
            </h3>

            <ul className="mt-4 space-y-2.5 text-xs">
              <li>
                <Link href="/learn/roadmaps" className="text-neutral-500 transition hover:text-neutral-900">
                  All Roadmaps
                </Link>
              </li>
              <li>
                <Link href="/learn/bookmarks" className="text-neutral-500 transition hover:text-neutral-900">
                  Bookmarks
                </Link>
              </li>
              <li>
                <Link href="/learn/domains" className="text-neutral-500 transition hover:text-neutral-900">
                  Notes
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-neutral-500 transition hover:text-neutral-900">
                  Progress
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
              Legal
            </h3>

            <ul className="mt-4 space-y-2.5 text-xs">
              <li>
                <Link href="/privacy" className="text-neutral-500 transition hover:text-neutral-900">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-neutral-500 transition hover:text-neutral-900">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/refund" className="text-neutral-500 transition hover:text-neutral-900">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-neutral-500 transition hover:text-neutral-900">
                  Cookies
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
              Support
            </h3>

            <ul className="mt-4 space-y-2.5 text-xs">
              <li>
                <Link href="/help" className="text-neutral-500 transition hover:text-neutral-900">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-neutral-500 transition hover:text-neutral-900">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/guides" className="text-neutral-500 transition hover:text-neutral-900">
                  Guides
                </Link>
              </li>
              <li>
                <Link href="/feedback" className="text-neutral-500 transition hover:text-neutral-900">
                  Feedback
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col gap-3 border-t border-neutral-100 pt-8 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 BuildStack.</p>
          <p>All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
}