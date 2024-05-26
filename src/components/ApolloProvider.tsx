// lib/ApolloProvider.tsx
import { ReactNode } from "react";
import { ApolloProvider as Provider } from "@apollo/client";
import client from "../app/lib/apolloClient";

interface ApolloProviderProps {
  children: ReactNode;
}

const ApolloProvider = ({ children }: ApolloProviderProps) => {
  return <Provider client={client}>{children}</Provider>;
};

export default ApolloProvider;
