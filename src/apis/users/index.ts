import { api } from '../httpClient';

const getUserInfo = async () => {
  return await api.get('/api/users').then((response) => response.data);
};

export { getUserInfo };
