const { getUsersCollection, handleOptions, setCorsHeaders } = require("../../lib/auth-db.js");

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
    const user = await users.findOne({ email: email.toLowerCase().trim(), password });

    if (!user) {
      response.status(401).json({ message: "E-posta veya sifre hatali." });
      return;
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
