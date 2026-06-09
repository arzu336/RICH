const {
  getUsersCollection,
  handleOptions,
  hashPassword,
  setCorsHeaders,
  verifyPassword,
} = require("../../lib/auth-db.js");

module.exports = async function handler(request, response) {
  setCorsHeaders(response);
  if (handleOptions(request, response)) return;

  if (request.method !== "POST") {
    response.status(405).json({ message: "Method not allowed." });
    return;
  }

  try {
    const { email, password } = request.body || {};

    if (!email || !password) {
      response.status(400).json({ message: "Gecersiz veri." });
      return;
    }

    const users = await getUsersCollection();
    const user = await users.findOne({ email: email.toLowerCase().trim() });

    if (!user || !verifyPassword(password, user.password)) {
      response.status(401).json({ message: "E-posta veya sifre hatali." });
      return;
    }

    if (!user.password.startsWith("scrypt:")) {
      await users.updateOne(
        { _id: user._id },
        { $set: { password: hashPassword(password), passwordUpdatedAt: new Date() } }
      );
    }

    response.status(200).json({
      message: "Giris basarili.",
      userId: user._id,
      fullName: user.fullName,
      email: user.email,
    });
  } catch (error) {
    response.status(500).json({ message: "Giris islemi basarisiz.", error: error.message });
  }
};
