import path from 'path';
import { Worker } from 'worker_threads';
import os from 'os';
import { getConstants } from '../constants.js';

const { __dirname } = getConstants(import.meta.url);

const toWorker = (n) => {
  return new Promise((resolve, reject) => {
    const worker = new Worker(path.join(__dirname, 'worker.js'), { workerData: { n } });
    worker.on('message', (data) => resolve(data));
    worker.on('error', (err) => reject(err));
    worker.on('exit', (code) => {
      if (code !== 0)
        reject(new Error(`Worker stopped with exit code ${code}`));
    });
  });
};

const toCorrectResult = ({ status, value, reason }) => {
  const newStatus = status === 'fulfilled' ? 'resolved' : 'error';
  const data = value === undefined ? null : value;
  return { status: newStatus, data };
};

export const performCalculations = async () => {
  const cpusNumber = os.cpus().length;
  const startValue = 10;
  const data = Array.from({ length: cpusNumber }, (_, i) => startValue + i);
  try {
    const results = await Promise.allSettled(data.map(toWorker));
    return results.map(toCorrectResult);
  } catch (err) {
    console.error(err);
  }
};

performCalculations()
  .then((data) => console.log(data));
