#! /usr/bin/env node

import { Client } from "pg";
import env from "dotenv"

env.config()

const dbConnectionString = process.env.CONNECTION_STRING;
console.log(dbConnectionString)
const sqlScript = `
  CREATE TABLE IF NOT EXISTS category (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255),
    description VARCHAR(255)
  );

  CREATE TABLE IF NOT EXISTS item (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255),
    description VARCHAR(255),
    quantity INTEGER,
    category_id INTEGER REFERENCES category(id)
  );

  -- insert some dummy categories
  INSERT INTO category (name, description) VALUES
    ('Electronics', 'Devices and gadgets'),
    ('Groceries', 'Food and household items'),
    ('Clothing', 'Apparel and accessories');

  -- insert some dummy items
  INSERT INTO item (name, description, quantity, category_id) VALUES
    ('Smartphone', 'Latest model smartphone', 10, 1),
    ('Laptop', '15-inch laptop', 5, 1),
    ('Apples', 'Fresh red apples (1kg)', 50, 2),
    ('T-shirt', 'Cotton t-shirt, size M', 30, 3);
`;

//using pool to make multiple transactions is not advised
// as it creates muliple connections to query
async function clientConnection() {
  console.log("STARTING.....");
  const client = new Client({
    connectionString: dbConnectionString,
  });
  await client.connect();
  await client.query(sqlScript);
  await client.end();
  console.log("DONE");
}

clientConnection();
