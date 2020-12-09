const { EthPlorerAPI } = require("./dataSource/EthPlorerAPI");
const { ApolloServer, gql } = require("apollo-server");

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
    decimals: String!
    symbol: String!
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
    walletInfo: async (_source, { address }, { dataSources }) => {
      return dataSources.ethPlorer.getAddressInfo(address);
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  cacheControl: {
    defaultMaxAge: 0,
  },
  dataSources: () => {
    return {
      ethPlorer: new EthPlorerAPI(),
    };
  },
});

module.exports = { server };
