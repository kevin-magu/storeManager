import { Router, Request, Response } from 'express';
import Product from '../models/Product';

const router = Router();

/**
 * @route   GET /api/products
 * @desc    Get all products
 */
router.get('/', async (_req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   POST /api/products
 * @desc    Add a new product
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, price, description } = req.body;
    const product = new Product({ name, price, description });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create product' });
  }
});

/**
 * @route   GET /api/products/:id
 * @desc    Get a single product by ID
 */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   PUT /api/products/:id
 * @desc    Update a product
 */
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProduct)
      return res.status(404).json({ message: 'Product not found' });
    res.json(updatedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update product' });
  }
});

/**
 * @route   DELETE /api/products/:id
 * @desc    Delete a product
 */
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct)
      return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete product' });
  }
});

export default router;
