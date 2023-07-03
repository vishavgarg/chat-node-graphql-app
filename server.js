const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const http = require("http");
const { execute, subscribe } = require("graphql");
const { SubscriptionServer } = require("subscriptions-transport-ws");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const knex = require("./knex");
const dotenv = require("dotenv");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

dotenv.config();

const app = express();
const schema = makeExecutableSchema({ typeDefs, resolvers });

async function startServer() {

  const server = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }),
  });

  await server.start();

  server.applyMiddleware({ app });

  const httpServer = http.createServer(app);

  httpServer.listen(process.env.PORT || 4000, () => {
    console.log(`Server listening on port ${process.env.PORT || 4000}`);
    new SubscriptionServer(
      {
        execute,
        subscribe,
        schema,
        onConnect: (connectionParams, webSocket) => {
          console.log("Client connected");
        },
        onDisconnect: (webSocket, context) => {
          console.log("Client disconnected");
        },
      },
      {
        server: httpServer,
        path: server.graphqlPath,
      }
    );
  });
}

startServer();
