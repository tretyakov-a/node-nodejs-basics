import path from 'path';
import { fileURLToPath } from 'url';
import { fork } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIR_NAME = 'files';
const FILE_NAME = 'script.js';

export const spawnChildProcess = async (args) => {
  const scriptSrc = path.join(__dirname, DIR_NAME, FILE_NAME);

  const child = fork(scriptSrc, args);

  child.on('error', (err) => {
    console.error(err);
  });

  child.on('close', (code) => {
    console.log(`Child process closed with code ${code}. `);
  });
};

spawnChildProcess(['arg1', 'arg2']);
