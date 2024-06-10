import StreamVideoProvider from '@/providers/StreamClient';

interface MainLayoutProps {
  children: React.ReactNode;
}

const Mainlayout = ({ children }: MainLayoutProps) => {
  return (
    <main>
      <StreamVideoProvider>{children}</StreamVideoProvider>
    </main>
  );
};

export default Mainlayout;
