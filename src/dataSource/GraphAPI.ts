const { GraphQLDataSource } = require("apollo-datasource-graphql");
const { gql } = require("apollo-server-express");

const GET_PAIRS_FETCH = gql`
  query {
    pairs(
      where: {
        token0_in: $tokenIds
        token1: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
      }
    ) {
      token1 {
        id
      }
      token0Price
      token1Price
    }
  }
`;

class GraphAPI extends GraphQLDataSource {
  baseURL = "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2";

  async getTestFetch(tokenIds) {
    try {
      const response = await this.query(GET_PAIRS_FETCH, {
        variables: {
          tokenIds,
        },
      });

      return response.data.tokens;
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = { GraphAPI };
