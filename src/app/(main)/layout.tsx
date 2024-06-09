interface MainLayoutProps {
  children: React.ReactNode;
}

const Mainlayout = ({ children }: MainLayoutProps) => {
  return <main>{children}</main>;
};

export default Mainlayout;
