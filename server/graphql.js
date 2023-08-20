import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { connection } from './connection.js'
import { typeDefs } from './schema.js'

const port = parseInt(process.env.GRAPHQL_PORT || '4001')

export async function serveGraphQl() {
  const resolvers = {
    Query: {
      devicesView: (_, { limit, offset, sortBy, sortOrder }) => {
        const query = connection.select('*').from('devices_view')

        if (sortBy === 'firmwareVersion') {
          query.orderBy('firmwareVersionMajor', sortOrder)
          query.orderBy('firmwareVersionMinor', sortOrder)
          query.orderBy('firmwareVersionPatch', sortOrder)
        } else if (sortBy === 'status') {
          query.orderByRaw(`
            CASE
              WHEN "isLatestVersion" AND "lastUpdate" THEN 2
              WHEN "lastUpdate" IS NOT NULL THEN 1
              ELSE 0
              END ${sortOrder === 'ASC' ? 'ASC' : 'DESC'}
            `)
        } else {
          query.orderBy(sortBy, sortOrder)
        }

        return query.limit(limit).offset(offset)
      },
      devicesViewCount: async () => {
        const [{ count }] = await connection.raw(`
        SELECT CAST(COUNT(*) as integer) as "count" FROM devices_view;
      `)
        return count
      },
    },
  }

  const server = new ApolloServer({ typeDefs, resolvers })
  await server.start()

  const app = express()
  server.applyMiddleware({ app })
  app.listen({ port })

  console.log(`GraphQL server ready at http://localhost:${port}${server.graphqlPath}`)
}
