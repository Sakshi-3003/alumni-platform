import { Router } from 'express';
import { protect, authorize } from '../middleware/auth.middleware';
import {
  getAllAlumni,
  getAlumniById,
  updateAlumni,
  verifyAlumni,
  getMyAlumniProfile,
} from '../controllers/alumni.controller';

const router = Router();

router.get('/', getAllAlumni);
router.get('/me', protect, authorize('alumni'), getMyAlumniProfile);
router.get('/:id', getAlumniById);
router.put('/:id', protect, updateAlumni);
router.post('/:id/verify', protect, authorize('admin'), verifyAlumni);

export default router;
