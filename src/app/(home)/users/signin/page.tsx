'use client';

import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { SiNaver } from 'react-icons/si';

const SignInPage = () => {
  const { status } = useSession();
  const router = useRouter();

  const handleClickSignInOrLogin = (authKey: 'google' | 'naver' | 'kakao') => {
    try {
      signIn(authKey, { callbackUrl: '/' });
    } catch (error) {
      console.error(error);
      toast.error('로그인에 실패했습니다.');
    }
  };

  useEffect(() => {
    if (status === 'authenticated') {
      toast.error('접근할 수 없습니다.');
      router.replace('/');
    }
  }, [status, router]);

  return (
    <div className="max-w-xl mx-auto pt-10 pb-24">
      <div className="flex flex-col gap-6">
        <h1 className="font-semibold text-lg text-center">로그인 또는 회원가입</h1>
        <hr />
        <div className="text-lg md:text-2xl font-semibold">FastCampus NextBnb에 오신 것을 환영합니다.</div>
      </div>
      <div className="text-gray-500 text-sm mt-2">SNS 계정을 이용하여 로그인 또는 회원가입을 해주세요.</div>
      <div className="flex flex-col gap-5 mt-16">
        <button
          type="button"
          onClick={() => handleClickSignInOrLogin('google')}
          className="relative border border-gray-700 rounded-md py-3 text-sm hover:bg-black/30 cursor-pointer text-center font-semibold "
        >
          <FcGoogle className="absolute left-5 text-xl" />
          구글로 로그인하기
        </button>
        <button
          type="button"
          onClick={() => handleClickSignInOrLogin('naver')}
          className="relative border border-gray-700 rounded-md py-3 text-sm hover:bg-black/30 cursor-pointer text-center font-semibold "
        >
          <SiNaver className="absolute left-5 my-auto inset-y-0 text-green-400" />
          네이버로 로그인하기
        </button>
        <button
          type="button"
          onClick={() => handleClickSignInOrLogin('kakao')}
          className="relative border border-gray-700 rounded-md py-3 text-sm hover:bg-black/30 cursor-pointer text-center font-semibold "
        >
          <RiKakaoTalkFill className="absolute left-5 my-auto inset-y-0 text-xl text-yellow-950" />
          카카오로 로그인하기
        </button>
      </div>
    </div>
  );
};

export default SignInPage;
