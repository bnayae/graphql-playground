const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema");
const cors = require("cors");

const app = express();
let count = 0;
app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true
  })
);
app.get("/health", (req, res) => {
  res.send(`I'm OK: ${new Date().toISOString()}`);
});
app.get("/readiness", (req, res) => {
  res.send(`I'm ready: ${new Date().toISOString()}`);
});
app.get("/metrics", (req, res) => {
  res.send(`service_demo_connection_health ${count++ % 10 !== 7}`);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
