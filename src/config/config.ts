import dotenv from 'dotenv';
const envParsed = dotenv.config().parsed || {};

const config = {
  //You need to create a db name manually in Mysql and put the name of database in .env file
  dbName: "RecipeChallenge",
  port: envParsed.PORT || 3000,
  /*AuthToken is to set authorization, if it is true, it will block queries some if you haven't an user
    bearer token in your header so you maybe have to use an aplication like Postman or Insomnia,
    you can set it to false to query in a more comfortable way in your browser
    */
  authToken: false,
  encryptPassword: envParsed.JWT_ENCRYPT_PASSWORD || '',
  graphqlPath: '/graphql',
};

export default config;
