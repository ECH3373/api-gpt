import express from 'express';
import 'express-async-errors';
import { config } from './config/index.js';
import { department } from './src/department/index.js';

const app = express();

app.use(express.json());

app.use('/api/v1/departments', department.router);

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message || 'An error occurred while processing the request' });
});

app.listen(config.app.port, () => {
  console.log(`Server is running on port: http://localhost:${config.app.port}`);
});
