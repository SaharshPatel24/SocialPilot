import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../config/theme'
import { AuthProvider } from '../context/AuthProvider';
import { PostProvider } from '../context/PostProvider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ChakraProvider theme={theme}>
        <PostProvider>
        <Component {...pageProps} />
        </PostProvider>
      </ChakraProvider>
    </AuthProvider>
  )
}
