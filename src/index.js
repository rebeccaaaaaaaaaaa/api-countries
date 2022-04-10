import React from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';
// 1. import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react'

const div = document.getElementById('root');
const root = createRoot(div);
root.render(<ChakraProvider><App /></ChakraProvider>);