import { makeExecutableSchema } from "@graphql-tools/schema";
import typeDefs from "./index.js";
import resolvers from "../resolvers.js";

const localSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default localSchema;