#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const http = require("http");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

const [, , collectionName] = process.argv;

if (!collectionName) {
  console.error("Usage: node seeder.js <collectionName>");
  process.exit(1);
}

// Function to seed the database via HTTP POST request
async function seedDatabase() {
  try {
    // Read and parse the JSON file
    const filePath = path.resolve(`./db/${collectionName}.json`);
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

    if (!Array.isArray(data)) {
      console.error("JSON file must contain an array of objects.");
      process.exit(1);
    }

    // For each object in the JSON file, send an HTTP POST request
    for (const item of data) {
      const response = await sendPostRequest(`/${collectionName}`, item);
      console.log(response);
    }
  } catch (err) {
    console.error("Error occurred while seeding the database:", err);
  } finally {
    console.log("Database seeding completed.");
    process.exit(0);
  }
}

// Run the seeder
seedDatabase();

async function sendPostRequest(path, data) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    hostname: "localhost",
    port: process.env.PORT,
    path,
  };

  return new Promise((resolve, reject) => {
    const req = http.request(options, res => {
      let data = "";

      res.on("data", chunk => {
        data += chunk;
      });

      res.on("end", () => {
        resolve(data);
      });
    });

    req.on("error", err => {
      reject(err);
    });

    req.write(JSON.stringify(data));
    req.end();
  });
}
