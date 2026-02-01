import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import Alumni from '../models/Alumni.model';
import User from '../models/User.model';

// @desc    Get all alumni
// @route   GET /api/alumni
// @access  Public
export const getAllAlumni = async (req: AuthRequest, res: Response) => {
  try {
    const {
      department,
      graduationYear,
      industry,
      isAvailableForMentorship,
      search,
      limit = 20,
      page = 1,
    } = req.query;

    // Build filter object
    const filter: any = { verificationStatus: 'approved' };

    if (department) filter.department = department;
    if (graduationYear) filter.graduationYear = Number(graduationYear);
    if (industry) filter.industry = industry;
    if (isAvailableForMentorship === 'true') filter.isAvailableForMentorship = true;

    // Build query
    let query = Alumni.find(filter).populate('user', 'firstName lastName email profilePicture');

    // Search functionality
    if (search) {
      const users = await User.find({
        $or: [
          { firstName: { $regex: search, $options: 'i' } },
          { lastName: { $regex: search, $options: 'i' } },
        ],
        role: 'alumni',
      }).select('_id');

      const userIds = users.map((u) => u._id);
      query = query.where('user').in(userIds);
    }

    // Pagination
    const skip = (Number(page) - 1) * Number(limit);
    query = query.skip(skip).limit(Number(limit)).sort({ createdAt: -1 });

    const alumni = await query;
    const total = await Alumni.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: alumni.length,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      data: alumni,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get alumni by ID
// @route   GET /api/alumni/:id
// @access  Public
export const getAlumniById = async (req: AuthRequest, res: Response) => {
  try {
    const alumni = await Alumni.findById(req.params.id).populate(
      'user',
      'firstName lastName email profilePicture'
    );

    if (!alumni) {
      return res.status(404).json({
        success: false,
        message: 'Alumni not found',
      });
    }

    res.status(200).json({
      success: true,
      data: alumni,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update alumni profile
// @route   PUT /api/alumni/:id
// @access  Private (Alumni owner only)
export const updateAlumni = async (req: AuthRequest, res: Response) => {
  try {
    const alumni = await Alumni.findById(req.params.id);

    if (!alumni) {
      return res.status(404).json({
        success: false,
        message: 'Alumni not found',
      });
    }

    // Check if user owns this profile
    if (alumni.user.toString() !== req.user?._id.toString() && req.user?.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this profile',
      });
    }

    const updatedAlumni = await Alumni.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('user', 'firstName lastName email profilePicture');

    res.status(200).json({
      success: true,
      data: updatedAlumni,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Verify alumni
// @route   POST /api/alumni/:id/verify
// @access  Private (Admin only)
export const verifyAlumni = async (req: AuthRequest, res: Response) => {
  try {
    const { verificationStatus } = req.body;

    const alumni = await Alumni.findByIdAndUpdate(
      req.params.id,
      { verificationStatus },
      { new: true, runValidators: true }
    ).populate('user', 'firstName lastName email');

    if (!alumni) {
      return res.status(404).json({
        success: false,
        message: 'Alumni not found',
      });
    }

    res.status(200).json({
      success: true,
      data: alumni,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get current user's alumni profile
// @route   GET /api/alumni/me
// @access  Private (Alumni only)
export const getMyAlumniProfile = async (req: AuthRequest, res: Response) => {
  try {
    const alumni = await Alumni.findOne({ user: req.user?._id }).populate(
      'user',
      'firstName lastName email profilePicture'
    );

    if (!alumni) {
      return res.status(404).json({
        success: false,
        message: 'Alumni profile not found',
      });
    }

    res.status(200).json({
      success: true,
      data: alumni,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
