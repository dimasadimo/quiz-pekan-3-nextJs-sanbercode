import "@/styles/globals.css";
import { ChakraProvider } from '@chakra-ui/react';
import PropTypes from 'prop-types';

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

App.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.object,
};
