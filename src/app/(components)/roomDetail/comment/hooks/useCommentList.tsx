import { useSetAtom } from 'jotai';

import { closeModalAtom, openModalAtom } from '@/atoms/modalAtom';

import CommentModalContent from '../CommentModalContent';

const useCommentList = (roomId?: string) => {
  const openModal = useSetAtom(openModalAtom);
  const closeModal = useSetAtom(closeModalAtom);

  const handleOpenModal = () => {
    openModal(<CommentModalContent roomId={roomId} />);
  };

  return { handleOpenModal, closeModal };
};

export default useCommentList;
