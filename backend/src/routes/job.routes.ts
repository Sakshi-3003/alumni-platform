import { Router } from 'express';
import { protect, authorize } from '../middleware/auth.middleware';
import {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  applyToJob,
  getMyJobs,
} from '../controllers/job.controller';

const router = Router();

router.get('/', getAllJobs);
router.get('/my-jobs', protect, getMyJobs);
router.get('/:id', getJobById);
router.post('/', protect, authorize('alumni', 'admin'), createJob);
router.put('/:id', protect, updateJob);
router.delete('/:id', protect, deleteJob);
router.post('/:id/apply', protect, applyToJob);

export default router;
