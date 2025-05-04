import { Spinner } from '@/components/common/Loader';

const FullPageLoad = () => {
  return (
    <div className="fixed w-full h-screen inset-x-0 bg-black/60 z-50 flex flex-col justify-center items-center top-0 ">
      <Spinner />
    </div>
  );
};

export default FullPageLoad;
