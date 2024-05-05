import fs from 'fs';
import path from 'path';
import * as childproc from 'child_process';
import * as url from 'url';

import version from '#version';

const copyToClip = (data) => {
    let proc = childproc.spawn({
        'darwin': 'pbcopy',
        'win32': 'clip',
        'linux': 'xclip' // most linux systems have xclip but since its linux its a them problem not having it lol
    }[process.platform]); 
    proc.stdin.write(data);
    proc.stdin.end();
};

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const userscriptTemplate = fs.readFileSync(path.resolve(__dirname, 'template.txt'), 'utf-8');
const bundledCode = fs.readFileSync(path.resolve(__dirname, '../dist/bb.min.js'), 'utf-8');

const userscriptCode = userscriptTemplate
    .replace('{{code}}', bundledCode)
    .replace('{{version}}', version);

fs.writeFileSync(path.resolve(__dirname, '../dist/bb.user.js'), userscriptCode);

copyToClip(userscriptCode);

console.log('\nUserscript built & copied to your clipboard for convenience!');