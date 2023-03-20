import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// TODO: Look at redux docs to refactor util files: https://redux.js.org/tutorials/quick-start
// Chakra: https://chakra-ui.com/getting-started
// React Router: https://reactrouter.com/en/main/start/tutorial

const App = () => {

  const router = createBrowserRouter([
    { 
      path: '/',
      element: <><h1>Hello World</h1></>,
    }
  ])

  return (
    <ApolloProvider>
      <RouterProvider router={router} />
    </ApolloProvider>
  )
};

export default App;