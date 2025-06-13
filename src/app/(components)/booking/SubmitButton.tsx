'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';

import { api } from '@/apis/httpClient';

const SubmitButton = () => {
  const searchParams = useSearchParams();
  const params = useParams();
  const router = useRouter();

  const id = params?.id;
  const checkIn = searchParams.get('checkIn');
  const checkOut = searchParams.get('checkOut');
  const guestCount = searchParams.get('guestCount');
  const totalAmount = searchParams.get('totalAmount');
  const totalDays = searchParams.get('totalDays');

  const handleSubmit = async () => {
    const response = await api.post('/api/bookings', {
      roomId: id,
      checkIn,
      checkOut,
      guestCount,
      totalAmount,
      totalDays,
    });

    if (response.status == 200) {
      toast.success('예약을 완료했습니다.');

      router.replace(`/users/bookings/${response.data.id}`);
    } else {
      toast.error('다시 시도해주세요.');
    }
  };

  return (
    <button
      type="button"
      onClick={handleSubmit}
      className="w-full cursor-pointer bg-rose-600 hover:bg-rose-500 px-6 py-3 text-white rounded-md"
    >
      확인 및 결제
    </button>
  );
};

export default SubmitButton;
