import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';              //  Added
import productRoutes from './routes/Products';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection - Using environment variable
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error(' MONGODB_URI is not defined in environment variables');
  process.exit(1);
}

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log(' MongoDB connected successfully to storeManager database'))
  .catch((err: Error) => console.log(' MongoDB connection error:', err));

//  API Routes
app.use('/api/products', productRoutes);

//  Serve Angular Frontend
app.use(express.static(path.join(__dirname, '../../client/client-app/dist/client-app')));

//  Fallback route — send Angular index.html for unmatched paths
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/client-app/dist/client-app/index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 MongoDB connected to: storeManager database`);
});
