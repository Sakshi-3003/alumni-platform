import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database';

// Import routes
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import alumniRoutes from './routes/alumni.routes';
import mentorshipRoutes from './routes/mentorship.routes';
import jobRoutes from './routes/job.routes';
import referralRoutes from './routes/referral.routes';
import interviewRoutes from './routes/interview.routes';
import analyticsRoutes from './routes/analytics.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to Database
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/alumni', alumniRoutes);
app.use('/api/mentorship', mentorshipRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/referrals', referralRoutes);
app.use('/api/interviews', interviewRoutes);
app.use('/api/analytics', analyticsRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
