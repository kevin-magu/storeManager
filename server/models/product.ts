import { Schema, model, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  price: number;
  quantity: number;
  dateAdded: Date;
  description?: string;
}

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, default: 0 },
  dateAdded: { type: Date, default: Date.now },
  description: String
}, { timestamps: true });

export default model<IProduct>('Product', productSchema);