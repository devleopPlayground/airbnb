import { api } from '../httpClient';

const getRooms = async ({ pageParam = 1 }) => {
  return await api.get(`/api/rooms?page=${pageParam}&limit=12`).then((response) => response.data);
};

export { getRooms };
