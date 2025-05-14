import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import type { ApiError } from 'next/dist/server/api-utils';
import { useSession } from 'next-auth/react';

import { getUserInfo } from '@/apis/users';
import type { UserType } from '@/interface';

export type GetUserInfoResponse = UserType;

type UseGetUserInfoProps = {
  refetchOnMount?: boolean;
};

// 커스텀 훅은 일반 함수처럼 직접 호출되기 때문에, 인자를 전달하지 않으면 undefined가 됨
// React 컴포넌트와 달리 React가 자동으로 props를 처리해주지 않음
// 따라서 = {}로 기본값을 설정하여 구조 분해 할당이 안전하게 동작하도록 함
const useGetUserInfo = ({ refetchOnMount = true }: UseGetUserInfoProps = {}) => {
  const { status } = useSession();

  const getUserInfoQuery = useQuery<GetUserInfoResponse, AxiosError<ApiError>>({
    queryKey: ['user'],
    queryFn: getUserInfo,
    enabled: status === 'authenticated',
    refetchOnMount,
  });

  return { userInfo: getUserInfoQuery.data, ...getUserInfoQuery };
};

export default useGetUserInfo;
