import { usePathname, useRouter } from 'next/navigation';

const useHeaderSection = () => {
  const router = useRouter();
  const pathname = usePathname();

  const onClickModalOpen = () => {
    if (pathname.includes('/images')) {
      router.back();

      setTimeout(() => {
        // 비동기로 예약된 pathname에는 images가 포함되어있다.
        router.push(`${pathname}`);
      }, 100);

      return;
    }

    router.push(`${pathname}/images`);
  };

  const onClickModalClose = () => {
    router.back();
  };

  return { onClickModalOpen, onClickModalClose };
};

export default useHeaderSection;
