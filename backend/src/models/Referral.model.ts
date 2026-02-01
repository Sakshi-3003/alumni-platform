import mongoose, { Document, Schema } from 'mongoose';

export interface IReferral extends Document {
  requestedBy: mongoose.Types.ObjectId;
  requestedTo: mongoose.Types.ObjectId;
  company: string;
  position: string;
  message: string;
  status: 'pending' | 'approved' | 'declined' | 'guidance-given';
  guidanceNote?: string;
  createdAt: Date;
  updatedAt: Date;
}

const referralSchema = new Schema<IReferral>(
  {
    requestedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    requestedTo: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    company: {
      type: String,
      required: [true, 'Company name is required'],
    },
    position: {
      type: String,
      required: [true, 'Position is required'],
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      maxlength: 500,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'declined', 'guidance-given'],
      default: 'pending',
    },
    guidanceNote: {
      type: String,
      maxlength: 1000,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent spam - limit referral requests per user per day
referralSchema.index({ requestedBy: 1, createdAt: 1 });

export default mongoose.model<IReferral>('Referral', referralSchema);
