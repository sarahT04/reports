import { ChakraProvider } from '@chakra-ui/react'
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Wrapper from '../components/Wrapper';
import theme from '../components/theme'
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps }) {

  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  }));
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <Wrapper>
            <Component {...pageProps} />
          </Wrapper>
        </ChakraProvider>
      </QueryClientProvider>
    </SessionProvider>
  )
}

export default MyApp
