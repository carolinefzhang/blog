import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { ApolloServer } from '@apollo/server';
import localSchema from './schema/local.schema';

import { expressMiddleware } from '@as-integrations/express5';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';
import { verifyToken } from './shared/auth';
import startGateway from './gateway';

const PORT = process.env.PORT || 5050;
const app = express() as any;

app.use(cors());
app.use(express.json());

// Note you must call `start()` on the `ApolloServer`
// instance before passing the instance to `expressMiddleware`
const apolloServer = new ApolloServer({
  schema: localSchema,
});
await apolloServer.start();

// Specify the path to mount the server
app.use(
  '/graphql',
  cors(),
  express.json(),
  // expressMiddleware(apolloServer),
  expressMiddleware(apolloServer, {
    context: async ({ req }) => {
      // Here you can extract user info from request headers for authentication
      const token = req.headers.authorization || '';
      // You can verify the token and extract user details here
      const user = verifyToken(token.replace('Bearer ', ''));
      return { user }; // Replace null with actual user object after verification
    },
  }),
);

const httpServer = createServer(app);

SubscriptionServer.create(
  {
    schema: localSchema,
    execute,
    subscribe,
    onConnect: (connectionParams: any, webSocket: any) => {
      console.log('Client connected for subscriptions');
    },
  },
  { server: httpServer, path:'/graphql' },
);

// start the Express server
httpServer.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
  console.log(`HTTP GraphQL endpoint is running on http://localhost:${PORT}/graphql`);
  console.log(`WebSocket Subscriptions are running on ws://localhost:${PORT}/graphql`);
});