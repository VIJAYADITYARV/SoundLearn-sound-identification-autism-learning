# SoundLearn Backend API Documentation

## Overview
Full-stack backend for SoundLearn platform using **Node.js**, **Express**, and **MongoDB Atlas**.

## 🚀 Server Status
- **Status**: ✅ Running
- **Port**: 5000
- **Database**: MongoDB Atlas (Connected)
- **Base URL**: `http://localhost:5000/api`

## 📊 Database Models

### 1. User Model
Stores child profiles and learning progress.

**Fields:**
- `childName` - Child's name
- `age` - Child's age (1-18)
- `parentEmail` - Parent/guardian email
- `progress` - Stars, quizzes completed, games won, scores
- `settings` - Volume, accessibility preferences
- `createdAt`, `lastActive` - Timestamps

### 2. Analytics Model
Tracks detailed learning performance metrics.

**Fields:**
- `userId` - Reference to User
- `totalAttempts`, `correctAnswers`, `incorrectAnswers`
- `timeSpent` - Total minutes
- `categoryPerformance` - Performance by category (animals, vehicles, etc.)
- `gameModeStats` - Sessions and time per game mode
- `sessionHistory` - Array of session records
- `dailyActivity` - Daily performance tracking

### 3. CustomCard Model
Stores user-created sound cards.

**Fields:**
- `userId` - Reference to User
- `name`, `emoji`, `description`, `color`, `soundId`
- `category` - Card category
- `isPublic` - Share with community
- `usageCount` - Popularity tracking

## 🛣️ API Endpoints

### User Routes (`/api/users`)
- `GET /` - Get all users
- `GET /:id` - Get user by ID
- `POST /` - Create new user
- `PATCH /:id/progress` - Update user progress
- `PATCH /:id/settings` - Update user settings
- `DELETE /:id` - Delete user

### Analytics Routes (`/api/analytics`)
- `GET /user/:userId` - Get analytics for user
- `POST /track-attempt` - Track a learning attempt
- `POST /track-session` - Track a game session
- `GET /summary/:userId` - Get performance summary

### Custom Card Routes (`/api/custom-cards`)
- `GET /user/:userId` - Get user's custom cards
- `GET /public` - Get all public cards
- `POST /` - Create new custom card
- `PATCH /:id` - Update custom card
- `POST /:id/use` - Increment usage count
- `DELETE /:id` - Delete custom card

### Health Check
- `GET /api/health` - Server status check

## 🔧 Environment Variables
```
MONGODB_URI=mongodb+srv://vijayaditya:Vijay2006@cluster0.5eoqz64.mongodb.net/soundlearn?retryWrites=true&w=majority&appName=Cluster0
PORT=5000
NODE_ENV=development
```

## 📦 Dependencies
- **express** - Web framework
- **mongoose** - MongoDB ODM
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variables
- **body-parser** - Request body parsing

## 🚀 Running the Server

### Development
```bash
cd backend
npm install
node server.js
```

### With Auto-Reload (Optional)
```bash
npm install -g nodemon
npm run dev
```

## 🔗 Integration with Frontend
The frontend can now connect to this backend to:
1. **Sync progress** across devices
2. **Store analytics** in the cloud
3. **Share custom cards** with the community
4. **Generate reports** for parents/teachers

## 📝 Next Steps
1. Update frontend to use API endpoints instead of localStorage
2. Add authentication (JWT tokens)
3. Implement parent dashboard for viewing child analytics
4. Add data export functionality (PDF reports)

---
**Created for Full Stack Lab Evaluation 2 - CB.SC.U4CSE23657**
