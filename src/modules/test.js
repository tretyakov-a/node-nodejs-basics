import { unknownObject, createMyServer } from './cjsToEsm.mjs';

console.log(unknownObject);

const PORT = 8080;
console.log(`Server on localhost:${PORT}`);
createMyServer.listen(PORT);
