export default class FsOperationFailedError extends Error {
  constructor(operation) {
    super('FS operation failed:');
    this.operation = operation;
    this.name = this.constructor.name;
  }
}