import { zip, options } from './zip.js';

export const decompress = async () => {
  await zip(options.decompress);
};

decompress();
