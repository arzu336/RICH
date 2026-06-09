const {
  getUsersCollection,
  handleOptions,
  hashPassword,
  setCorsHeaders,
} = require("../../lib/auth-db.js");

module.exports = async function handler(request, response) {
  setCorsHeaders(response);
  if (handleOptions(request, response)) return;

  if (request.method !== "POST") {
    response.status(405).json({ message: "Method not allowed." });
    return;
  }

  try {
    const { email, password, fullName } = request.body || {};

    if (!email || !password || !fullName) {
      response.status(400).json({ message: "Gecersiz veri." });
      return;
    }

    const users = await getUsersCollection();
    const normalizedEmail = email.toLowerCase().trim();
    const exists = await users.findOne({ email: normalizedEmail });

    if (exists) {
      response.status(409).json({ message: "Bu e-posta adresi zaten kayitli." });
      return;
    }

    const user = {
      fullName: fullName.trim(),
      email: normalizedEmail,
      password: hashPassword(password),
      createdAt: new Date(),
    };
    const result = await users.insertOne(user);

    response.status(201).json({
      message: "Kayit basarili.",
      userId: result.insertedId,
      fullName: user.fullName,
      email: user.email,
    });
  } catch (error) {
    response.status(500).json({ message: "Kayit islemi basarisiz.", error: error.message });
  }
};
