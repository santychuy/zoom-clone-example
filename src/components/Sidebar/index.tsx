'use client';

import Link from 'next/link';
import Image from 'next/image';

import { navs } from '@/constants/navs';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-dark-1 p-6 pt-28 text-white max-sm:hidden lg:w-[264px]">
      <div className="flex flex-1 flex-col gap-6">
        {navs.map((nav) => {
          const isActive = pathname === nav.route;

          return (
            <Link
              key={nav.label}
              href={nav.route}
              className={cn(
                'flex gap-3 items-center p-4 rounded-lg justify-start',
                { 'bg-blue-1': isActive }
              )}
            >
              <Image src={nav.imgUrl} alt={nav.label} width={26} height={26} />
              <p className="text-lg font-semibold max-lg:hidden">{nav.label}</p>
            </Link>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
