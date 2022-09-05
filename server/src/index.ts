import "dotenv/config";
import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./UserResolver";
import { AppDataSource } from "./data-source";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

(async () => {
  const app = express();
  app.get("/", (_req, res) => res.send("hello"));

  await AppDataSource.initialize();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({ resolvers: [UserResolver] }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    context: ({ res, req }) => ({ res, req }),
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("express server started");
  });
})();
