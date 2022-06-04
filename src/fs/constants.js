import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const FILES_DIR_NAME = 'files';

const ERRORS = {
  NO_ENTITY: 'ENOENT',
  EXIST: 'EEXIST',
};

export {
  __dirname,
  FILES_DIR_NAME,
  ERRORS,
};
