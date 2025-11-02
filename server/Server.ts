import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/Products';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// MongoDB Connection - Using environment variable
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI is not defined in environment variables');
  process.exit(1);
}

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected successfully to storeManager database'))
  .catch((err: Error) => console.log('❌ MongoDB connection error:', err));

// Basic route for testing
app.get('/', (req: express.Request, res: express.Response) => {
  res.json({ message: 'Store Manager API is running!' });
});

// Simple 404 handler - REMOVED the problematic wildcard route for now
// We'll add proper routes later
app.use('/api/products', productRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 MongoDB connected to: storeManager database`);
});