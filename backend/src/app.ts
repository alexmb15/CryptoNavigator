import express from 'express';
import { tokenRouter } from './routes/tokenRouter';
import cors from 'cors';

export const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use('/api/tokens', tokenRouter);