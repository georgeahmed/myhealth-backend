export default class ApiError extends Error {
  status: number;
  details?: unknown;

  constructor(status = 500, message = 'Server Error', details?: unknown) {
    super(message);
    this.status = status;
    this.details = details;
  }
}
