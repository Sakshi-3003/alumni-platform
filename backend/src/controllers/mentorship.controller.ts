import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import Mentorship from '../models/Mentorship.model';

// @desc    Get all mentorship requests
// @route   GET /api/mentorship
// @access  Private
export const getAllMentorships = async (req: AuthRequest, res: Response) => {
  try {
    const { status, limit = 20, page = 1 } = req.query;

    // Build filter based on user role
    const filter: any = {};

    // If not admin, only show mentorships where user is mentor or mentee
    if (req.user?.role !== 'admin') {
      filter.$or = [{ mentor: req.user?._id }, { mentee: req.user?._id }];
    }

    if (status) filter.status = status;

    // Pagination
    const skip = (Number(page) - 1) * Number(limit);

    const mentorships = await Mentorship.find(filter)
      .populate('mentor', 'firstName lastName email')
      .populate('mentee', 'firstName lastName email')
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await Mentorship.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: mentorships.length,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      data: mentorships,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get mentorship by ID
// @route   GET /api/mentorship/:id
// @access  Private
export const getMentorshipById = async (req: AuthRequest, res: Response) => {
  try {
    const mentorship = await Mentorship.findById(req.params.id)
      .populate('mentor', 'firstName lastName email')
      .populate('mentee', 'firstName lastName email');

    if (!mentorship) {
      return res.status(404).json({
        success: false,
        message: 'Mentorship not found',
      });
    }

    // Check if user is involved in this mentorship or is admin
    const isInvolved =
      mentorship.mentor.toString() === req.user?._id.toString() ||
      mentorship.mentee.toString() === req.user?._id.toString() ||
      req.user?.role === 'admin';

    if (!isInvolved) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this mentorship',
      });
    }

    res.status(200).json({
      success: true,
      data: mentorship,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Create mentorship request
// @route   POST /api/mentorship
// @access  Private
export const createMentorship = async (req: AuthRequest, res: Response) => {
  try {
    const mentorshipData = {
      ...req.body,
      mentee: req.user?._id,
      status: 'pending',
    };

    // Check if user is trying to request mentorship from themselves
    if (req.body.mentor === req.user?._id.toString()) {
      return res.status(400).json({
        success: false,
        message: 'You cannot request mentorship from yourself',
      });
    }

    // Check if there's already a pending or active mentorship
    const existingMentorship = await Mentorship.findOne({
      mentor: req.body.mentor,
      mentee: req.user?._id,
      status: { $in: ['pending', 'accepted'] },
    });

    if (existingMentorship) {
      return res.status(400).json({
        success: false,
        message: 'You already have a pending or active mentorship request with this mentor',
      });
    }

    const mentorship = await Mentorship.create(mentorshipData);
    const populatedMentorship = await Mentorship.findById(mentorship._id)
      .populate('mentor', 'firstName lastName email')
      .populate('mentee', 'firstName lastName email');

    res.status(201).json({
      success: true,
      data: populatedMentorship,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update mentorship status
// @route   PUT /api/mentorship/:id
// @access  Private (Mentor or involved parties)
export const updateMentorship = async (req: AuthRequest, res: Response) => {
  try {
    const mentorship = await Mentorship.findById(req.params.id);

    if (!mentorship) {
      return res.status(404).json({
        success: false,
        message: 'Mentorship not found',
      });
    }

    // Check authorization
    const isMentor = mentorship.mentor.toString() === req.user?._id.toString();
    const isMentee = mentorship.mentee.toString() === req.user?._id.toString();
    const isAdmin = req.user?.role === 'admin';

    if (!isMentor && !isMentee && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this mentorship',
      });
    }

    // Only mentor can accept/reject
    if (req.body.status === 'accepted' || req.body.status === 'rejected') {
      if (!isMentor && !isAdmin) {
        return res.status(403).json({
          success: false,
          message: 'Only the mentor can accept or reject mentorship requests',
        });
      }
    }

    const updatedMentorship = await Mentorship.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
      .populate('mentor', 'firstName lastName email')
      .populate('mentee', 'firstName lastName email');

    res.status(200).json({
      success: true,
      data: updatedMentorship,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete mentorship request
// @route   DELETE /api/mentorship/:id
// @access  Private (Mentee or Admin)
export const deleteMentorship = async (req: AuthRequest, res: Response) => {
  try {
    const mentorship = await Mentorship.findById(req.params.id);

    if (!mentorship) {
      return res.status(404).json({
        success: false,
        message: 'Mentorship not found',
      });
    }

    // Only mentee (creator) or admin can delete
    const isMentee = mentorship.mentee.toString() === req.user?._id.toString();
    const isAdmin = req.user?.role === 'admin';

    if (!isMentee && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this mentorship',
      });
    }

    await Mentorship.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Mentorship request deleted successfully',
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get my mentorship requests (as mentee)
// @route   GET /api/mentorship/my-requests
// @access  Private
export const getMyMentorshipRequests = async (req: AuthRequest, res: Response) => {
  try {
    const mentorships = await Mentorship.find({ mentee: req.user?._id })
      .populate('mentor', 'firstName lastName email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: mentorships.length,
      data: mentorships,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get mentorship requests to me (as mentor)
// @route   GET /api/mentorship/requests-to-me
// @access  Private
export const getMentorshipRequestsToMe = async (req: AuthRequest, res: Response) => {
  try {
    const mentorships = await Mentorship.find({ mentor: req.user?._id })
      .populate('mentee', 'firstName lastName email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: mentorships.length,
      data: mentorships,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
