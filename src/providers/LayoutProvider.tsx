import { Footer, Navbar } from '@/components/layout';

type LayoutProviderProps = {
  children: React.ReactNode;
};

const LayoutProvider = ({ children }: LayoutProviderProps) => {
  return (
    <>
      <Navbar />
      <div className="mt-20 p-10 min-h-[80dvh]">{children}</div>
      <Footer />
    </>
  );
};

export default LayoutProvider;
