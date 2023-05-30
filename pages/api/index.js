import express from 'express';
import userController from './controllers/user.js';

const app = express();
const PORT = 3000;

app.use('/', userController);

app.listen(PORT, () => {
  console.log(`App rodando em http://localhost:${PORT}`);
});