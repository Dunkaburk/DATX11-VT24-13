import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../../styles/theme';
import reportWebVitals from '../../reportWebVitals';
import CodeEditorBox from './editor';

export default function EditorPage() {
  return (
    <React.StrictMode>
      <ChakraProvider theme={theme}>
        <CodeEditorBox />
      </ChakraProvider>
    </React.StrictMode>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
