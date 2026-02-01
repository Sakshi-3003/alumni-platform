import mongoose, { Document, Schema } from 'mongoose';

export interface IAlumni extends Document {
  user: mongoose.Types.ObjectId;
  graduationYear: number;
  department: string;
  degree: string;
  currentRole?: string;
  currentCompany?: string;
  industry?: string;
  location?: string;
  bio?: string;
  skills: string[];
  linkedinUrl?: string;
  githubUrl?: string;
  websiteUrl?: string;
  isAvailableForMentorship: boolean;
  mentorshipAreas: string[];
  achievements: string[];
  startupInfo?: {
    name: string;
    role: string;
    description: string;
    website?: string;
  };
  verificationStatus: 'pending' | 'approved' | 'rejected';
  verificationDocuments?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const alumniSchema = new Schema<IAlumni>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    graduationYear: {
      type: Number,
      required: [true, 'Graduation year is required'],
    },
    department: {
      type: String,
      required: [true, 'Department is required'],
    },
    degree: {
      type: String,
      required: [true, 'Degree is required'],
    },
    currentRole: {
      type: String,
      default: '',
    },
    currentCompany: {
      type: String,
      default: '',
    },
    industry: {
      type: String,
      default: '',
    },
    location: {
      type: String,
      default: '',
    },
    bio: {
      type: String,
      maxlength: 1000,
    },
    skills: [
      {
        type: String,
      },
    ],
    linkedinUrl: String,
    githubUrl: String,
    websiteUrl: String,
    isAvailableForMentorship: {
      type: Boolean,
      default: false,
    },
    mentorshipAreas: [String],
    achievements: [String],
    startupInfo: {
      name: String,
      role: String,
      description: String,
      website: String,
    },
    verificationStatus: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    verificationDocuments: [String],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IAlumni>('Alumni', alumniSchema);
