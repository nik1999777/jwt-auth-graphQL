import React from "react";
import ReactDOM from "react-dom/client";
import { getAccessToken, setAccessToken } from "./accessToken";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import jwtDecode from "jwt-decode";
import {
  ApolloClient,
  HttpLink,
  ApolloLink,
  InMemoryCache,
  from,
  ApolloProvider,
} from "@apollo/client";

import { App } from "./App";

const httpLink = new HttpLink({ uri: "http://localhost:4000/graphql" });

const authMiddleware = new ApolloLink((operation, forward) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        authorization: `Bearer ${accessToken}`,
      },
    }));
  }

  return forward(operation);
});

const link = new TokenRefreshLink({
  accessTokenField: "accessToken",
  isTokenValidOrUndefined: () => {
    const token = getAccessToken();

    if (!token) {
      return true;
    }

    try {
      const { exp }: any = jwtDecode(token);
      if (Date.now() >= exp * 1000) {
        return false;
      } else {
        return true;
      }
    } catch {
      return false;
    }
  },
  fetchAccessToken: () => {
    return fetch("http://localhost:4000/refresh_token", {
      method: "POST",
      credentials: "include",
    });
  },
  handleFetch: accessToken => {
    setAccessToken(accessToken);
  },
  handleError: err => {
    console.warn("Your refresh token is invalid. Try to relogin");
    console.error(err);
  },
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([authMiddleware, link, httpLink]),
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
