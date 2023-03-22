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

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const App = () => {

  const router = createBrowserRouter([
    { 
      path: '/',
      element: <><h1>Hello World</h1></>,
    }
  ])

  return (
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  )
};

export default App;