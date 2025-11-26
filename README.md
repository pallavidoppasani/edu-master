# 🎓 EduMaster - Full Stack Learning Management System

A modern, full-featured Learning Management System built with React, Node.js, and PostgreSQL.

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### 🎯 Three User Roles
- **Students** - Browse courses, enroll, watch lessons, take quizzes, track progress, and compete on leaderboards.
- **Instructors** - Create courses, manage content, and view analytics.
- **Admins** - Manage users, oversee platform, and view system-wide analytics.

### 🚀 Key Functionality
- ✅ **Real Authentication** - Secure JWT-based auth with password hashing.
- ✅ **Role-Based Access Control (RBAC)** - Protected routes and features for different roles.
- ✅ **Course Management** - Create, publish, and manage courses with video lessons.
- ✅ **Interactive Quizzes** - Weekly challenges and course-specific quizzes with instant grading.
- ✅ **Progress Tracking** - Real-time lesson completion tracking and progress bars.
- ✅ **Gamification** - Leaderboards, achievements, and stats to motivate learning.
- ✅ **Database Persistence** - All data stored securely in PostgreSQL via Prisma ORM.
- ✅ **Responsive Design** - Fully responsive UI built with Tailwind CSS.

## 🎨 Screenshots

### Student Dashboard
Enhanced dashboard with learning progress, upcoming events, achievements, and leaderboard.

### Course Catalog
Browse courses with search, category filters, and sorting options.

### Lesson Viewer
Full-featured video player with lesson navigation and progress tracking.

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- PostgreSQL Database (Local or Cloud like Neon/Supabase)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd edumaster
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   
   # Create .env file
   cp .env.example .env
   # Update .env with your DATABASE_URL and JWT_SECRET
   
   # Initialize Database
   npx prisma generate
   npx prisma db push
   npx prisma db seed # Optional: Seed with initial data
   
   # Start Backend Server
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   # Open a new terminal in root directory
   npm install
   npm run dev
   ```

The application will open at `http://localhost:5173`.
The backend API runs at `http://localhost:5000`.

### 🎭 Demo Login

**Quick Access:** The login page supports quick role selection for testing.

| Role | Email | Password |
|------|-------|----------|
| 👨‍🎓 Student | student@edumaster.com | demo123 |
| 👨‍🏫 Instructor | instructor@edumaster.com | demo123 |
| 🛡️ Admin | admin@edumaster.com | demo123 |

## 🏗️ Project Structure

```
edumaster/
├── backend/              # Node.js + Express Backend
│   ├── controllers/      # Route logic
│   ├── middleware/       # Auth & Error handling
│   ├── prisma/           # Database schema & seeds
│   ├── routes/           # API routes
│   └── server.js         # Entry point
├── src/                  # React Frontend
│   ├── api/              # API client configuration
│   ├── components/
│   │   ├── features/     # Feature-specific components
│   │   ├── layout/       # Layout components (Navbar)
│   │   └── ui/           # Shadcn UI components
│   ├── context/          # React Context (Auth)
│   ├── pages/            # Application pages
│   └── App.jsx           # Main app component
└── package.json
```

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 18 with Vite
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn UI (Radix UI primitives)
- **State Management:** Context API
- **Icons:** Lucide React

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** JWT & Bcrypt

## � Authentication

The application uses a secure authentication system:
- **JWT Tokens:** Used for maintaining user sessions securely.
- **Password Hashing:** All passwords are hashed using `bcryptjs` before storage.
- **Protected Routes:** Middleware ensures only authorized roles can access specific endpoints.

## 🚧 Roadmap

### Phase 1 - Foundation (Completed ✅)
- [x] Frontend UI with React & Tailwind
- [x] Backend API with Express
- [x] Database integration (PostgreSQL + Prisma)
- [x] JWT Authentication & RBAC

### Phase 2 - Enhanced Features (In Progress 🚧)
- [x] Weekly Quiz Challenges
- [x] Lesson Progress Tracking
- [ ] File upload for videos and materials (AWS S3/Cloudinary)
- [ ] Instructor Dashboard Analytics

### Phase 3 - Production
- [ ] Deploy Frontend (Vercel)
- [ ] Deploy Backend (Render/Railway)
- [ ] Payment Gateway Integration (Stripe)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Shadcn UI](https://ui.shadcn.com/) for beautiful components
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Prisma](https://www.prisma.io/) for database ORM
