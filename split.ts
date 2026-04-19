import fs from 'fs';
import path from 'path';
import { kandams, pravachanaRoopaRamayanam } from './src/data/content.js';

const kandamsDir = path.join(process.cwd(), 'src/data/kandams');
if (!fs.existsSync(kandamsDir)) {
  fs.mkdirSync(kandamsDir, { recursive: true });
}

kandams.forEach(kandam => {
  const content = `import { Kandam } from '../types';\n\nexport const ${kandam.id}: Kandam = ${JSON.stringify(kandam, null, 2)};\n`;
  fs.writeFileSync(path.join(kandamsDir, `${kandam.id}.ts`), content, 'utf-8');
});

const pravContent = `import { Pravachanam } from './types';\n\nexport const pravachanaRoopaRamayanam: Pravachanam[] = ${JSON.stringify(pravachanaRoopaRamayanam, null, 2)};\n`;
fs.writeFileSync(path.join(process.cwd(), 'src/data/pravachanam.ts'), pravContent, 'utf-8');

console.log("Done splitting.");
