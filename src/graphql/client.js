import {
  ApolloClient, createHttpLink, InMemoryCache, split,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { AUTH_TOKEN } from '../constants';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN);

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000',
  options: {
    reconnect: true,
    connectionParams: {
      authToken: localStorage.getItem(AUTH_TOKEN),
    },
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition'
      && definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink),
);

const apolloClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          feed: {
            read: (existing) => {
              if (!existing) {
                return;
              }

              return existing;
            },
          },
        },
      },
    },
  }),
});

export default apolloClient;
