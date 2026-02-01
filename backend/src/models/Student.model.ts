import mongoose, { Document, Schema } from 'mongoose';

export interface IStudent extends Document {
  user: mongoose.Types.ObjectId;
  studentId: string;
  currentYear: number;
  department: string;
  degree: string;
  expectedGraduation: number;
  interests: string[];
  skills: string[];
  bio?: string;
  resume?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  portfolioUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const studentSchema = new Schema<IStudent>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    studentId: {
      type: String,
      required: [true, 'Student ID is required'],
      unique: true,
    },
    currentYear: {
      type: Number,
      required: [true, 'Current year is required'],
      min: 1,
      max: 5,
    },
    department: {
      type: String,
      required: [true, 'Department is required'],
    },
    degree: {
      type: String,
      required: [true, 'Degree is required'],
    },
    expectedGraduation: {
      type: Number,
      required: [true, 'Expected graduation year is required'],
    },
    interests: [String],
    skills: [String],
    bio: {
      type: String,
      maxlength: 1000,
    },
    resume: String,
    linkedinUrl: String,
    githubUrl: String,
    portfolioUrl: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IStudent>('Student', studentSchema);
