import express from 'express';
import config from './config/config';
import cors from 'cors';
import { graphqlServer } from "./graphql";
import { connectDB } from './config/typeorm';

const startServer = async () => {
  connectDB()
  const app = express();
  app.use(cors());

  const server = await graphqlServer()
  server.applyMiddleware({ app, path: config.graphqlPath });

  const port = config.port;
  app.listen(port, () => {
    console.log(`server started go to "http://localhost:${port}${config.graphqlPath}" to see it`);
  });
};
startServer()
