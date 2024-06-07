import React from 'react';
import ReactDOM from 'react-dom/client'; // Ensure correct import for React 18
import './index.css';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import ChatProvider from './Context/ChatProvider'; // Ensure the path is correct

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ChatProvider>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </ChatProvider>
    </BrowserRouter>
  </React.StrictMode>
);