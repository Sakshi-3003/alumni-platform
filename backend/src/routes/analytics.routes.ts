import { Router } from 'express';
import { protect, authorize } from '../middleware/auth.middleware';

const router = Router();

router.use(protect, authorize('admin'));

router.get('/dashboard', (req, res) => {
  res.json({ message: 'Get dashboard analytics' });
});

router.get('/alumni-participation', (req, res) => {
  res.json({ message: 'Get alumni participation stats' });
});

router.get('/mentorship-activity', (req, res) => {
  res.json({ message: 'Get mentorship activity stats' });
});

router.get('/job-trends', (req, res) => {
  res.json({ message: 'Get job posting trends' });
});

export default router;
