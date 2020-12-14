const { RESTDataSource } = require("apollo-datasource-rest");

const ETHPLORER_API_KEY = process.env.ETHPLORER_API_KEY;

class EthPlorerAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.ethplorer.io/";
  }

  async getAddressInfo(address) {
    return await this.get(
      `getAddressInfo/${address}?apiKey=${ETHPLORER_API_KEY}`,
      null,
      { cacheOptions: { ttl: 1 } },
    );
  }
}

module.exports = { EthPlorerAPI };
