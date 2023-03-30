import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// TODO: Look at redux docs to refactor util files: https://redux.js.org/tutorials/quick-start
// Chakra: https://chakra-ui.com/getting-started
// React Router: https://reactrouter.com/en/main/start/tutorial
import Home from "./pages/Home";
import Nav from "./components/Nav";

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
      element: <Home />,
    }
  ])

  return (
    <ApolloProvider client={client}>
      <Nav />
      <RouterProvider router={router} />
    </ApolloProvider>
  )
};

export default App;