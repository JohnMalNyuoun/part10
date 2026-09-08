import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

// Replace 'localhost' with your computer's local IP address (e.g. 'http://192.168.1.X:4000/graphql')
// if you are testing on a physical mobile device using Expo Go.
const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

const createApolloClient = () => {
  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;