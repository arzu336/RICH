import { cpSync, mkdirSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const distAssets = 'dist/assets';
const publicAssets = 'public/assets';

if (!existsSync(distAssets)) {
  console.warn('dist/assets bulunamadi. Once: npm run build');
  process.exit(0);
}

mkdirSync(publicAssets, { recursive: true });
for (const file of readdirSync(distAssets)) {
  cpSync(join(distAssets, file), join(publicAssets, file), { force: true });
  console.log('Kopyalandi:', file);
}
