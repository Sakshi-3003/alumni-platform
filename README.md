# Alumni Engagement & Networking Platform

A full-stack web platform that strengthens long-term connections between alumni and students, enabling professional networking, mentorship, career guidance, and institutional engagement.

## 🎯 Features

### Core Functionality
- **Role-Based Access Control**: Admin/Faculty, Alumni, and Student roles with distinct permissions
- **Alumni Verification**: Institute-approved verification mechanism for alumni
- **Rich Profiles**: Comprehensive user profiles with education, career, and startup information
- **Job Board**: Alumni-driven job postings, internships, and opportunities
- **Mentorship System**: Structured mentorship requests and connections
- **Referral System**: Request referrals with anti-spam safeguards and guidance options
- **Interview Experiences**: Curated knowledge base of interview experiences with filtering
- **Analytics Dashboard**: Admin insights on participation, interactions, and trends

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT-based auth with bcrypt

### Frontend
- **Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Routing**: React Router v6
- **Icons**: Lucide React

## 📁 Project Structure

```
hackoverflow/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.ts
│   │   ├── controllers/
│   │   │   └── auth.controller.ts
│   │   ├── middleware/
│   │   │   └── auth.middleware.ts
│   │   ├── models/
│   │   │   ├── User.model.ts
│   │   │   ├── Alumni.model.ts
│   │   │   ├── Student.model.ts
│   │   │   ├── Job.model.ts
│   │   │   ├── Mentorship.model.ts
│   │   │   ├── Referral.model.ts
│   │   │   └── InterviewExperience.model.ts
│   │   ├── routes/
│   │   │   ├── auth.routes.ts
│   │   │   ├── user.routes.ts
│   │   │   ├── alumni.routes.ts
│   │   │   ├── job.routes.ts
│   │   │   ├── mentorship.routes.ts
│   │   │   ├── referral.routes.ts
│   │   │   ├── interview.routes.ts
│   │   │   └── analytics.routes.ts
│   │   └── server.ts
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   └── Navbar.tsx
    │   ├── pages/
    │   │   ├── Login.tsx
    │   │   ├── Register.tsx
    │   │   ├── Dashboard.tsx
    │   │   ├── AlumniDirectory.tsx
    │   │   ├── JobBoard.tsx
    │   │   ├── Mentorship.tsx
    │   │   ├── Referrals.tsx
    │   │   ├── InterviewExperiences.tsx
    │   │   └── AdminDashboard.tsx
    │   ├── store/
    │   │   └── authStore.ts
    │   ├── App.tsx
    │   ├── main.tsx
    │   └── index.css
    ├── package.json
    └── vite.config.ts
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/alumni-platform
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
```

5. Start the development server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Update `.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

5. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user

### Alumni
- `GET /api/alumni` - Get all alumni
- `GET /api/alumni/:id` - Get alumni by ID
- `PUT /api/alumni/:id` - Update alumni profile
- `POST /api/alumni/:id/verify` - Verify alumni (Admin only)

### Jobs
- `GET /api/jobs` - Get all jobs
- `GET /api/jobs/:id` - Get job by ID
- `POST /api/jobs` - Create job posting (Alumni/Admin)
- `PUT /api/jobs/:id` - Update job posting
- `DELETE /api/jobs/:id` - Delete job posting
- `POST /api/jobs/:id/apply` - Apply to job

### Mentorship
- `GET /api/mentorship` - Get all mentorship requests
- `POST /api/mentorship` - Create mentorship request
- `PUT /api/mentorship/:id` - Update mentorship status
- `DELETE /api/mentorship/:id` - Delete mentorship request

### Referrals
- `GET /api/referrals` - Get all referral requests
- `POST /api/referrals` - Create referral request
- `PUT /api/referrals/:id` - Update referral status

### Interview Experiences
- `GET /api/interviews` - Get all interview experiences
- `GET /api/interviews/:id` - Get interview by ID
- `POST /api/interviews` - Create interview experience
- `PUT /api/interviews/:id` - Update interview experience
- `POST /api/interviews/:id/approve` - Approve interview (Admin)
- `POST /api/interviews/:id/like` - Like interview

### Analytics (Admin Only)
- `GET /api/analytics/dashboard` - Get dashboard analytics
- `GET /api/analytics/alumni-participation` - Alumni participation stats
- `GET /api/analytics/mentorship-activity` - Mentorship activity stats
- `GET /api/analytics/job-trends` - Job posting trends

## 🔐 User Roles

### Student
- View alumni profiles
- Apply to jobs and internships
- Request mentorship
- Request referrals
- Share interview experiences
- Limited to 5 referral requests per day

### Alumni
- All student privileges
- Post job opportunities
- Offer mentorship
- Approve/decline referral requests
- Provide career guidance
- Update professional profile

### Admin/Faculty
- All privileges
- Verify alumni accounts
- Moderate content
- Access analytics dashboard
- Approve interview experiences
- Manage users and content

## 🎨 UI Features

- Responsive design for mobile and desktop
- Clean and modern interface with TailwindCSS
- Role-based navigation
- Protected routes with authentication
- Real-time form validation
- Loading states and error handling

## 🔧 Development

### Build for Production

Backend:
```bash
cd backend
npm run build
npm start
```

Frontend:
```bash
cd frontend
npm run build
npm run preview
```



For any queries or issues, please contact the development team.

---

**Happy Coding! 🚀**
