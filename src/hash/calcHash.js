import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const DIR_NAME = 'files';
const FILE_NAME = 'fileToCalculateHashFor.txt';

export const calculateHash = async () => {
  const pathToFile = path.join(__dirname, DIR_NAME, FILE_NAME);
  const hash = crypto.createHash('sha256');
  hash.setEncoding('hex');

  const readStream = fs.createReadStream(pathToFile);

  return await new Promise((resolve, reject) => {
    readStream.on('end', () => {
      hash.end();
      resolve(hash.read());
    })
    readStream.pipe(hash).on('error', (err) => reject(err))
  })

};

calculateHash()
  .then((hash) => console.log(hash));
