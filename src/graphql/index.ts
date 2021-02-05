import { GraphQLSchema } from "graphql"
import { makeExecutableSchema } from "graphql-tools"
import "graphql-import-node"
import userSchema from "./schemas/userSchema.graphql"
import userResolver from "./resolvers/user-resolver"

export const schema : GraphQLSchema = makeExecutableSchema({
    typeDefs:[
        userSchema
    ],
    resolvers:[
        userResolver
    ]
})