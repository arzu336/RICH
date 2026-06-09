const { MongoClient } = require("mongodb");
const { randomBytes, scryptSync, timingSafeEqual } = require("crypto");

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

function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `scrypt:${salt}:${hash}`;
}

function verifyPassword(password, storedPassword) {
  if (!storedPassword) return false;

  if (!storedPassword.startsWith("scrypt:")) {
    return password === storedPassword;
  }

  const [, salt, storedHash] = storedPassword.split(":");
  if (!salt || !storedHash) return false;

  const hashBuffer = Buffer.from(scryptSync(password, salt, 64).toString("hex"), "hex");
  const storedHashBuffer = Buffer.from(storedHash, "hex");

  return (
    hashBuffer.length === storedHashBuffer.length &&
    timingSafeEqual(hashBuffer, storedHashBuffer)
  );
}

module.exports = {
  getUsersCollection,
  handleOptions,
  hashPassword,
  setCorsHeaders,
  verifyPassword,
};
