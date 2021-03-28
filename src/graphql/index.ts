import { GraphQLSchema } from "graphql"
import { makeExecutableSchema, mergeSchemas } from "graphql-tools"
import "graphql-import-node"
import userSchema from "./schemas/userSchema.graphql"
import userResolver from "./resolvers/user-resolver"

export const schema : GraphQLSchema = mergeSchemas ({
    schemas:[
        makeExecutableSchema({typeDefs:[userSchema]})
    ],
    resolvers:[
        userResolver
    ]
})
