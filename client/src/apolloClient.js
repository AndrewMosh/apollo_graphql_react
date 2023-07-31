// apolloClient.js
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// Replace 'YOUR_GRAPHQL_SERVER_URL' with the actual URL of your GraphQL server
const GRAPHQL_SERVER_URL = "http://localhost:4000/graphql";

// Create an HTTP link to your GraphQL server
const httpLink = createHttpLink({
  uri: GRAPHQL_SERVER_URL,
});

// Set up the authentication headers (if needed)
const authLink = setContext((_, { headers }) => {
  // You can add authentication tokens or other headers here
  // For example, if you are using JWT tokens:
  // const token = localStorage.getItem('token');
  // return {
  //   headers: {
  //     ...headers,
  //     Authorization: token ? `Bearer ${token}` : '',
  //   },
  // };
});

// Create the Apollo Client instance
const client = new ApolloClient({
  link: authLink.concat(httpLink), // Apply the authentication headers (if needed) to the HTTP link
  cache: new InMemoryCache(),
});

export default client;
