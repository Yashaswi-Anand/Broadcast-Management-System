# Aivox Broadcast Campaign System - Setup Guide

## Project Structure
```
Broadcast/
├── server/          # Backend (Express.js + MongoDB)
└── frontend/        # Frontend (React + Material-UI)
```

## Backend Setup

1. Navigate to server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in server directory:
```env
PORT=5000
MONGODB_URI=mongodb+srv://aivox_db:aivox@cluster0.cw10qtn.mongodb.net/?appName=Cluster0
JWT_SECRET=JWT_SECRET
```

4. Create admin user:
```bash
node scripts/createAdmin.js
```

5. Start backend server:
```bash
npm run dev
```

Backend will run on http://localhost:5000

## Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start frontend development server:
```bash
npm start
```

Frontend will run on http://localhost:3000

## Screenshots

### Login Page
![Login Page](screenshots/login.png)
*Admin login with email and password authentication*

### Dashboard - Campaign List
![Dashboard](screenshots/dashboard.png)
*View all broadcast campaigns with delivery statistics*

### Create New Campaign
![New Campaign Form](screenshots/new-campaign.png)
*Create broadcast campaigns with multiple recipients*

### Campaign Details with Stats
![Campaign Stats](screenshots/campaign-stats.png)
*Real-time delivery statistics with progress indicators*

## Login Credentials

- **Email:** admin@demo.com
- **Password:** 1234

## Features

### Admin Login Page
- Static credentials authentication
- JWT token-based session management
- Automatic redirect to dashboard on successful login

### Dashboard
- View all broadcast campaigns
- Display delivery statistics:
  - Total recipients
  - Sent messages
  - Delivered messages
  - Failed messages
  - Pending messages
- Visual progress bars for delivery rates
- Color-coded status chips

### New Broadcast Form
- Campaign Name input
- Message text area
- Recipients field (comma-separated phone numbers)
- Form validation
- Real-time feedback

### Backend Features
- Random status assignment (sent, delivered, pending, failed)
- RESTful API endpoints
- JWT authentication middleware
- MongoDB data persistence

## API Endpoints

### Authentication
- `POST /api/login` - Admin login

### Broadcasts
- `POST /api/broadcasts` - Create new campaign (protected)
- `GET /api/broadcasts` - Get all campaigns with stats (protected)

## Database Models

### User
- username
- email
- password (hashed)
- role

### Broadcast
- campaignName
- message
- createdAt

### Recipient
- phone
- status (pending, sent, delivered, failed)
- campaignId (reference to Broadcast)

## Technologies Used

### Backend
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- CORS enabled

### Frontend
- React 19
- Material-UI (MUI)
- React Router v6
- Axios for API calls
- JWT token storage in localStorage

## Notes

- The backend assigns random statuses to recipients when creating campaigns
- The proxy in frontend package.json routes API calls to http://localhost:5000
- Make sure MongoDB is accessible before starting the backend
- Both servers must be running for the application to work properly
