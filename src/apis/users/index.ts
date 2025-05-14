import type { UpdateUserInfoRequest } from '@/hooks/api/users/useUpdateUserInfo';

import { api } from '../httpClient';

const getUserInfo = async () => {
  return await api.get('/api/users').then((response) => response.data);
};

const updateUserInfo = async (data: UpdateUserInfoRequest) => {
  return await api.put('/api/users', data).then((response) => response.data);
};

export { getUserInfo, updateUserInfo };
