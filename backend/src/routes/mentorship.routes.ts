import { Router } from 'express';
import { protect } from '../middleware/auth.middleware';
import {
  getAllMentorships,
  getMentorshipById,
  createMentorship,
  updateMentorship,
  deleteMentorship,
  getMyMentorshipRequests,
  getMentorshipRequestsToMe,
} from '../controllers/mentorship.controller';

const router = Router();

router.use(protect);

router.get('/', getAllMentorships);
router.get('/my-requests', getMyMentorshipRequests);
router.get('/requests-to-me', getMentorshipRequestsToMe);
router.get('/:id', getMentorshipById);
router.post('/', createMentorship);
router.put('/:id', updateMentorship);
router.delete('/:id', deleteMentorship);

export default router;
