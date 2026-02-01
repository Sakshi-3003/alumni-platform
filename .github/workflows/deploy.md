# Deployment Workflow

This file tracks the deployment configuration for quick reference.

## Environment Variables

### Backend (Render)
```
MONGODB_URI=<MongoDB Atlas connection string>
JWT_SECRET=<Random secure string>
JWT_EXPIRE=7d
FRONTEND_URL=<Your Vercel URL>
NODE_ENV=production
PORT=5000
```

### Frontend (Vercel)
```
VITE_API_URL=<Your Render backend URL>/api
```

## Deployment URLs

- Frontend: TBD (Vercel)
- Backend: TBD (Render)
- Database: TBD (MongoDB Atlas)

## Update these after deployment!
