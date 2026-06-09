const { MongoClient, ObjectId } = require("mongodb");
const { randomBytes, scryptSync, timingSafeEqual } = require("crypto");

const uri = process.env.MONGODB_URI;
let client;

async function getDb() {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }
  return client.db("rich").collection("users");
}

function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `scrypt:${salt}:${hash}`;
}

function verifyPassword(password, storedPassword) {
  if (!storedPassword) return false;
  if (!storedPassword.startsWith("scrypt:")) return password === storedPassword;

  const [, salt, storedHash] = storedPassword.split(":");
  if (!salt || !storedHash) return false;

  const hashBuffer = Buffer.from(scryptSync(password, salt, 64).toString("hex"), "hex");
  const storedHashBuffer = Buffer.from(storedHash, "hex");

  return (
    hashBuffer.length === storedHashBuffer.length &&
    timingSafeEqual(hashBuffer, storedHashBuffer)
  );
}

module.exports = async function handler(request, response) {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (request.method === "OPTIONS") { response.status(204).end(); return; }

  const path = request.query.path || [];
  const action = path[0];
  const users = await getDb();

  if (action === "register" && request.method === "POST") {
    const { email, password, fullName } = request.body || {};
    if (!email || !password || !fullName) {
      response.status(400).json({ message: "Gecersiz veri." }); return;
    }
    const exists = await users.findOne({ email: email.toLowerCase() });
    if (exists) {
      response.status(409).json({ message: "Bu e-posta adresi zaten kayitli." }); return;
    }
    const user = { fullName, email: email.toLowerCase(), password: hashPassword(password), createdAt: new Date() };
    const result = await users.insertOne(user);
    response.status(201).json({ message: "Kayit basarili.", userId: result.insertedId, fullName, email });
    return;
  }

  if (action === "login" && request.method === "POST") {
    const { email, password } = request.body || {};
    const user = await users.findOne({ email: email.toLowerCase() });
    if (!user || !verifyPassword(password, user.password)) {
      response.status(401).json({ message: "E-posta veya sifre hatali." }); return;
    }
    if (!user.password.startsWith("scrypt:")) {
      await users.updateOne(
        { _id: user._id },
        { $set: { password: hashPassword(password), passwordUpdatedAt: new Date() } }
      );
    }
    response.status(200).json({ message: "Giris basarili.", userId: user._id, fullName: user.fullName, email: user.email });
    return;
  }

  if (action === "logout" && request.method === "POST") {
    response.status(200).json({ message: "Cikis basarili." }); return;
  }

  if (action === "delete" && request.method === "DELETE") {
    const id = path[1];
    await users.deleteOne({ _id: new ObjectId(id) });
    response.status(200).json({ message: "Hesap silindi." }); return;
  }

  response.status(404).json({ message: "Endpoint bulunamadi." });
};
