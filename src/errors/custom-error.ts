class CustomError extends Error {
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }

  statusCode: number;
}

const createCustomError = (msg: string, statusCode: number) => {
  return new CustomError(msg, statusCode);
};

export { CustomError, createCustomError };
