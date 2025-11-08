import { ApolloServer } from '@apollo/server';
import { stitchSchemas } from '@graphql-tools/stitch';
import localSchema from './schema/local.schema.js';
import createRemoteSchema from './schema/remote.schema.js';

const startGateway = async () => {
    const remoteSchema = await createRemoteSchema();

    const gatewaySchema = stitchSchemas({
        subschemas: [
            {
                schema: localSchema,
            },
            {
                schema: remoteSchema,
            },
        ],
    });

    const server = new ApolloServer({
        schema: gatewaySchema,
    });

    await server.start();

    return server;
};

export default startGateway;