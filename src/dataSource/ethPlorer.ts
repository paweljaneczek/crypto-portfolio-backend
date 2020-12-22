import { RESTDataSource } from "apollo-datasource-rest";

const ETHPLORER_API_KEY = process.env.ETHPLORER_API_KEY;

export default class EthPlorerAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.ethplorer.io/";
  }

  async getAddressInfo(address: string) {
    return await this.get(
      `getAddressInfo/${address}?apiKey=${ETHPLORER_API_KEY}`,
      undefined,
      { cacheOptions: { ttl: 1 } },
    );
  }
}
