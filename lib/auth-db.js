const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;
let client;

async function getUsersCollection() {
  if (!uri) {
    throw new Error("MONGODB_URI environment variable is not set.");
  }

  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }

  return client.db("rich").collection("users");
}

function setCorsHeaders(response) {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function handleOptions(request, response) {
  if (request.method === "OPTIONS") {
    response.status(204).end();
    return true;
  }

  return false;
}

module.exports = {
  getUsersCollection,
  handleOptions,
  setCorsHeaders,
};
