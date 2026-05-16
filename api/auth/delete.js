const { ObjectId } = require("mongodb");
const { getUsersCollection, handleOptions, setCorsHeaders } = require("../../lib/auth-db.js");

module.exports = async function handler(request, response) {
  setCorsHeaders(response);
  if (handleOptions(request, response)) return;

  if (request.method !== "DELETE") {
    response.status(405).json({ message: "Method not allowed." });
    return;
  }

  try {
    const { id } = request.query;

    if (!id || !ObjectId.isValid(id)) {
      response.status(400).json({ message: "Gecersiz kullanici id." });
      return;
    }

    const users = await getUsersCollection();
    await users.deleteOne({ _id: new ObjectId(id) });
    response.status(200).json({ message: "Hesap silindi." });
  } catch (error) {
    response.status(500).json({ message: "Hesap silinemedi.", error: error.message });
  }
};
