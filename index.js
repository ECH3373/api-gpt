import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import { config } from './config/index.js';
import { chat } from './src/chat/index.js';
import { tts } from './src/tts/index.js';

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST'],
  }),
);
app.use('/api/v1/chat', chat.router);
app.use('/api/v1/tts', tts.router);

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message || 'An error occurred while processing the request' });
});

app.listen(config.app.port, () => {
  console.log(`Server is running on port: http://localhost:${config.app.port}`);
});
