import { createConnection } from 'typeorm';
import path from 'path';
import config from './config';
export async function connectDB() {
  await createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: config.dbName,
    entities: [
      path.join(__dirname, "../entities/**{.ts,.js}")
    ],
    synchronize: true
  });
  console.log("database connected")
}
