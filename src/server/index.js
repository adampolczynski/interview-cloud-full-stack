import knex from "knex";
import { serveGraphQl } from "./graphql.js";
import { serveRest } from "./rest.js";

// GraphQL server:
serveGraphQl().catch(console.error);

// REST server:
// serveRest().catch(console.error);
