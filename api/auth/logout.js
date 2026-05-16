const { handleOptions, setCorsHeaders } = require("../../lib/auth-db.js");

module.exports = async function handler(request, response) {
  setCorsHeaders(response);
  if (handleOptions(request, response)) return;

  if (request.method !== "POST") {
    response.status(405).json({ message: "Method not allowed." });
    return;
  }

  response.status(200).json({ message: "Cikis basarili." });
};
