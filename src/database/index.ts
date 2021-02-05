import {Db, MongoClient} from "mongodb"
import config from "../config/index"

export default class MongoLib{
    private Client: MongoClient
    private dbName: any = config.dbName
    private mongoURL: any = config.mongoUrl
    private static connection: Db
    constructor(){
        this.Client = new MongoClient(this.mongoURL,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    }
    async connect(){
        if(!MongoLib.connection){
            try {
                await this.Client.connect()
                console.log("connected to database")
            } catch (error) {
                console.log(error)
            }
        }
        return MongoLib.connection
    }
}