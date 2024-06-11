import type { Metadata } from 'next';

import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

interface HomeLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'Santychuy Zoom Clone',
  description: 'Example complete app of Zoom',
  icons: {
    icon: '/icons/logo.svg'
  }
};

const HomeLayout = ({ children }: HomeLayoutProps) => {
  return (
    <div className="relative">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px-14">
          <div className="w-full">
            <section className="flex size-full flex-col gap-10 text-white">
              {children}
            </section>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomeLayout;
