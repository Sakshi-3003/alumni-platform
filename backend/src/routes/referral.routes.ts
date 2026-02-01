import { Router } from 'express';
import { protect } from '../middleware/auth.middleware';

const router = Router();

router.use(protect);

router.get('/', (req, res) => {
  res.json({ message: 'Get all referral requests' });
});

router.post('/', (req, res) => {
  res.json({ message: 'Create referral request' });
});

router.put('/:id', (req, res) => {
  res.json({ message: 'Update referral status' });
});

export default router;
