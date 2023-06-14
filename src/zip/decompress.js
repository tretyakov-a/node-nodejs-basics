import { zip, options } from "./zip.js";

const decompress = async () => {
  await zip(options.decompress);
};

decompress();
