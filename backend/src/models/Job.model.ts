import mongoose, { Document, Schema } from 'mongoose';

export interface IJob extends Document {
  postedBy: mongoose.Types.ObjectId;
  title: string;
  company: string;
  location: string;
  jobType: 'full-time' | 'part-time' | 'internship' | 'contract';
  workMode: 'remote' | 'onsite' | 'hybrid';
  description: string;
  requirements: string[];
  skills: string[];
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
  applicationDeadline?: Date;
  applicationUrl?: string;
  isActive: boolean;
  applicants: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const jobSchema = new Schema<IJob>(
  {
    postedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Job title is required'],
    },
    company: {
      type: String,
      required: [true, 'Company name is required'],
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
    },
    jobType: {
      type: String,
      enum: ['full-time', 'part-time', 'internship', 'contract'],
      required: true,
    },
    workMode: {
      type: String,
      enum: ['remote', 'onsite', 'hybrid'],
      required: true,
    },
    description: {
      type: String,
      required: [true, 'Job description is required'],
    },
    requirements: [String],
    skills: [String],
    salary: {
      min: Number,
      max: Number,
      currency: {
        type: String,
        default: 'USD',
      },
    },
    applicationDeadline: Date,
    applicationUrl: String,
    isActive: {
      type: Boolean,
      default: true,
    },
    applicants: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IJob>('Job', jobSchema);
