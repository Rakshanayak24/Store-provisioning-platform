import express from 'express';
import cors from 'cors';
import storeRoutes from './routes/stores';

const app = express();

app.use(cors());               // 👈 THIS LINE
app.use(express.json());

app.use('/stores', storeRoutes);

app.listen(3000, () => {
  console.log('🚀 API running on http://localhost:3000');
});
