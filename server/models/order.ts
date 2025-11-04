import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IOrder extends Document {
  customerName: string;
  products: Types.ObjectId[];
  totalAmount: number;
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
}

const OrderSchema: Schema = new Schema(
  {
    customerName: { type: String, required: true },
    products: [{ type: Schema.Types.ObjectId, ref: 'Product', required: true }],
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ['pending', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

export default mongoose.model<IOrder>('Order', OrderSchema);
