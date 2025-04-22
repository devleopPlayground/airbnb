import { api } from '../httpClient';

const getFaqs = async () => {
  return await api.get('/api/faq').then((response) => response.data);
};

export { getFaqs };
