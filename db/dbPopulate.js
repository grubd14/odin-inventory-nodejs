import { Client } from "pg";

const dbConnectionString = process.env.CONNECTION_STRING;

const sqlScript = ``

//using pool to make multiple transactions is not advised 
// as it creates muliple connections to query 
async function clientConnection() {
  console.log("STARTING.....")
  const client = new Client({
    connectionString: dbConnectionString
  })
  await client.connect()
  await client.query(sqlScript)
  await client.end()
  console.log("DONE")
}

clientConnection();




