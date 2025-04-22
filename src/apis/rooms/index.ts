import { api } from '../httpClient';

const getRooms = async () => {
  return await api.get('/api/rooms').then((response) => response.data);
};

export { getRooms };
