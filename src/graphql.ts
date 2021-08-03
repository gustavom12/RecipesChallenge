import 'reflect-metadata';
import { UserResolver } from './resolvers/user.resolver';
import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server-express';
import { RecipeResolver } from './resolvers/recipe.resolver';
import { CategoryResolver } from './resolvers/category.resolver';
import config from './config/config';
import { Auth } from './auth';

const JWT_ENCRYPT_PASSWORD = config.encryptPassword

const graphqlServer = async () => {
  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, RecipeResolver, CategoryResolver],
      /*
        This function verificates if user has a valid bearer token on the header
        you will not be able to do some queries in your browser, so you have to test it in an aplication like
        insomnia or postman, to disactivate it, go to "config.ts" file
      */
      authChecker: Auth
    }),
    context: ({ req, res }) => ({ req, res }),
  });
  return server;
};

export { graphqlServer };
