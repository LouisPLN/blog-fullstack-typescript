import { AppProps } from 'next/app';
import '../styles/globals.css';
import { NextUIProvider } from '@nextui-org/react';
// import { AuthProvider } from '../contexts/AuthContext';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <NextUIProvider>
        <Component {...pageProps} />
    </NextUIProvider>
  );
};

export default MyApp;