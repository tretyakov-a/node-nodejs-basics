import path from 'path';
import fs from 'fs';
import { pipeline } from 'stream/promises';
import { createGzip, createGunzip } from 'zlib';
import { getConstants } from '../constants.js';

const { __dirname, FILES_DIR_NAME } = getConstants(import.meta.url);
const FILE_NAME = 'fileToCompress.txt';
const COMPRESSED_FILE_NAME = 'archive.gz'

const createOption = (src, dest, createTransform) => ({ src, dest, createTransform });
export const options = {
  compress: createOption(FILE_NAME, COMPRESSED_FILE_NAME, createGzip),
  decompress: createOption(COMPRESSED_FILE_NAME, FILE_NAME, createGunzip),
}

export const zip = async (option = options.compress) => {
  try {
    const { src, dest, createTransform } = option;
    const readStream = fs.createReadStream(path.join(__dirname, FILES_DIR_NAME, src));
    const writeStream = fs.createWriteStream(path.join(__dirname, FILES_DIR_NAME, dest));
  
    await pipeline(readStream, createTransform.call(null), writeStream);
  } catch (err) {
    console.error(err);
  }
};
