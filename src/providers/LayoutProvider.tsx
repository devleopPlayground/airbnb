import { Footer, Navbar } from '@/components/layout';

type LayoutProviderProps = {
  children: React.ReactNode;
};

const LayoutProvider = ({ children }: LayoutProviderProps) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default LayoutProvider;
