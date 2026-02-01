import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import Job from '../models/Job.model';

// @desc    Get all jobs
// @route   GET /api/jobs
// @access  Public
export const getAllJobs = async (req: AuthRequest, res: Response) => {
  try {
    const {
      jobType,
      workMode,
      company,
      location,
      isActive = 'true',
      limit = 20,
      page = 1,
    } = req.query;

    // Build filter object
    const filter: any = {};

    if (jobType) filter.jobType = jobType;
    if (workMode) filter.workMode = workMode;
    if (company) filter.company = { $regex: company, $options: 'i' };
    if (location) filter.location = { $regex: location, $options: 'i' };
    if (isActive === 'true') filter.isActive = true;

    // Pagination
    const skip = (Number(page) - 1) * Number(limit);

    const jobs = await Job.find(filter)
      .populate('postedBy', 'firstName lastName email')
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await Job.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: jobs.length,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      data: jobs,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get job by ID
// @route   GET /api/jobs/:id
// @access  Public
export const getJobById = async (req: AuthRequest, res: Response) => {
  try {
    const job = await Job.findById(req.params.id).populate('postedBy', 'firstName lastName email');

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found',
      });
    }

    res.status(200).json({
      success: true,
      data: job,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Create job posting
// @route   POST /api/jobs
// @access  Private (Alumni/Admin)
export const createJob = async (req: AuthRequest, res: Response) => {
  try {
    const jobData = {
      ...req.body,
      postedBy: req.user?._id,
    };

    const job = await Job.create(jobData);
    const populatedJob = await Job.findById(job._id).populate(
      'postedBy',
      'firstName lastName email'
    );

    res.status(201).json({
      success: true,
      data: populatedJob,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update job posting
// @route   PUT /api/jobs/:id
// @access  Private (Job owner or Admin)
export const updateJob = async (req: AuthRequest, res: Response) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found',
      });
    }

    // Check if user owns this job or is admin
    if (job.postedBy.toString() !== req.user?._id.toString() && req.user?.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this job',
      });
    }

    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('postedBy', 'firstName lastName email');

    res.status(200).json({
      success: true,
      data: updatedJob,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete job posting
// @route   DELETE /api/jobs/:id
// @access  Private (Job owner or Admin)
export const deleteJob = async (req: AuthRequest, res: Response) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found',
      });
    }

    // Check if user owns this job or is admin
    if (job.postedBy.toString() !== req.user?._id.toString() && req.user?.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this job',
      });
    }

    await Job.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Job deleted successfully',
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Apply to job
// @route   POST /api/jobs/:id/apply
// @access  Private
export const applyToJob = async (req: AuthRequest, res: Response) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found',
      });
    }

    // Check if user already applied
    const alreadyApplied = job.applicants.some(
      (applicant) => applicant.toString() === req.user?._id.toString()
    );

    if (alreadyApplied) {
      return res.status(400).json({
        success: false,
        message: 'You have already applied to this job',
      });
    }

    job.applicants.push(req.user?._id as any);
    await job.save();

    res.status(200).json({
      success: true,
      message: 'Application submitted successfully',
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get my job postings
// @route   GET /api/jobs/my-jobs
// @access  Private
export const getMyJobs = async (req: AuthRequest, res: Response) => {
  try {
    const jobs = await Job.find({ postedBy: req.user?._id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
