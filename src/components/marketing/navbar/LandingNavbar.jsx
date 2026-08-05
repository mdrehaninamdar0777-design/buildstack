import Link from "next/link";
import Image from "next/image";
import NavLinks from "./NavLinks";
import SearchBar, { MobileSearchTrigger } from "./SearchBar";
import AuthButtons from "./AuthButtons";
import MobileMenu from "./MobileMenu";

export default function LandingNavbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white px-4 py-3 md:px-6 lg:px-8">
      <div className="relative mx-auto flex h-[76px] w-full max-w-[1280px] items-center justify-between rounded-2xl border border-neutral-200 bg-white px-4 md:px-6">
        <div className="flex shrink-0 items-center gap-8 lg:gap-12">
          <Link
            href="/"
            aria-label="BuildStack home"
            className="flex shrink-0 items-center gap-2.5 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
          >
            <Image
              src="/logos/buildstack-logo-icon.png"
              alt=""
              width={28}
              height={28}
              priority
              className="h-7 w-7 shrink-0"
            />
            <span className="text-xl font-bold tracking-tight text-black">
              BuildStack
            </span>
          </Link>

          <NavLinks className="hidden md:flex" />
        </div>

        <div className="hidden flex-1 items-center justify-center px-8 lg:flex">
          <SearchBar />
        </div>

        <div className="flex shrink-0 items-center gap-3 md:gap-4">
          <SearchBar className="lg:hidden" />
          <MobileSearchTrigger />

          <AuthButtons variant="desktop" className="hidden md:flex" />
          <AuthButtons variant="compact" className="flex md:hidden" />

          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
