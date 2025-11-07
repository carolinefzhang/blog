import { loadSchema } from "@graphql-tools/load";
import { UrlLoader } from "@graphql-tools/url-loader";
import fetch from "cross-fetch";

const createRemoteSchema = async () => {
  const schema = await loadSchema("https://rickandmortyapi.com/graphql", {
    loaders: [new UrlLoader()],
    fetch,
  });
  return schema;
}
export default createRemoteSchema;