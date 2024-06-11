import type { Metadata } from 'next';
import StreamVideoProvider from '@/providers/StreamClient';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'Santychuy Zoom Clone',
  description: 'Example complete app of Zoom',
  icons: {
    icon: '/icons/logo.svg'
  }
};

const Mainlayout = ({ children }: MainLayoutProps) => {
  return (
    <main>
      <StreamVideoProvider>{children}</StreamVideoProvider>
    </main>
  );
};

export default Mainlayout;
