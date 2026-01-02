// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

// class AppError extends Error {
//     statusCode: number;
//     status: string;
//     cause: any[];
//     isOperational: boolean;

//   constructor(message: string, statusCode: number, cause:any[] = []) {
//     super(message);

//     this.statusCode = statusCode;
//     this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
//     this.isOperational = true;
//     this.cause = cause;

//     Error.captureStackTrace(this, this.constructor);
//   }
// }

// export default AppError;

class AppError extends Error {
  statusCode: number;
  status: string;
  cause: any[];
  isOperational: boolean;

  // Mongo / Mongoose
  code?: number;
  path?: string;
  value?: unknown;
  errors?: Record<string, { message: string }>;

  // JWT
  name:
    | "CastError"
    | "ValidationError"
    | "JsonWebTokenError"
    | "TokenExpiredError"
    | string;

  constructor(message: string, statusCode: number, cause: any[] = []) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    this.cause = cause;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
