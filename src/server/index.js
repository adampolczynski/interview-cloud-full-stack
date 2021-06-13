import knex from "knex";
import { serveGraphQl } from "./graphql.js";
import { serveRest } from "./rest.js";

try {
  // GraphQL server:
  serveGraphQl();

  // REST server:
  // serveRest();
} catch(error) {
  console.error(error);
}
