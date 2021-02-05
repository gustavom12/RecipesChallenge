import dotenv from "dotenv"
dotenv.config()

const config ={
    dbName: process.env.DB_NAME,
    mongoUrl: process.env.MONGO_URL,
    port: process.env.PORT
}

export default config