import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/Products';

dotenv.config();

const app = express();

// CORS for your deployed frontend
app.use(cors({
  origin: 'https://storemanager-1-8wrv.onrender.com'
}));

app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('MONGODB_URI is not defined in environment variables');
  process.exit(1);
}

mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully to storeManager database'))
  .catch((err: Error) => console.log('MongoDB connection error:', err));

// API Routes only
app.use('/api/products', productRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Store Manager API is running!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});