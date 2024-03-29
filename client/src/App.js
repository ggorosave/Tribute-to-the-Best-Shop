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

import Root from "./pages/Root";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Success from "./pages/Success";
import OrderHistory from "./pages/OrderHistory";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";

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
      element: <Root />,
      errorElement: <NoMatch />,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/login',
          element: <Login />
        },
        {
          path: '/signup',
          element: <Signup />
        },
        {
          path: '/success',
          element: <Success />
        },
        {
          path: '/orderHistory',
          element: <OrderHistory />
        },
        {
          path: '/products/:id',
          element: <Detail />
        }
      ],
    }
  ])

  return (
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  )
};

export default App;