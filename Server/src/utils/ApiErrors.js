export class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.status = statusCode;
    // this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    Error.captureStackTrace(this, this.constructor);
  }
}