import express from 'express';
import cors from 'cors';
import { ENV } from './config/env.js';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = ENV.PORT || 5000;

app.get('/', (req, res) => {
  res.send('LinkUp Backend is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

