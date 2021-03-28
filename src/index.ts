import { schema } from './graphql/index';
import express from "express"
import cors from "cors"
import {ApolloServer} from "apollo-server-express"
import MongoLib from "./database"
import  mongoose  from './database';

const app = express()
app.use(cors())

const server = new ApolloServer({
    schema,
    context: async ({req}) => {
        mongoose
        // get the authorization from the request headers
        // return a context obj with our token. if any!
        //auth
    }
})

server.applyMiddleware({app})

const port = process.env.PORT || 3000

app.listen(port,()=>{
    console.log("app inicializada")
})