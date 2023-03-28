import { ChakraProvider } from '@chakra-ui/react'
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Wrapper from '../components/Wrapper';
import theme from '../components/theme'
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {

  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  }));
  return (
    <>
      <Head>
        <title>Reports</title>
      </Head>
      <SessionProvider>
        <QueryClientProvider client={queryClient}>
          <ChakraProvider theme={theme}>
            <Wrapper>
              <Component {...pageProps} />
            </Wrapper>
          </ChakraProvider>
        </QueryClientProvider>
      </SessionProvider>
    </>
  )
}

export default MyApp
