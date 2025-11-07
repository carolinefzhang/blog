import { mergeResolvers } from "@graphql-tools/merge";
import { loadFilesSync } from "@graphql-tools/load-files";
import path from "path";

const __dirname = import.meta.dirname;

const resolversArray = loadFilesSync(
  path.join(__dirname, '../features/**/*.resolvers.*'), { extensions: ["ts", "js"] }
).concat(
  loadFilesSync(
    path.join(__dirname, '../shared/**/*.resolvers.*'), { extensions: ["ts", "js"] }
  )
);

const resolvers = mergeResolvers(resolversArray);

export default resolvers;