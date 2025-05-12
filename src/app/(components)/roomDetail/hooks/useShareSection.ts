import { useSetAtom } from 'jotai';
import toast from 'react-hot-toast';

import { closeModalAtom, openModalAtom } from '@/atoms/modalAtom';

const useShareSection = () => {
  const openModal = useSetAtom(openModalAtom);
  const closeModal = useSetAtom(closeModalAtom);

  const handleCopyLink = () => {
    if (navigator.clipboard && window) {
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => {
          toast.success('링크가 복사되었어요!');
        })
        .catch(() => {
          toast.error('다시 시도해주세요.');
        });
    }
  };

  const handleShareX = () => {
    if (window) {
      window.open(`https://twitter.com/intent/tweet?url=${window.location.href}`);
    }
  };

  const handleShareFacebook = () => {
    if (window) {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}"`);
    }
  };

  return { openModal, closeModal, handleCopyLink, handleShareX, handleShareFacebook };
};

export default useShareSection;
