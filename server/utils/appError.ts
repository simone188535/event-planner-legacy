// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

// class AppError extends Error {
//     statusCode: number;
//     status: string;
//     isOperational: boolean;
  
//     constructor(message: string | undefined, statusCode: number) {
//       super(message);
  
//       this.statusCode = statusCode;
//       this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
//       this.isOperational = true;
  
//       Error.captureStackTrace(this, this.constructor);
//     }
//   }
  
//   export default AppError;


class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;