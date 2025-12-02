import express from "express";
import path from "node:path"
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename) 


const  PORT = 3000
app.listen(PORT, () => {
  console.log(`"express app-listening on port ${PORT}"`)
})