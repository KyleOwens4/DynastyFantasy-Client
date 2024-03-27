import express from "express";

const port = 8080;
const app = express();

app.get("/graphql", (req, res) => {
  res.send("Hello from graphql");
});

app.get("/", (req, res) => {
  res.send("Hello from express test TSa!!!");
});

app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
  console.log("Press Ctrl-C to exit");
});
