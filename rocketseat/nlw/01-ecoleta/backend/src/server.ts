import express from 'express';
import cors from 'cors';
import routes from './routes';
import path from 'path';

const app = express();
const PORT = 3333;

app.use(cors());
app.use(express.json());
app.use(routes);

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.listen(PORT, () => console.log(`🔥 Server starter at http://localhost:${PORT}`));