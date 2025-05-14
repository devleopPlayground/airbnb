'use client';

import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

import useGetUserInfo from '@/hooks/api/users/useGetUserInfo';

const UserInformation = () => {
  const router = useRouter();
  const { userInfo } = useGetUserInfo();

  return (
    <div className="mt-10 max-w-3xl mx-auto px-4">
      <div className="flex justify-between gap-4">
        <h1 className="text-3xl font-semibold">개인 정보</h1>
        <button
          type="button"
          onClick={() => router.push('/users/edit')}
          className="text-sm font-semibold underline underline-offset-2 px-4 py-1.5 rounded-md hover:bg-black/20 cursor-pointer"
        >
          수정하기
        </button>
      </div>
      <div className="flex flex-col mt-10 mb-28">
        <div className="flex flex-col gap-2 border-b-gray-200 border-b py-4">
          <h1 className="font-semibold">이름</h1>
          <div className="text-gray-500 text-sm">{userInfo?.name || '-'}</div>
        </div>
        <div className="flex flex-col gap-2 border-b-gray-200 border-b py-4">
          <h1 className="font-semibold">이메일</h1>
          <div className="text-gray-500 text-sm">{userInfo?.email || '-'}</div>
        </div>
        <div className="flex flex-col gap-2 border-b-gray-200 border-b py-4">
          <h1 className="font-semibold">이미지 </h1>
          <img
            src={userInfo?.image || '/images/user.png'}
            width={50}
            height={50}
            className="rounded-lg shadow"
            alt="user-image"
          />
        </div>
        <div className="flex flex-col gap-2 border-b-gray-200 border-b py-4">
          <h1 className="font-semibold">주소</h1>
          <div className="text-gray-500 text-sm">{userInfo?.address || '-'}</div>
        </div>
        <div className="flex flex-col gap-2 border-b-gray-200 border-b py-4">
          <h1 className="font-semibold">전화번호</h1>
          <div className="text-gray-500 text-sm">{userInfo?.phone || '-'}</div>
        </div>
        <div className="flex flex-col gap-2 border-b-gray-200 border-b py-4">
          <h1 className="font-semibold">로그인한 SNS</h1>
          <div className="text-gray-500 text-sm">{userInfo?.accounts?.[0].provider || '-'}</div>
        </div>
        <div className="flex flex-col gap-2 border-b-gray-200 border-b py-4">
          <h1 className="font-semibold">로그아웃</h1>
          <button
            className="text-gray-500 text-sm underline underline-offset-2 text-left inline-block cursor-pointer hover:text-gray-700"
            onClick={() => signOut({ redirectTo: '/' })}
            type="button"
          >
            로그아웃하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserInformation;
