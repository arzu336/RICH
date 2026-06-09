const store = globalThis.richAuthStore || {
  nextId: 1,
  users: [],
};

globalThis.richAuthStore = store;

function readBody(request) {
  if (request.body && typeof request.body === 'object') {
    return request.body;
  }

  return {};
}

export default function handler(request, response) {
  const path = request.query.path || [];
  const action = path[0];
  const id = path[1];

  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (request.method === 'OPTIONS') {
    response.status(204).end();
    return;
  }

  if (action === 'register' && request.method === 'POST') {
    const body = readBody(request);
    const email = String(body.email || '').trim().toLowerCase();
    const password = String(body.password || '');
    const fullName = String(body.fullName || '').trim();

    if (!email || !password || !fullName) {
      response.status(400).json({ message: 'Gecersiz veri.' });
      return;
    }

    if (store.users.some((user) => user.email === email)) {
      response.status(409).json({ message: 'Bu e-posta adresi zaten kayitli.' });
      return;
    }

    const user = {
      userId: store.nextId++,
      fullName,
      email,
      password,
    };

    store.users.push(user);
    response.status(201).json({
      message: 'Kayit basarili.',
      userId: user.userId,
      fullName: user.fullName,
      email: user.email,
    });
    return;
  }

  if (action === 'login' && request.method === 'POST') {
    const body = readBody(request);
    const email = String(body.email || '').trim().toLowerCase();
    const password = String(body.password || '');
    const user = store.users.find((item) => item.email === email && item.password === password);

    if (!user) {
      response.status(401).json({ message: 'E-posta veya sifre hatali.' });
      return;
    }

    response.status(200).json({
      message: 'Giris basarili.',
      userId: user.userId,
      fullName: user.fullName,
      email: user.email,
    });
    return;
  }

  if (action === 'logout' && request.method === 'POST') {
    response.status(200).json({ message: 'Cikis basarili.' });
    return;
  }

  if (action === 'delete' && request.method === 'DELETE') {
    const userId = Number(id);
    const index = store.users.findIndex((user) => user.userId === userId);

    if (index === -1) {
      response.status(404).json({ message: 'Kullanici bulunamadi.' });
      return;
    }

    store.users.splice(index, 1);
    response.status(200).json({ message: 'Hesap silindi.' });
    return;
  }

  response.status(404).json({ message: 'Endpoint bulunamadi.' });
}
