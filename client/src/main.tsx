import React from "react";
import ReactDOM from "react-dom/client";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
  HttpLink,
  concat,
} from "@apollo/client";
import Routing from "./Routes";
import { getAccessToken } from "./accessToken";

const httpLink = new HttpLink({ uri: "http://localhost:4000/graphql" });

const authMiddleware = new ApolloLink((operation, forward) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        authorization: localStorage.getItem(accessToken) || null,
      },
    }));
  }

  return forward(operation);
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  credentials: "include",
  link: concat(authMiddleware, httpLink),
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Routing />
    </ApolloProvider>
  </React.StrictMode>
);
