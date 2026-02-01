import mongoose, { Document, Schema } from 'mongoose';

export interface IMentorship extends Document {
  mentor: mongoose.Types.ObjectId;
  mentee: mongoose.Types.ObjectId;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  title: string;
  description: string;
  areas: string[];
  duration?: string;
  meetingSchedule?: string;
  notes?: string;
  startDate?: Date;
  endDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const mentorshipSchema = new Schema<IMentorship>(
  {
    mentor: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    mentee: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected', 'completed'],
      default: 'pending',
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    areas: [
      {
        type: String,
        required: true,
      },
    ],
    duration: String,
    meetingSchedule: String,
    notes: String,
    startDate: Date,
    endDate: Date,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IMentorship>('Mentorship', mentorshipSchema);
