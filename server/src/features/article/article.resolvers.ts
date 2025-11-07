import { getCollection } from "../../db/connection.js";
import { ObjectId } from "mongodb";
import pubsub from "../../shared/pubsub.js";
import { isAuthorized } from "../../shared/auth.js";

interface CreateArticleInput {
  title: string;
  content: string;
}

interface UpdateArticleInput {
  id: string;
  title?: string;
  content?: string;
}

// Lazy getter for articles collection
const getArticlesCollection = () => getCollection("articles");

const resolvers = {
  Article: {
    id: (parent: any) => parent.id ?? parent._id,
  },
  Query: {
    async article(_: any, { id }: { id: string }) {
      let query = { _id: new ObjectId(id) };
      return await getArticlesCollection().findOne(query);
    },
    async articles(_: any, __: any, context: any) {
      return await getArticlesCollection().find({}).toArray();
    },
  },
  Mutation: {
    async createArticle(_: any, { input }: { input: CreateArticleInput }, context: any) {
      const { title, content } = input
      const insert = await getArticlesCollection().insertOne({ title, content });
      if (insert.acknowledged) {
        const newArticle = { title, content, id: insert.insertedId };
        pubsub.publish("ARTICLE_CREATED", { articleCreated: newArticle });
        return newArticle;
      }
      return null;
    },
    async updateArticle(_: any, { input }: { input: UpdateArticleInput }, context: any) {
      const id = new ObjectId(input.id);
      let query = { _id: new ObjectId(id) };
      const update = await getArticlesCollection().updateOne(
        query,
        { $set: { ...input } }
      );

      if (update.acknowledged)
        return await getArticlesCollection().findOne(query);

      return null;
    },
    async deleteArticle(_: any, { id }: { id: string }, context: any) {
      isAuthorized(context.user, ["admin"]); // Only admin can delete articles
      const dbDelete = await getArticlesCollection().deleteOne({ _id: new ObjectId(id) });
      return dbDelete.acknowledged && dbDelete.deletedCount == 1 ? true : false;
    },
  },
  Subscription: {
    articleCreated: {
      subscribe: () => pubsub.asyncIterableIterator("ARTICLE_CREATED")
    }
  }
};

export default resolvers;