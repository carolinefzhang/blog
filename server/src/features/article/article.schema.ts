import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";

const __dirname = import.meta.dirname;

console.log(__dirname);

const typesArray = loadFilesSync(
  __dirname, { extensions: ["graphql"] }
);

const typeDefs = mergeTypeDefs(typesArray);

export default typeDefs;