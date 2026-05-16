const store = globalThis.richAuthStore || { nextId: 1, users: [] };
globalThis.richAuthStore = store;

export default function handler(request, response) {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (request.method === "OPTIONS") { response.status(204).end(); return; }
  if (request.method !== "POST") { response.status(405).end(); return; }

  const { email, password } = request.body || {};
  const user = store.users.find(u => u.email === email.toLowerCase() && u.password === password);

  if (!user) { response.status(401).json({ message: "E-posta veya sifre hatali." }); return; }

  response.status(200).json({ message: "Giris basarili.", userId: user.userId, fullName: user.fullName, email: user.email });
}
