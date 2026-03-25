#! /usr/bin/env node
import { Client } from "pg";
import env from "dotenv";
env.config();

const dbConnectionString = process.env.CONNECTION_STRING;
console.log(dbConnectionString);

const sqlScript = `
  -- Create tables only if they don't exist
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    role VARCHAR(50)
  );
  
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
  
  -- Insert default users only if they don't exist
  INSERT INTO users (username, password, role) 
  SELECT 'admin', '$2a$12$GSmThb3kRu6nTBxobLLOn.0BK6nGM6ZdVhfH4JJx4DjOhreVJGDLa', 'admin'
  WHERE NOT EXISTS (SELECT 1 FROM users WHERE username = 'admin');
  
  INSERT INTO users (username, password, role) 
  SELECT 'user', '$2a$12$zuqV/kuhDhq.2zL3zmBs6uXs5xfWGilS9lLkxYg1S44ibtNXT3Bp2', 'user'
  WHERE NOT EXISTS (SELECT 1 FROM users WHERE username = 'user');
  
  -- Insert dummy categories only if they don't exist
  INSERT INTO category (name, description) 
  SELECT 'Electronics', 'Devices and gadgets'
  WHERE NOT EXISTS (SELECT 1 FROM category WHERE name = 'Electronics');
  
  INSERT INTO category (name, description) 
  SELECT 'Groceries', 'Food and household items'
  WHERE NOT EXISTS (SELECT 1 FROM category WHERE name = 'Groceries');
  
  INSERT INTO category (name, description) 
  SELECT 'Clothing', 'Apparel and accessories'
  WHERE NOT EXISTS (SELECT 1 FROM category WHERE name = 'Clothing');
  
  -- Insert dummy items only if they don't exist
  INSERT INTO item (name, description, quantity, category_id) 
  SELECT 'Smartphone', 'Latest model smartphone', 10, 1
  WHERE NOT EXISTS (SELECT 1 FROM item WHERE name = 'Smartphone');
  
  INSERT INTO item (name, description, quantity, category_id) 
  SELECT 'Laptop', '15-inch laptop', 5, 1
  WHERE NOT EXISTS (SELECT 1 FROM item WHERE name = 'Laptop');
  
  INSERT INTO item (name, description, quantity, category_id) 
  SELECT 'Apples', 'Fresh red apples (1kg)', 50, 2
  WHERE NOT EXISTS (SELECT 1 FROM item WHERE name = 'Apples');
  
  INSERT INTO item (name, description, quantity, category_id) 
  SELECT 'T-shirt', 'Cotton t-shirt, size M', 30, 3
  WHERE NOT EXISTS (SELECT 1 FROM item WHERE name = 'T-shirt');
`;

async function clientConnection() {
  console.log("STARTING DATABASE INITIALIZATION.....");
  const client = new Client({
    connectionString: dbConnectionString,
  });
  
  try {
    await client.connect();
    await client.query(sqlScript);
    console.log("DATABASE INITIALIZATION COMPLETE");
  } catch (error) {
    console.error("Database initialization error:", error);
    throw error;
  } finally {
    await client.end();
  }
}

clientConnection();