import {IResolvers} from "graphql-tools"

const userResolver: IResolvers={
    Query: {
        getUser(){
            return {
                id: "id1",
                name: "nombre1",
                password: "password1"
            }
        }
    },
    Mutation: {
        registerUser(root:any,args:any ){
            console.log(args.user)
        }
    }
    
}

export default userResolver