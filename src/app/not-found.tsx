'use client';

import { useRouter } from 'next/navigation';

const NotFound = () => {
  const router = useRouter();

  const onClickHrefHome = () => {
    router.push('/');
  };

  return (
    <div className="text-center h-[60vh] flex flex-col justify-center">
      <h2 className="text-rose-600 text-3xl font-semibold">404 Not Found.</h2>
      <p className="text-gray-500">해당 경로에 맞는 페이지를 찾을 수 없습니다.</p>

      <div className="mt-8">
        <button
          type="button"
          onClick={onClickHrefHome}
          className="bg-rose-500 text-white rounded-xl px-4 py-2.5 hover:shadow-lg cursor-pointer"
        >
          메인으로 돌아가기
        </button>
      </div>
    </div>
  );
};

export default NotFound;
