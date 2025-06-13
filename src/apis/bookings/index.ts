import { api } from '../httpClient';

const fetchBookings = async ({ pageParam = 1, userId }: { pageParam: number; userId?: string }) => {
  return await api
    .get(`/api/bookings?limit=5&page=${pageParam}&userId=${userId}`)
    .then((response) => response.data);
};

export { fetchBookings };
