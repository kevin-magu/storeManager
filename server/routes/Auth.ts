import { Router } from 'express';

const router = Router();

// Example routes
router.post('/login', (req, res) => {
  res.send('Login route');
});

router.post('/register', (req, res) => {
  res.send('Register route');
});

// ✅ Export the router
export default router;
