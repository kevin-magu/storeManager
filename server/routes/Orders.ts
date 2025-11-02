import { Router, Request, Response } from 'express';
import Order from '../models/Order';

const router = Router();

/**
 * @route   GET /api/orders
 * @desc    Get all orders
 */
router.get('/', async (_req: Request, res: Response) => {
  try {
    const orders = await Order.find().populate('products');
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   POST /api/orders
 * @desc    Create a new order
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    const { customerName, products, totalAmount, status } = req.body;

    const order = new Order({
      customerName,
      products,
      totalAmount,
      status: status || 'pending',
    });

    await order.save();
    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create order' });
  }
});

/**
 * @route   GET /api/orders/:id
 * @desc    Get order by ID
 */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id).populate('products');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   PUT /api/orders/:id
 * @desc    Update order status or details
 */
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedOrder)
      return res.status(404).json({ message: 'Order not found' });
    res.json(updatedOrder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update order' });
  }
});

/**
 * @route   DELETE /api/orders/:id
 * @desc    Delete an order
 */
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder)
      return res.status(404).json({ message: 'Order not found' });
    res.json({ message: 'Order deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete order' });
  }
});

export default router;
