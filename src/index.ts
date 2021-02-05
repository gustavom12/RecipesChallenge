import { schema } from './graphql/index';
import express from "express"
import cors from "cors"
import {ApolloServer} from "apollo-server-express"
import MongoLib from "./database"

const app = express()
app.use(cors())

const server = new ApolloServer({
    schema,
    playground: true,
    introspection: true,
    context: async()=> new MongoLib().connect()
})

server.applyMiddleware({app})

const port = process.env.PORT || 3000

app.listen(port,()=>{
    console.log("app inicializada")
})