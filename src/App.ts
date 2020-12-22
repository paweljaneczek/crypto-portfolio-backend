import { EthPlorerAPI, GraphAPI } from "./dataSource";
import { ApolloServer, gql } from "apollo-server";
import { Context } from "apollo-server-core";
import { ApolloContext } from "./types";
import { convertEthPlorerResult } from "./converter";

const typeDefs = gql`
  type WalletTokenPrice {
    rate: Float
    diff: Float
    diff7d: Float
    ts: Int
    currency: String
  }

  type WalletTokenContentInfo {
    address: String!
    name: String
    decimals: String
    symbol: String
    totalSupply: String!
    owner: String!
    holdersCount: Int!
    image: String
    website: String
    telegram: String
    twitter: String
    coingecko: String
    price: WalletTokenPrice
    publicTags: [String]!
  }

  type WalletTokenInfo {
    balance: Float!
    tokenInfo: WalletTokenContentInfo!
  }

  type WalletEthInfo {
    balance: Float!
    price: WalletTokenPrice!
  }

  type WalletInfo {
    ETH: WalletEthInfo!
    countTxs: Int!
    tokens: [WalletTokenInfo]
  }

  type Query {
    walletInfo(address: String): WalletInfo
  }
`;

const resolvers = {
  Query: {
    walletInfo: async (
      _: unknown,
      { address }: { address: string },
      { dataSources }: Context<ApolloContext>,
    ) => {
      return dataSources.ethPlorer
        .getAddressInfo(address)
        .then(convertEthPlorerResult);
    },
  },
};

export default new ApolloServer({
  typeDefs,
  resolvers,
  cacheControl: {
    defaultMaxAge: 0,
  },
  dataSources: () => {
    return {
      ethPlorer: new EthPlorerAPI(),
      graph: new GraphAPI(),
    };
  },
});
