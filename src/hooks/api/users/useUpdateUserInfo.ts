import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

import { updateUserInfo } from '@/apis/users';
import type { FormEditProfileType } from '@/interface';

export type UpdateUserInfoRequest = FormEditProfileType & {
  email?: string;
};

const useUpdateUserInfo = (options?: UseMutationOptions<unknown, Error, UpdateUserInfoRequest>) => {
  return useMutation({
    mutationFn: (data: UpdateUserInfoRequest) => updateUserInfo(data),
    ...options,
  });
};

export default useUpdateUserInfo;
