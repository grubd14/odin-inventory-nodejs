//pool connection to the database
import { Pool } from "pg";
import env from "dotenv"

env.config() 

const dbPool = new Pool({
  host: process.env.HOSTNAME,
  user: process.env.USERNAME,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT
  
});

export { dbPool }
// console.log(process.env.USERNAME)