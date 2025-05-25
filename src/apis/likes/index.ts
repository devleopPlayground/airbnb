import { api } from '../httpClient';

const getLikeRooms = async ({ pageParam = 1 }) => {
  return await api.get(`/api/likes?page=${pageParam}&limit=12`).then((response) => response.data);
};

const postLike = async (roomId: number) => {
  const response = await api.post('/api/likes', { roomId: roomId });
  return {
    data: response.data,
    status: response.status,
  };
};

export { getLikeRooms, postLike };
