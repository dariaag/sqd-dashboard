// lib/apolloClient.ts
import { ApolloClient, InMemoryCache, split, HttpLink } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

// Create an HTTP link:
const httpLink = new HttpLink({
  uri: "https://demo-sqd.squids.live/sqd-token-stats/v/v1/graphql", // Your GraphQL endpoint
});
let ws = "wss://demo-sqd.subsquid.io/sqd-token-stats/v/v1/graphql.";
// Create a WebSocket link:
const wsLink = new GraphQLWsLink(
  createClient({
    url: "wss://demo-sqd.squids.live/sqd-token-stats/v/v1/graphql", // Your WebSocket endpoint
  })
);

// Use split for proper "routing" of the requests
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;
