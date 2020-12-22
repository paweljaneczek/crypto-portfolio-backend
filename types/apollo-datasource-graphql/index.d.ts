declare module "apollo-datasource-graphql" {
  import { DataSource } from "apollo-datasource";

  class GraphQLDataSource extends DataSource {
    query(gql: any, options?: { variables: any }): any;
  }

  export { GraphQLDataSource };
}
