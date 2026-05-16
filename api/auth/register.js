const store = globalThis.richAuthStore || { nextId: 1, users: [] };
globalThis.richAuthStore = store;

export default function handler(request, response) {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (request.method === "OPTIONS") { response.status(204).end(); return; }
  if (request.method !== "POST") { response.status(405).end(); return; }

  const { email, password, fullName } = request.body || {};
  if (!email || !password || !fullName) { response.status(400).json({ message: "Gecersiz veri." }); return; }
  if (store.users.some(u => u.email === email.toLowerCase())) { response.status(409).json({ message: "Bu e-posta adresi zaten kayitli." }); return; }

  const user = { userId: store.nextId++, fullName, email: email.toLowerCase(), password };
  store.users.push(user);
  response.status(201).json({ message: "Kayit basarili.", userId: user.userId, fullName: user.fullName, email: user.email });
}
