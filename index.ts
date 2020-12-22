import 'dotenv/config'
import server from "./src/App";

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
