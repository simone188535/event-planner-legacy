import express from 'express';
import cors from "cors";
import helmet from 'helmet';

const app = express();

app.use(express.json());

// Implement CORS
app.use(cors());

// Set security HTTP headers
app.use(helmet());