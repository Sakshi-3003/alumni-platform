import { Router } from 'express';
import { protect, authorize } from '../middleware/auth.middleware';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Get all interview experiences' });
});

router.get('/:id', (req, res) => {
  res.json({ message: 'Get interview experience by ID' });
});

router.post('/', protect, (req, res) => {
  res.json({ message: 'Create interview experience' });
});

router.put('/:id', protect, (req, res) => {
  res.json({ message: 'Update interview experience' });
});

router.post('/:id/approve', protect, authorize('admin'), (req, res) => {
  res.json({ message: 'Approve interview experience' });
});

router.post('/:id/like', protect, (req, res) => {
  res.json({ message: 'Like interview experience' });
});

export default router;
