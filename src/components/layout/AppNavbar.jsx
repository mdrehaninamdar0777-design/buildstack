import Link from "next/link";

export default function AppNavbar() {
  return (
    <header className="w-full border-b border-neutral-200 bg-white">
      <div className="mx-auto flex h-20 max-w-[1400px] items-center px-6 lg:px-10">

        {/* Logo */}
        <Link
          href="/home"
          className="flex shrink-0 items-center gap-2"
        >
          <span className="text-2xl font-bold text-neutral-900">
            ◈
          </span>

          <span className="text-xl font-bold tracking-tight text-neutral-900">
            BuildStack
          </span>
        </Link>

        {/* Navigation */}
        <nav className="ml-12 flex items-center gap-8">
          <Link
            href="/home"
            className="text-sm font-semibold text-neutral-900"
          >
            Home
          </Link>

          <Link
            href="/learn"
            className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900"
          >
            Learn
          </Link>

          <Link
            href="/dashboard"
            className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900"
          >
            Dashboard
          </Link>
        </nav>

        {/* Search */}
        <div className="ml-auto hidden lg:flex">
          <div className="flex h-11 w-[340px] items-center rounded-xl border border-neutral-200 bg-white px-4">

            <span className="mr-3 text-lg text-neutral-400">
              ⌕
            </span>

            <span className="flex-1 text-sm text-neutral-400">
              Search roadmaps, topics, resources...
            </span>

            <span className="rounded-md border border-neutral-200 px-2 py-1 text-xs text-neutral-500">
              ⌘ K
            </span>

          </div>
        </div>

        {/* User */}
        <div className="ml-6 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 text-sm font-semibold text-neutral-700">
            R
          </div>

          <span className="hidden text-sm font-semibold text-neutral-900 sm:block">
            Rehan
          </span>

          <span className="text-xs text-neutral-500">
            ▾
          </span>
        </div>

      </div>
    </header>
  );
}