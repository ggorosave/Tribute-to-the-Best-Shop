import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

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