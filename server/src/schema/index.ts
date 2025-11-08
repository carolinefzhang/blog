import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";
import path from "path";

const __dirname = import.meta.dirname;

console.log('Schema directory:', __dirname);

// Load from source directory, not dist
const srcDir = path.resolve(__dirname, '../../src');
const featuresPath = path.join(srcDir, 'features/**/*.graphql');
const sharedPath = path.join(srcDir, 'shared/**/*.graphql');

const featuresFiles = loadFilesSync(featuresPath, { extensions: ["graphql"] });
const sharedFiles = loadFilesSync(sharedPath, { extensions: ["graphql"] });

const typesArray = featuresFiles.concat(sharedFiles);
const typeDefs = mergeTypeDefs(typesArray);

export default typeDefs;