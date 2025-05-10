import { usePathname, useRouter } from 'next/navigation';

const useHeaderSection = () => {
  const router = useRouter();
  const pathname = usePathname();

  const onClickModalOpen = () => {
    router.push(`${pathname}/images`);
  };

  const onClickModalClose = () => {
    router.back();
  };

  return { onClickModalOpen, onClickModalClose };
};

export default useHeaderSection;
