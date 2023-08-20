export const typeDefs = `
  type DeviceView {
    name: String!
    userEmail: String
    userIsAdmin: Boolean
    firmwareVersion: String
    lastUpdate: String
    isLatestVersion: Boolean
  }

  type Device {
    name: String!, 
  }

  type Query {
    devicesView(offset: Int, limit: Int, sortBy: String, sortOrder: String): [DeviceView!]!
    devicesViewCount: Int!
  }
`
