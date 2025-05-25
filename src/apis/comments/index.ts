import { api } from '../httpClient';

const getCommentsPagination = async (roomId: number, pageParam: number) => {
  return await api
    .get(`/api/comments?roomId=${roomId}&limit=6&page=${pageParam}`)
    .then((response) => response.data);
};

const getMyComments = async ({ pageParam = 1 }) => {
  return await api.get(`/api/comments?my=true&limit=12&page=${pageParam}`).then((response) => response.data);
};

const getComments = async (roomId: number) => {
  return await api.get(`/api/comments?roomId=${roomId}&limit=6`).then((response) => response.data);
};

const postComment = async (roomId: number, body: string) => {
  return await api.post('/api/comments', { roomId, body }).then((response) => response.data);
};

export { getComments, getCommentsPagination, getMyComments, postComment };
