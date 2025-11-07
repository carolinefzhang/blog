import { getCollection } from "../../db/connection.js";
import { ObjectId } from "mongodb";
import pubsub from "../../shared/pubsub.js";
import { ID } from "graphql-ws";
import { isAuthenticated, isAuthorized } from "../../shared/auth.js";

interface CreateUserInput {
    username: string;
    email: string;
    password: string;
}

interface UpdateUserInput {
    id: ID;
    username?: string;
    email?: string;
    password?: string;
}

// Lazy getter for users collection
const getUsersCollection = () => getCollection("users");

const resolvers = {
    User: {
        id: (parent: any) => parent.id ?? parent._id,
    },
    Query: {
        async user(_: any, { id }: { id: string }) {
            let query = { _id: new ObjectId(id) };
            return await getUsersCollection().findOne(query);
        },
        async users(_: any, __: any, context: any) {
            return await getUsersCollection().find({}).toArray();
        },
        me: (_: any, __: any, context: any) => {
            // Assuming context contains user info after authentication
            isAuthenticated(context.user);
            return context.user;
        }
    },
    Mutation: {
        async createUser(_: any, { input }: { input: CreateUserInput }, context: any) {
            isAuthenticated(context.user); // Only authenticated users can create new users
            const { username, email, password } = input
            const insert = await getUsersCollection().insertOne({ username, email, password });
            if (insert.acknowledged) {
                const newUser = { username, email, password, id: insert.insertedId };
                pubsub.publish("User_CREATED", { userCreated: newUser });
                return newUser;
            }
            return null;
        },
        async updateUser(_: any, { input }: { input: UpdateUserInput }, context: any) {
            isAuthenticated(context.user); // Only authenticated users can update users
            const id = new ObjectId(input.id);
            let query = { _id: new ObjectId(id) };
            const update = await getUsersCollection().updateOne(
                query,
                { $set: { ...input } }
            );

            if (update.acknowledged)
                return await getUsersCollection().findOne(query);

            return null;
        },
        async deleteUser(_: any, { id }: { id: string }, context: any) {
            isAuthorized(context.user, ["admin"]); // Only admin can delete users
            const dbDelete = await getUsersCollection().deleteOne({ _id: new ObjectId(id) });
            return dbDelete.acknowledged && dbDelete.deletedCount == 1 ? true : false;
        },
    },
    Subscription: {
        userCreated: {
            subscribe: () => pubsub.asyncIterableIterator("USER_CREATED")
        }
    }
};

export default resolvers;