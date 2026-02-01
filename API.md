# API Reference

Base URL: `http://localhost:5000/api`

## Authentication Endpoints

### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "role": "student",
  "studentData": {
    "studentId": "STU001",
    "currentYear": 2,
    "department": "Computer Science",
    "degree": "B.Tech",
    "expectedGraduation": 2026
  }
}
```

Response (201):
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "60f7b3b3b3b3b3b3b3b3b3b3",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "student"
  }
}
```

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

Response (200):
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "60f7b3b3b3b3b3b3b3b3b3b3",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "student",
    "isVerified": false
  }
}
```

### Get Current User
```http
GET /auth/me
Authorization: Bearer <token>
```

Response (200):
```json
{
  "success": true,
  "data": {
    "id": "60f7b3b3b3b3b3b3b3b3b3b3",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "student"
  }
}
```

## User Endpoints

All endpoints require authentication.

### Get All Users
```http
GET /users
Authorization: Bearer <token>
```

### Get User by ID
```http
GET /users/:id
Authorization: Bearer <token>
```

### Update User
```http
PUT /users/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Smith"
}
```

## Alumni Endpoints

All endpoints require authentication.

### Get All Alumni
```http
GET /alumni
Authorization: Bearer <token>

Query Parameters:
- department: Filter by department
- graduationYear: Filter by graduation year
- industry: Filter by industry
- isAvailableForMentorship: true/false
```

### Get Alumni by ID
```http
GET /alumni/:id
Authorization: Bearer <token>
```

### Update Alumni Profile
```http
PUT /alumni/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "currentRole": "Software Engineer",
  "currentCompany": "Google",
  "industry": "Technology",
  "location": "San Francisco, CA",
  "bio": "Passionate about AI and Machine Learning...",
  "skills": ["Python", "TensorFlow", "React"],
  "isAvailableForMentorship": true,
  "mentorshipAreas": ["Machine Learning", "Career Guidance"]
}
```

### Verify Alumni (Admin Only)
```http
POST /alumni/:id/verify
Authorization: Bearer <token>
Content-Type: application/json

{
  "verificationStatus": "approved"
}
```

## Job Endpoints

### Get All Jobs
```http
GET /jobs
Authorization: Bearer <token> (optional for viewing)

Query Parameters:
- jobType: full-time, part-time, internship, contract
- workMode: remote, onsite, hybrid
- company: Filter by company name
- location: Filter by location
```

### Get Job by ID
```http
GET /jobs/:id
```

### Create Job Posting (Alumni/Admin)
```http
POST /jobs
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Senior Software Engineer",
  "company": "Tech Corp",
  "location": "San Francisco, CA",
  "jobType": "full-time",
  "workMode": "hybrid",
  "description": "We are looking for...",
  "requirements": [
    "5+ years experience",
    "Strong in React and Node.js"
  ],
  "skills": ["React", "Node.js", "TypeScript"],
  "salary": {
    "min": 120000,
    "max": 180000,
    "currency": "USD"
  },
  "applicationUrl": "https://company.com/apply"
}
```

### Update Job Posting
```http
PUT /jobs/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "isActive": false
}
```

### Delete Job Posting
```http
DELETE /jobs/:id
Authorization: Bearer <token>
```

### Apply to Job
```http
POST /jobs/:id/apply
Authorization: Bearer <token>
```

## Mentorship Endpoints

All endpoints require authentication.

### Get All Mentorship Requests
```http
GET /mentorship
Authorization: Bearer <token>

Query Parameters:
- status: pending, accepted, rejected, completed
- mentorId: Filter by mentor
- menteeId: Filter by mentee
```

### Create Mentorship Request
```http
POST /mentorship
Authorization: Bearer <token>
Content-Type: application/json

{
  "mentor": "60f7b3b3b3b3b3b3b3b3b3b3",
  "title": "Career Guidance in AI/ML",
  "description": "I'm interested in pursuing a career in AI...",
  "areas": ["Machine Learning", "Career Planning"],
  "duration": "3 months"
}
```

### Update Mentorship Status
```http
PUT /mentorship/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "accepted",
  "notes": "Happy to help! Let's schedule a call.",
  "startDate": "2024-03-01"
}
```

### Delete Mentorship Request
```http
DELETE /mentorship/:id
Authorization: Bearer <token>
```

## Referral Endpoints

All endpoints require authentication.

### Get All Referral Requests
```http
GET /referrals
Authorization: Bearer <token>

Query Parameters:
- status: pending, approved, declined, guidance-given
- requestedBy: Filter by requester
- requestedTo: Filter by alumni
```

### Create Referral Request
```http
POST /referrals
Authorization: Bearer <token>
Content-Type: application/json

{
  "requestedTo": "60f7b3b3b3b3b3b3b3b3b3b3",
  "company": "Google",
  "position": "Software Engineer Intern",
  "message": "I'm applying for an internship and would appreciate a referral..."
}
```

### Update Referral Status
```http
PUT /referrals/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "approved",
  "guidanceNote": "I've submitted your referral. Make sure your resume..."
}
```

## Interview Experience Endpoints

### Get All Interview Experiences
```http
GET /interviews

Query Parameters:
- company: Filter by company
- role: Filter by role
- domain: Filter by domain
- difficulty: easy, medium, hard
- isApproved: true/false
```

### Get Interview Experience by ID
```http
GET /interviews/:id
```

### Create Interview Experience
```http
POST /interviews
Authorization: Bearer <token>
Content-Type: application/json

{
  "company": "Google",
  "role": "Software Engineer",
  "domain": "Backend Development",
  "difficulty": "hard",
  "experienceDate": "2024-01-15",
  "rounds": [
    {
      "roundNumber": 1,
      "roundType": "Phone Screen",
      "description": "Asked about data structures and algorithms...",
      "duration": "45 minutes"
    },
    {
      "roundNumber": 2,
      "roundType": "Technical Interview",
      "description": "Live coding on system design...",
      "duration": "90 minutes"
    }
  ],
  "technicalTopics": ["System Design", "Algorithms", "Distributed Systems"],
  "behavioralQuestions": ["Tell me about a time when..."],
  "tips": [
    "Practice system design",
    "Review your projects thoroughly"
  ],
  "outcome": "selected",
  "salaryRange": {
    "min": 150000,
    "max": 200000,
    "currency": "USD"
  }
}
```

### Update Interview Experience
```http
PUT /interviews/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "tips": ["Updated tip 1", "Updated tip 2"]
}
```

### Approve Interview Experience (Admin)
```http
POST /interviews/:id/approve
Authorization: Bearer <token>
Content-Type: application/json

{
  "isApproved": true
}
```

### Like Interview Experience
```http
POST /interviews/:id/like
Authorization: Bearer <token>
```

## Analytics Endpoints

All endpoints require Admin authentication.

### Get Dashboard Analytics
```http
GET /analytics/dashboard
Authorization: Bearer <token>
```

Response:
```json
{
  "success": true,
  "data": {
    "totalUsers": 1250,
    "totalAlumni": 450,
    "totalStudents": 800,
    "activeJobs": 89,
    "activeMentorships": 156,
    "pendingReferrals": 23
  }
}
```

### Get Alumni Participation Stats
```http
GET /analytics/alumni-participation
Authorization: Bearer <token>

Query Parameters:
- startDate: ISO date
- endDate: ISO date
```

### Get Mentorship Activity Stats
```http
GET /analytics/mentorship-activity
Authorization: Bearer <token>

Query Parameters:
- startDate: ISO date
- endDate: ISO date
```

### Get Job Trends
```http
GET /analytics/job-trends
Authorization: Bearer <token>
```

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Validation error message"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Not authorized to access this route"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "User role student is not authorized to access this route"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal Server Error"
}
```

## Authentication

Most endpoints require authentication. Include the JWT token in the Authorization header:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Rate Limiting

To prevent spam, some endpoints have rate limits:
- Referral requests: 5 per day per user
- Job applications: 10 per day per user

## Testing with curl

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "firstName": "Test",
    "lastName": "User",
    "role": "student"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Get Protected Resource
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

**Note:** Remember to replace `YOUR_TOKEN_HERE` with actual JWT tokens received from login/register.
