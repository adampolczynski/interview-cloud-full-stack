import knex from "knex";
import { serveGraphQl } from "./graphql.js";
import { serveRest } from "./rest.js";

const connection = knex({
  client: 'sqlite3',
  connection: {
    filename: 'database.db',
  },
  multipleStatements: true,
  useNullAsDefault: true,
});

connection.raw('select name from devices')
  .then((result) => {
    // GraphQL server:
    serveGraphQl(result);

    // Rest server:
    // serveRest(result);
  })
  .catch((error) => console.error(error));

