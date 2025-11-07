import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";
import path from "path";

const __dirname = import.meta.dirname;

console.log(__dirname);

const typesArray = loadFilesSync(
  path.join(__dirname, '../features/**/*.graphql'), { extensions: ["graphql"] }
).concat(
  loadFilesSync(
    path.join(__dirname, '../shared/**/*.graphql'), { extensions: ["graphql"] }
  )
);

const typeDefs = mergeTypeDefs(typesArray);

export default typeDefs;