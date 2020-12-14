require("dotenv").config();
const { server } = require("./src/App");

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
