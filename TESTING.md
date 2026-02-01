# Quick Testing Guide

## 🎯 Your Application is READY!

**Backend**: http://localhost:5000  
**Frontend**: http://localhost:5173

## ✅ What's Working Now

All three major features are fully implemented and functional:

1. **Alumni Directory** - Browse, search, and filter alumni
2. **Job Board** - Post jobs, browse listings, apply to jobs
3. **Mentorship System** - Request mentorship, accept/decline requests

## 🧪 Test Scenarios

### Scenario 1: Student Journey

1. **Register as Student**
   - Go to http://localhost:5173
   - Click "Register here"
   - Fill form, select "Student" role
   - Login with credentials

2. **Explore Alumni Directory**
   - Click "Alumni" in navigation
   - Try the search box
   - Apply filters (department, industry, mentorship)
   - View alumni profiles

3. **Browse Jobs**
   - Click "Jobs" in navigation
   - Filter by job type, work mode, location
   - Click "Apply Now" on any job
   - See "Applied" badge appear

4. **Request Mentorship**
   - Click "Mentorship" in navigation
   - Click "Request Mentorship"
   - Select a mentor from dropdown
   - Fill in title, description, areas
   - Submit request
   - See request in "My Requests" tab

### Scenario 2: Alumni Journey

1. **Register as Alumni**
   - Logout (if logged in)
   - Register new account
   - Select "Alumni" role
   - Login

2. **Post a Job**
   - Go to "Jobs"
   - Click "Post Job" button
   - Fill in all job details:
     - Title: "Software Engineer"
     - Company: "Tech Corp"
     - Location: "Remote"
     - Select job type and work mode
     - Add description
     - Add skills (click "+ Add Skill")
     - Add requirements
     - Optional: Add salary range
   - Click "Post Job"
   - See your job in the list

3. **Manage Mentorship Requests**
   - Go to "Mentorship"
   - Click "Received Requests" tab
   - See requests from students
   - Click "Accept" or "Decline"
   - Status updates immediately

4. **Check Alumni Directory**
   - Go to "Alumni"
   - Filter by "Available for Mentorship"
   - Your profile should appear (if marked as available)

### Scenario 3: Testing Filters

**Alumni Directory:**
- Search: Type a name
- Filter by department: Select "Computer Science"
- Filter by industry: Select "Technology"
- Filter by mentorship: Select "Available for Mentorship"
- Clear filters and try different combinations

**Job Board:**
- Filter by "Internship"
- Filter by "Remote"
- Try location search
- Combine multiple filters

## 📝 Sample Test Data

### Sample Alumni Profile
```
Name: John Doe
Role: Senior Software Engineer
Company: Google
Department: Computer Science
Graduation Year: 2018
Industry: Technology
Skills: React, Node.js, Python
Available for Mentorship: Yes
```

### Sample Job Posting
```
Title: Software Engineer Intern
Company: Microsoft
Location: Seattle, WA
Type: Internship
Work Mode: Hybrid
Description: Join our team for summer 2024...
Skills: JavaScript, React, Git
Requirements:
- Currently pursuing CS degree
- Strong problem-solving skills
Salary: $40,000 - $50,000
```

### Sample Mentorship Request
```
Mentor: [Select from available alumni]
Title: Career Guidance in AI/ML
Description: I'm interested in pursuing a career in artificial intelligence...
Areas:
- Machine Learning
- Career Planning
- Technical Interview Prep
Duration: 3 months
```

## 🎬 Demo Flow (5-7 minutes)

### Part 1: Introduction (1 min)
"This is an Alumni Engagement Platform that connects students with alumni for networking, jobs, and mentorship."

### Part 2: Alumni Directory (1.5 min)
- Show the directory
- Demonstrate search
- Apply multiple filters
- Explain mentorship availability

### Part 3: Job Board (2 min)
- Browse jobs
- Show filters in action
- Create a new job (as alumni)
- Apply to a job (as student)
- Show application tracking

### Part 4: Mentorship System (2 min)
- Request mentorship as student
- Switch to alumni account
- Show "Received Requests" tab
- Accept a request
- Show status updates

### Part 5: Wrap-up (0.5 min)
"All features are role-based, with proper authorization and a clean, responsive UI."

## 🐛 Troubleshooting

### "Cannot connect to server"
- Check backend is running on port 5000
- Check MongoDB is running

### "No alumni found"
- You need to create alumni accounts first
- Alumni must have verificationStatus = 'approved'

### "Post Job button not showing"
- Make sure you're logged in as Alumni or Admin
- Check user role in navbar

### "Cannot request mentorship"
- Make sure there are alumni with isAvailableForMentorship = true
- Cannot request from yourself

## 📊 Backend API Testing

### Using curl:

**Check health:**
```bash
curl http://localhost:5000/api/health
```

**Register user:**
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

**Get all jobs:**
```bash
curl http://localhost:5000/api/jobs
```

**Get alumni (with filters):**
```bash
curl "http://localhost:5000/api/alumni?isAvailableForMentorship=true"
```

## 💡 Pro Tips

1. **Create multiple test accounts** to see different perspectives
2. **Use different browsers** for different user sessions
3. **Check browser console** for any errors
4. **MongoDB Compass** can help view database records
5. **Use Postman** for API testing if needed

## ✨ Feature Highlights to Show

1. **Real-time filtering** - No page reload needed
2. **Role-based UI** - Different features for different roles
3. **Status tracking** - See application and mentorship status
4. **Responsive design** - Works on mobile too
5. **Clean modals** - Beautiful forms for creating content
6. **Empty states** - Helpful messages when no data
7. **Loading states** - Smooth user experience
8. **Validation** - Forms validate before submission

## 🚀 You're All Set!

Everything is working. Just:
1. Keep both servers running
2. Open http://localhost:5173
3. Register accounts
4. Start testing!

**Good luck with your hackathon presentation! 🎉**
