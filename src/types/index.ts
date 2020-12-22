import EthPlorerAPI from "../dataSource/ethPlorer";
import GraphAPI from "../dataSource/graph";

export type ApolloContext = {
  dataSources: {
    ethPlorer: EthPlorerAPI,
    graph: GraphAPI
  }
}