import { SignedIn, UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';

import MobileNav from '../MobileNav';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between fixed z-50 w-full bg-dark-1 p-6 lg:px-7">
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/icons/logo.svg"
          alt="Santychuy Logo"
          width={36}
          height={36}
          className="max-sm:size-10"
        />
        <p className="text-white font-extrabold text-xl max-sm:hidden">
          Santychuy Zoom
        </p>
      </Link>

      <div className="flex justify-between gap-5">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
