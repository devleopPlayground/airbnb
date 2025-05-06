import { api } from '../httpClient';

const getRooms = async ({ pageParam = 1 }) => {
  return await api.get(`/api/rooms?page=${pageParam}&limit=12`).then((response) => response.data);
};

const getMapRooms = async () => {
  return await api.get('/api/rooms').then((response) => response.data);
};

const getRoomsDetail = async (id: string) => {
  return await api.get(`/api/rooms?id=${id}`).then((response) => response.data);
};

export { getMapRooms, getRooms, getRoomsDetail };
