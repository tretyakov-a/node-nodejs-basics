import { Transform } from "stream";
import { pipeline } from "stream/promises";

const reverseString = (str) => str.split("").reverse().join("");

const transform = async () => {
  const reverseTransform = new Transform({
    transform(chunk, _, callback) {
      const reversedString = reverseString(String(chunk).slice(0, -1));
      callback(null, Buffer.from(`${reversedString}\n`));
    },
  });

  try {
    await pipeline(process.stdin, reverseTransform, process.stdout);
  } catch (err) {
    console.error(err);
  }
};

transform();
