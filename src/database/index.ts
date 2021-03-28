import mongoose from "mongoose"
import config from "../config"
const url:string = config.mongoUrl!

mongoose.connect(url,{
    useCreateIndex: true,
    useNewUrlParser: true
})
    .then((db:any)=>console.log("database connected"))
    .catch((err:any)=>console.log(err))
    

export default mongoose