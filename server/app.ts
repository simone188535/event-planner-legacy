import express from 'express';
import morgan from 'morgan';
import cors from "cors";
import helmet from 'helmet';
import AppError from '@utils/appError';
import {authRouter} from '@routes/authRoutes';
// import authController from '@controllers/authController';
import globalErrorHandler from '@controllers/errorController';

const app = express();

// 1. Middleware
app.use(morgan('dev'));

app.use(express.json());

// Implement CORS
app.use(cors());

// Set security HTTP headers
app.use(helmet());


// 2. routes
app.use('/api/v1/users', authRouter);


// app.use((req, res, next) => {
//     console.log("Hello, route is present!");

//     next();
// });



app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  });


  app.use(globalErrorHandler);
  
export default app;