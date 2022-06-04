import { zip, options } from './zip.js';

export const compress = async () => {
  await zip(options.compress);
};

compress();
