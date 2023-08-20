import { gql } from '@apollo/client'

export const graphQLQueries = {
  devicesView: gql`
    query DevicesView($offset: Int, $limit: Int, $sortBy: String, $sortOrder: String) {
      devicesView(offset: $offset, limit: $limit, sortBy: $sortBy, sortOrder: $sortOrder) {
        name
        userEmail
        userIsAdmin
        firmwareVersion
        lastUpdate
        isLatestVersion
      }
    }
  `,
  devicesViewCount: gql`
    query DevicesViewCount {
      devicesViewCount
    }
  `,
}
