# Quick Start Guide

## Prerequisites Checklist
- [x] Node.js v18+ installed
- [ ] MongoDB installed (local or Atlas)
- [x] Git installed
- [x] Code editor (VS Code recommended)

## Setup Instructions

### Step 1: Clone & Setup (Already Done)
The project structure has been created with all necessary files.

### Step 2: Install MongoDB

#### Option A: Local MongoDB
1. Download from: https://www.mongodb.com/try/download/community
2. Install and start MongoDB service
3. Default connection: `mongodb://localhost:27017`

#### Option B: MongoDB Atlas (Cloud)
1. Create free account: https://www.mongodb.com/cloud/atlas/register
2. Create a cluster
3. Get connection string
4. Update backend/.env with your connection string

### Step 3: Configure Environment Variables

#### Backend (.env)
File location: `backend/.env`
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/alumni-platform
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
```

**Important:** Change `JWT_SECRET` to a random secure string in production!

#### Frontend (.env)
File location: `frontend/.env`
```env
VITE_API_URL=http://localhost:5000/api
```

### Step 4: Start the Application

#### Terminal 1 - Backend
```bash
cd backend
npm run dev
```
Backend will run on: http://localhost:5000

#### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```
Frontend will run on: http://localhost:5173

### Step 5: Test the Application

1. Open browser: http://localhost:5173
2. Register a new account (Student or Alumni)
3. Login with your credentials
4. Explore the dashboard

## Development Workflow

### Backend Development
```bash
cd backend

# Development with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Frontend Development
```bash
cd frontend

# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Common Issues & Solutions

### Issue: "Cannot connect to MongoDB"
**Solution:**
- Ensure MongoDB is running: `mongod` or check service status
- Verify connection string in backend/.env
- Check firewall settings

### Issue: "Port 5000 already in use"
**Solution:**
- Change PORT in backend/.env to another port (e.g., 5001)
- Kill the process using port 5000:
  ```bash
  # Windows
  netstat -ano | findstr :5000
  taskkill /PID <PID> /F
  
  # Linux/Mac
  lsof -ti:5000 | xargs kill -9
  ```

### Issue: "Module not found" errors
**Solution:**
- Delete node_modules and reinstall:
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```

### Issue: Frontend can't reach backend
**Solution:**
- Check backend is running on port 5000
- Verify VITE_API_URL in frontend/.env
- Check CORS settings in backend/src/server.ts

## Project Structure Overview

```
hackoverflow/
├── backend/               # Node.js/Express backend
│   ├── src/
│   │   ├── config/       # Database config
│   │   ├── controllers/  # Route controllers
│   │   ├── middleware/   # Auth & validation
│   │   ├── models/       # MongoDB models
│   │   ├── routes/       # API routes
│   │   └── server.ts     # Entry point
│   ├── .env              # Environment variables
│   └── package.json
│
└── frontend/             # React/Vite frontend
    ├── src/
    │   ├── components/   # React components
    │   ├── pages/        # Page components
    │   ├── store/        # State management
    │   ├── App.tsx       # Main app component
    │   └── main.tsx      # Entry point
    ├── .env              # Environment variables
    └── package.json
```

## API Testing

### Using Browser/Frontend
Navigate to http://localhost:5173 and use the UI

### Using curl
```bash
# Health check
curl http://localhost:5000/api/health

# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe",
    "role": "student"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Using Postman
1. Import the API endpoints manually
2. Set base URL: http://localhost:5000/api
3. For protected routes, add header:
   ```
   Authorization: Bearer <your-jwt-token>
   ```

## Database Seeding (Optional)

To add sample data for testing:

```javascript
// Create a seed.js file in backend/src
// Run with: node -r ts-node/register src/seed.ts
```

## Deployment Checklist

### Backend
- [ ] Set strong JWT_SECRET
- [ ] Use MongoDB Atlas or managed MongoDB
- [ ] Set NODE_ENV=production
- [ ] Enable rate limiting
- [ ] Add request validation
- [ ] Configure CORS properly
- [ ] Set up logging
- [ ] Add monitoring

### Frontend
- [ ] Update VITE_API_URL to production API
- [ ] Build: npm run build
- [ ] Test production build: npm run preview
- [ ] Deploy dist/ folder to hosting service

## Recommended VS Code Extensions

- ESLint
- Prettier
- TypeScript Vue Plugin
- Tailwind CSS IntelliSense
- MongoDB for VS Code
- Thunder Client (API testing)

## Learning Resources

### Backend
- Express.js: https://expressjs.com/
- MongoDB: https://www.mongodb.com/docs/
- Mongoose: https://mongoosejs.com/docs/
- JWT: https://jwt.io/

### Frontend
- React: https://react.dev/
- TypeScript: https://www.typescriptlang.org/docs/
- Vite: https://vitejs.dev/guide/
- TailwindCSS: https://tailwindcss.com/docs
- Zustand: https://docs.pmnd.rs/zustand/

## Support

For issues or questions:
1. Check this guide
2. Review README.md
3. Check console logs for errors
4. Search GitHub issues
5. Contact the development team

## Next Steps

1. ✅ Project setup complete
2. ✅ Dependencies installed
3. ✅ Build verification passed
4. 📝 Configure MongoDB
5. 🚀 Start development servers
6. 🎨 Customize the application
7. 🧪 Add tests
8. 🚢 Deploy!

---

**Happy Hacking! 🎉**
