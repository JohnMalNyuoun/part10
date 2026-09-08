import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { Platform } from 'react-native';

const getApolloUri = () => {
  if (Platform.OS === 'web') {
    return 'http://localhost:4000/graphql';
  }
  return process.env.EXPO_PUBLIC_APOLLO_URI || 'http://192.168.1.186:4000/graphql';
};

const httpLink = createHttpLink({
  uri: getApolloUri(),
});

const createApolloClient = () => {
  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;