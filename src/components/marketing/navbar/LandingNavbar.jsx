import Link from "next/link";
import { BuildStackLogo } from "@/components/shared";
import NavLinks from "./NavLinks";
import SearchBar, { MobileSearchTrigger } from "./SearchBar";
import AuthButtons from "./AuthButtons";
import MobileMenu from "./MobileMenu";

export default function LandingNavbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white px-4 py-3 md:px-6 lg:px-8">
      <div className="relative mx-auto flex h-[76px] w-full max-w-[1280px] items-center justify-between rounded-2xl border border-neutral-200 bg-white px-4 md:px-6 shadow-xs">
        <div className="flex shrink-0 items-center gap-8 lg:gap-12">
          <BuildStackLogo href="/" size={28} />
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
