import { workerData, parentPort } from 'worker_threads';

export const nthFibonacci = (n) => n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

export const sendResult = () => {
  const result = nthFibonacci(workerData.n);
  const rndNumber = Math.random();

  // testing errors and process stops
  if (rndNumber < 0.1) {
    throw new Error('Error in worker');
  }
  if (rndNumber > 0.1 && rndNumber < 0.2) {
    process.exitCode = 1;
  } else {
    parentPort.postMessage(result);
  }
};

sendResult();
