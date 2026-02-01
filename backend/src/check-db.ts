// Quick test script to check database
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Job from './models/Job.model';
import Alumni from './models/Alumni.model';
import User from './models/User.model';

dotenv.config();

const checkDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/alumni-platform');
    console.log('✅ MongoDB Connected');

    const jobs = await Job.find({});
    console.log(`\n📊 Total jobs in database: ${jobs.length}`);
    
    const alumni = await Alumni.find({}).populate('user');
    console.log(`📊 Total alumni in database: ${alumni.length}`);
    
    const users = await User.find({});
    console.log(`📊 Total users in database: ${users.length}`);
    
    if (alumni.length > 0) {
      console.log('\n👥 Alumni:');
      alumni.forEach((alum: any, index) => {
        console.log(`${index + 1}. ${alum.user?.firstName} ${alum.user?.lastName} - ${alum.currentRole} at ${alum.currentCompany}`);
      });
    } else {
      console.log('\n⚠️ No alumni found!');
    }

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

checkDatabase();
