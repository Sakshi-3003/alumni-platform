import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User.model';
import Alumni from './models/Alumni.model';
import Student from './models/Student.model';
import Job from './models/Job.model';
import Mentorship from './models/Mentorship.model';
import Referral from './models/Referral.model';
import InterviewExperience from './models/InterviewExperience.model';

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/alumni-platform');
    console.log('✅ MongoDB Connected');

    // Clear existing data
    await User.deleteMany({});
    await Alumni.deleteMany({});
    await Student.deleteMany({});
    await Job.deleteMany({});
    await Mentorship.deleteMany({});
    await Referral.deleteMany({});
    await InterviewExperience.deleteMany({});
    console.log('🗑️  Cleared existing data');

    const hashedPassword = await bcrypt.hash('password123', 10);

    // Create Users & Alumni
    const alumni1 = await User.create({
      email: 'john.doe@alumni.com',
      password: hashedPassword,
      firstName: 'John',
      lastName: 'Doe',
      role: 'alumni',
      isVerified: true,
    });

    await Alumni.create({
      user: alumni1._id,
      graduationYear: 2020,
      degree: 'B.Tech',
      department: 'Computer Science',
      currentRole: 'Senior Software Engineer',
      currentCompany: 'Google',
      location: 'San Francisco, CA',
      bio: 'Passionate about cloud computing and mentoring students',
      skills: ['Python', 'JavaScript', 'AWS', 'Docker', 'Kubernetes'],
      linkedinUrl: 'https://linkedin.com/in/johndoe',
      isAvailableForMentorship: true,
      mentorshipAreas: ['Cloud Computing', 'Backend Development', 'Career Guidance'],
      achievements: ['Tech Lead at Google', 'Published research on distributed systems'],
      industry: 'Technology',
      verificationStatus: 'approved',
    });

    const alumni2 = await User.create({
      email: 'sarah.smith@alumni.com',
      password: hashedPassword,
      firstName: 'Sarah',
      lastName: 'Smith',
      role: 'alumni',
      isVerified: true,
    });

    await Alumni.create({
      user: alumni2._id,
      graduationYear: 2019,
      degree: 'M.Tech',
      department: 'Data Science',
      currentRole: 'ML Engineer',
      currentCompany: 'Microsoft',
      location: 'Seattle, WA',
      bio: 'Specializing in NLP and computer vision',
      skills: ['Python', 'TensorFlow', 'PyTorch', 'NLP', 'Computer Vision'],
      linkedinUrl: 'https://linkedin.com/in/sarahsmith',
      isAvailableForMentorship: true,
      mentorshipAreas: ['Machine Learning', 'Data Science', 'Research'],
      achievements: ['Published 5 papers in top ML conferences', 'Built ML platform serving 1M users'],
      industry: 'Technology',
      verificationStatus: 'approved',
    });

    const alumni3 = await User.create({
      email: 'mike.johnson@alumni.com',
      password: hashedPassword,
      firstName: 'Mike',
      lastName: 'Johnson',
      role: 'alumni',
      isVerified: true,
    });

    await Alumni.create({
      user: alumni3._id,
      graduationYear: 2021,
      degree: 'B.Tech',
      department: 'Electrical Engineering',
      currentRole: 'Product Manager',
      currentCompany: 'Amazon',
      location: 'New York, NY',
      bio: 'Bridging technology and business',
      skills: ['Product Strategy', 'Agile', 'SQL', 'Tableau', 'Leadership'],
      linkedinUrl: 'https://linkedin.com/in/mikejohnson',
      isAvailableForMentorship: true,
      mentorshipAreas: ['Product Management', 'Career Transition', 'Leadership'],
      achievements: ['Launched 3 successful products', 'Led team of 15 engineers'],
      industry: 'E-commerce',
      verificationStatus: 'approved',
    });

    // Create Students
    const student1 = await User.create({
      email: 'alice.brown@student.com',
      password: hashedPassword,
      firstName: 'Alice',
      lastName: 'Brown',
      role: 'student',
      isVerified: true,
    });

    await Student.create({
      user: student1._id,
      studentId: 'CS2023001',
      degree: 'B.Tech',
      department: 'Computer Science',
      expectedGraduation: new Date('2025-05-30'),
      currentYear: 3,
    });

    const student2 = await User.create({
      email: 'bob.wilson@student.com',
      password: hashedPassword,
      firstName: 'Bob',
      lastName: 'Wilson',
      role: 'student',
      isVerified: true,
    });

    await Student.create({
      user: student2._id,
      studentId: 'CS2024002',
      degree: 'B.Tech',
      department: 'Computer Science',
      expectedGraduation: new Date('2026-05-30'),
      currentYear: 2,
    });

    console.log('✅ Created Users (Alumni & Students)');

    // Create Jobs
    await Job.create({
      postedBy: alumni1._id,
      title: 'Full Stack Developer',
      company: 'Google',
      location: 'San Francisco, CA',
      jobType: 'full-time',
      workMode: 'hybrid',
      description: 'Looking for a full-stack developer to join our cloud platform team.',
      requirements: [
        '3+ years of experience with React and Node.js',
        'Experience with cloud platforms (GCP, AWS)',
        'Strong problem-solving skills',
      ],
      skills: ['React', 'Node.js', 'TypeScript', 'GCP'],
      salary: {
        min: 120000,
        max: 180000,
        currency: 'USD',
      },
      applicationUrl: 'https://careers.google.com/jobs',
      isActive: true,
      applicants: [],
    });

    await Job.create({
      postedBy: alumni2._id,
      title: 'Machine Learning Intern',
      company: 'Microsoft',
      location: 'Seattle, WA',
      jobType: 'internship',
      workMode: 'onsite',
      description: 'Summer internship position for ML enthusiasts.',
      requirements: [
        'Currently pursuing BS/MS in CS or related field',
        'Knowledge of Python and ML frameworks',
        'Experience with data analysis',
      ],
      skills: ['Python', 'TensorFlow', 'Pandas', 'NumPy'],
      salary: {
        min: 8000,
        max: 8000,
        currency: 'USD',
      },
      applicationUrl: 'https://careers.microsoft.com/interns',
      isActive: true,
      applicants: [],
    });

    await Job.create({
      postedBy: alumni3._id,
      title: 'Product Manager',
      company: 'Amazon',
      location: 'New York, NY',
      jobType: 'full-time',
      workMode: 'remote',
      description: 'Looking for a technical PM to drive product strategy.',
      requirements: [
        '5+ years of product management experience',
        'Technical background preferred',
        'Excellent communication skills',
      ],
      skills: ['Product Strategy', 'Agile', 'SQL', 'Leadership'],
      salary: {
        min: 150000,
        max: 200000,
        currency: 'USD',
      },
      applicationUrl: 'https://amazon.jobs',
      isActive: true,
      applicants: [student1._id],
    });

    console.log('✅ Created Jobs');

    // Create Mentorship Requests
    await Mentorship.create({
      mentor: alumni1._id,
      mentee: student1._id,
      status: 'accepted',
      title: 'Cloud Computing & Career Guidance',
      description: 'Hi John! I would love to learn about cloud technologies and your career journey at Google.',
      areas: ['Career Guidance', 'Technical Skills', 'Interview Prep'],
    });

    await Mentorship.create({
      mentor: alumni2._id,
      mentee: student2._id,
      status: 'pending',
      title: 'Machine Learning Mentorship',
      description: 'Hello Sarah! I am very interested in ML and would appreciate your mentorship.',
      areas: ['Technical Skills', 'Project Guidance'],
    });

    console.log('✅ Created Mentorship Requests');

    // Create Referrals
    await Referral.create({
      requestedBy: student1._id,
      requestedTo: alumni1._id,
      company: 'Google',
      position: 'Software Engineer Intern',
      status: 'pending',
      message: 'Hi John, I am applying for the SWE internship at Google. Would you be able to refer me or provide guidance?',
    });

    await Referral.create({
      requestedBy: student2._id,
      requestedTo: alumni3._id,
      company: 'Amazon',
      position: 'Product Manager Intern',
      status: 'approved',
      message: 'Hello Mike, I am very interested in the PM internship at Amazon. Could you help me with a referral?',
    });

    console.log('✅ Created Referrals');

    // Create Interview Experiences
    await InterviewExperience.create({
      author: alumni1._id,
      company: 'Google',
      role: 'Software Engineer',
      domain: 'Technology',
      difficulty: 'hard',
      experienceDate: new Date('2020-02-15'),
      rounds: [
        {
          roundNumber: 1,
          roundType: 'Phone Screen',
          description: 'Data structures and algorithms - Implement LRU Cache, Find median in a stream',
          duration: '45 minutes',
        },
        {
          roundNumber: 2,
          roundType: 'Technical',
          description: 'System design - Design a URL shortener, Design a distributed cache',
          duration: '60 minutes',
        },
      ],
      technicalTopics: ['Data Structures', 'Algorithms', 'System Design', 'Scalability'],
      tips: ['Practice system design', 'Be ready to explain your thought process', 'Ask clarifying questions'],
      outcome: 'selected',
      isApproved: true,
    });

    await InterviewExperience.create({
      author: alumni2._id,
      company: 'Microsoft',
      role: 'ML Engineer',
      domain: 'Machine Learning',
      difficulty: 'medium',
      experienceDate: new Date('2019-03-20'),
      rounds: [
        {
          roundNumber: 1,
          roundType: 'Technical',
          description: 'Machine learning fundamentals - Explain backpropagation, difference between L1 and L2 regularization',
          duration: '60 minutes',
        },
      ],
      technicalTopics: ['Machine Learning', 'Statistics', 'Deep Learning'],
      tips: ['Strong fundamentals in ML theory are crucial', 'Prepare for math questions', 'Know your ML algorithms'],
      outcome: 'selected',
      isApproved: true,
    });

    console.log('✅ Created Interview Experiences');

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📝 Test Accounts:');
    console.log('Alumni: john.doe@alumni.com / password123');
    console.log('Alumni: sarah.smith@alumni.com / password123');
    console.log('Alumni: mike.johnson@alumni.com / password123');
    console.log('Student: alice.brown@student.com / password123');
    console.log('Student: bob.wilson@student.com / password123');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
