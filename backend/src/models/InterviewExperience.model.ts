import mongoose, { Document, Schema } from 'mongoose';

export interface IInterviewExperience extends Document {
  author: mongoose.Types.ObjectId;
  company: string;
  role: string;
  domain: string;
  difficulty: 'easy' | 'medium' | 'hard';
  experienceDate: Date;
  rounds: {
    roundNumber: number;
    roundType: string;
    description: string;
    duration?: string;
  }[];
  technicalTopics: string[];
  behavioralQuestions?: string[];
  tips: string[];
  outcome: 'selected' | 'rejected' | 'ongoing';
  salaryRange?: {
    min: number;
    max: number;
    currency: string;
  };
  isApproved: boolean;
  approvedBy?: mongoose.Types.ObjectId;
  likes: mongoose.Types.ObjectId[];
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

const interviewExperienceSchema = new Schema<IInterviewExperience>(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    company: {
      type: String,
      required: [true, 'Company name is required'],
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
    },
    domain: {
      type: String,
      required: [true, 'Domain is required'],
    },
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      required: true,
    },
    experienceDate: {
      type: Date,
      required: true,
    },
    rounds: [
      {
        roundNumber: Number,
        roundType: String,
        description: String,
        duration: String,
      },
    ],
    technicalTopics: [String],
    behavioralQuestions: [String],
    tips: [String],
    outcome: {
      type: String,
      enum: ['selected', 'rejected', 'ongoing'],
      required: true,
    },
    salaryRange: {
      min: Number,
      max: Number,
      currency: {
        type: String,
        default: 'USD',
      },
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    approvedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IInterviewExperience>('InterviewExperience', interviewExperienceSchema);
