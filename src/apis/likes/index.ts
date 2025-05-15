import { api } from '../httpClient';

const postLike = async (roomId: number) => {
  const response = await api.post('/api/likes', { roomId: roomId });
  return {
    data: response.data,
    status: response.status,
  };
};

export { postLike };
