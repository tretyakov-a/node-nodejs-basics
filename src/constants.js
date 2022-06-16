import path from 'path';
import { fileURLToPath } from 'url';

const FILES_DIR_NAME = 'files';

const ERRORS = {
  NO_ENTITY: 'ENOENT',
  EXIST: 'EEXIST',
};

export function getConstants(url) {
  const __filename = fileURLToPath(url);
  const __dirname =  path.dirname(__filename);
  return {
    __filename,
    __dirname,
    FILES_DIR_NAME,
    ERRORS,
  }
};