//pool connection to the database
import { Pool } from "pg";

const dbPool = new Pool({
  host: process.env.HOSTNAME,
  user: process.env.USERNAME,
  database: process.env.DATABASE,
  port: process.env.PORT
  
});

export { dbPool }
// console.log(process.env.USERNAME)