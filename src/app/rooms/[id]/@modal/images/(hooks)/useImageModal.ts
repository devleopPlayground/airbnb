import { useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import type { GetRoomDetailResponse } from '@/hooks/api/rooms/useGetRoomDetail';

const useImageModal = () => {
  const { id } = useParams();
  const router = useRouter();

  const queryClient = useQueryClient();
  const cachedData = queryClient.getQueryData<GetRoomDetailResponse>(['room-detail', id]);

  const [isMounted, setIsMounted] = useState(false);

  const onClickCloseModal = () => {
    router.back();
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    setIsMounted(true);

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMounted]);

  return {
    isMounted,
    cachedData,
    onClickCloseModal,
  };
};

export default useImageModal;
