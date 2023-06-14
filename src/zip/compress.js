import { zip, options } from "./zip.js";

const compress = async () => {
  await zip(options.compress);
};

compress();
