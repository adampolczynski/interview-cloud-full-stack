import express from "express";
import apollo from "apollo-server-express";

const { ApolloServer, gql } = apollo;

const typeDefs = gql`
  type Device {
    name: String!
  }

  type Query {
    devices: [Device!]!
  }
`;

export async function serveGraphQl(data) {
  const resolvers = {
    Query: {
      devices: () => data,
    },
  };

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  const app = express();
  server.applyMiddleware({ app });
  app.listen({ port: 4000 });

  console.log(
    `GraphQL server ready at http://localhost:4000${server.graphqlPath}`
  );
}
