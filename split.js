import fs from 'fs';
import path from 'path';

const contentRaw = fs.readFileSync(path.join(process.cwd(), 'src/data/content.ts'), 'utf-8');

// Rather than parsing the TS directly (since it has exports), we know it's valid JS if we transpile or just regex.
// Wait, an easier way is to just write the data files using the actual objects.
