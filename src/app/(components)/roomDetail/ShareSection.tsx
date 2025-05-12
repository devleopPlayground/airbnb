import { CiShare1 } from 'react-icons/ci';

import type { RoomType } from '@/interface';

import useShareSection from './hooks/useShareSection';
import ShareModalContent from './ShareModalContent';

type ShareSectionProps = {
  data?: RoomType;
};

const ShareSection = ({ data }: ShareSectionProps) => {
  const { openModal, closeModal } = useShareSection();

  const handleOpenModal = () => {
    openModal(<ShareModalContent closeModal={closeModal} data={data} />);
  };

  return (
    <button
      type="button"
      onClick={handleOpenModal}
      className="flex gap-2 items-center px-2 py-1.5 rounded-lg hover:bg-black/10 cursor-pointer"
    >
      <CiShare1 />
      <span className="underline underline-offset-2">공유하기</span>
    </button>
  );
};

export default ShareSection;
