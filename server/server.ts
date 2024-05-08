import express from "express";
import "reflect-metadata";
import { buildSchemaSync } from "type-graphql";
import { UserResolver } from "./resolvers/UserResolver";
import { graphqlHTTP } from "express-graphql";
import dotenv from "dotenv";
import { DyntasyResolvers } from "./resolvers/ResolverIndex";
import { NodeResolver } from "./resolvers/NodeResolver";

dotenv.config();

const app = express();

const schema = buildSchemaSync({
  resolvers: DyntasyResolvers,
  emitSchemaFile: {
    path: "./graphql/schema.graphql",
  },
});

app.use(
  "/graphql",
  graphqlHTTP({ schema, graphiql: Boolean(process.env.SHOW_GRAPHQL_UI) })
);

app.listen(process.env.PORT, () => {
  console.log(`Now listening on port ${process.env.PORT}`);
  console.log("Press Ctrl-C to exit");
});
