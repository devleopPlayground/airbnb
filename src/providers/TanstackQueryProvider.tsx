'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';

type TanstackQueryProviderProps = {
  children: React.ReactNode;
};

const TanstackQueryProvider = ({ children }: TanstackQueryProviderProps) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        {children}
        <Toaster />
      </SessionProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default TanstackQueryProvider;
