import { makeExecutableSchema } from "@graphql-tools/schema";
import typeDefs from ".";
import resolvers from "../resolvers";

const localSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default localSchema;