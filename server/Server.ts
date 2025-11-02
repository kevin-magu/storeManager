import express, { Application } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
import authRoutes from './routes/Auth';
import productRoutes from './routes/products';
import orderRoutes from './routes/orders';

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/storemanager';

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err: unknown) => console.error(' MongoDB connection error:', err));

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
