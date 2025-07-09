# HealthCare+ Appointment System

A comprehensive full-stack healthcare appointment booking system built with React (Next.js) frontend and Node.js/Express backend with MongoDB database.

## 🚀 Features

### Patient Features
- **User Registration & Authentication** - Secure signup/login with email verification
- **Social Login** - Google and Facebook authentication
- **Doctor Search & Discovery** - Find doctors by specialty, location, rating
- **Appointment Booking** - Schedule in-person or video consultations
- **Appointment Management** - View, reschedule, or cancel appointments
- **Health Records** - Manage medical history, allergies, medications
- **Notifications** - Email and in-app notifications for appointments
- **Payment Integration** - Secure payment processing
- **Rating & Reviews** - Rate doctors and appointments

### Doctor Features
- **Professional Profile** - Detailed doctor profiles with credentials
- **Availability Management** - Set working hours and available time slots
- **Appointment Management** - View and manage patient appointments
- **Patient Records** - Access patient medical history during consultations
- **Video Consultations** - Conduct online appointments
- **Prescription Management** - Digital prescription generation

### Admin Features
- **User Management** - Manage patients and doctors
- **Appointment Oversight** - Monitor all appointments
- **Analytics Dashboard** - System usage and performance metrics
- **Content Management** - Manage specialties, locations, etc.

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 15 (React 19)
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **State Management**: React Hooks + Context
- **HTTP Client**: Axios
- **Form Handling**: React Hook Form
- **Validation**: Zod
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT + Refresh Tokens
- **Password Hashing**: bcryptjs
- **Email Service**: Nodemailer
- **File Upload**: Multer + Cloudinary
- **Validation**: Express Validator
- **Security**: Helmet, CORS, Rate Limiting

### DevOps & Tools
- **Development**: Nodemon, Concurrently
- **Testing**: Jest, Supertest
- **Linting**: ESLint
- **Environment**: dotenv
- **Process Management**: PM2 (production)

## 📁 Project Structure

```
healthcare-appointment-system/
├── frontend/                 # Next.js React frontend
│   ├── app/                 # Next.js app directory
│   ├── components/          # Reusable UI components
│   ├── lib/                 # Utilities and API calls
│   ├── hooks/               # Custom React hooks
│   ├── styles/              # Global styles
│   └── public/              # Static assets
├── backend/                 # Node.js Express backend
│   ├── src/
│   │   ├── controllers/     # Route controllers
│   │   ├── models/          # MongoDB models
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Custom middleware
│   │   ├── config/          # Configuration files
│   │   ├── utils/           # Utility functions
│   │   └── database/        # Database setup and migrations
│   └── .env.example         # Environment variables template
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd healthcare-appointment-system
```

2. **Install dependencies for all packages**
```bash
npm run install:all
```

3. **Set up environment variables**

**Backend (.env)**:
```bash
cd backend
cp .env.example .env
# Edit .env with your configuration
```

**Frontend (.env.local)**:
```bash
cd frontend
cp .env.local.example .env.local
# Edit .env.local with your configuration
```

4. **Set up the database**
```bash
cd backend
npm run setup:db
```

5. **Start the development servers**
```bash
# From root directory
npm run dev
```

This will start:
- Backend API server on http://localhost:5000
- Frontend development server on http://localhost:3000

## 🔧 Environment Configuration

### Backend Environment Variables

```env
# Server Configuration
NODE_ENV=development
PORT=5000
API_VERSION=v1

# Database
MONGODB_URI=mongodb://localhost:27017/healthcare_db

# JWT
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d
JWT_REFRESH_SECRET=your_refresh_token_secret_here
JWT_REFRESH_EXPIRE=30d

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@healthcare.com

# Social Authentication
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
FACEBOOK_APP_ID=your_facebook_app_id_here
FACEBOOK_APP_SECRET=your_facebook_app_secret_here

# File Upload (Cloudinary)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

### Frontend Environment Variables

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000

# Social Authentication
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id_here
NEXT_PUBLIC_FACEBOOK_APP_ID=your_facebook_app_id_here
```

## 🗄 Database Setup

### MongoDB Setup

1. **Local MongoDB**:
   - Install MongoDB locally
   - Start MongoDB service
   - Create database: `healthcare_db`

2. **MongoDB Atlas** (Cloud):
   - Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create cluster and database
   - Get connection string
   - Update `MONGODB_URI` in backend `.env`

3. **Initialize Database**:
```bash
cd backend
npm run setup:db  # Creates indexes and initial data
npm run seed      # Optional: Add sample data
```

## 🔐 Authentication Setup

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized origins and redirect URIs
6. Copy Client ID to environment variables

### Facebook OAuth Setup

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create new app
3. Add Facebook Login product
4. Configure Valid OAuth Redirect URIs
5. Copy App ID to environment variables

## 📧 Email Configuration

### Gmail Setup
1. Enable 2-factor authentication
2. Generate app-specific password
3. Use app password in `EMAIL_PASS`

### Other Email Providers
Update SMTP settings in backend `.env`:
- `EMAIL_HOST`: SMTP server
- `EMAIL_PORT`: SMTP port
- `EMAIL_USER`: Email username
- `EMAIL_PASS`: Email password

## 🚀 Deployment

### Backend Deployment

1. **Prepare for production**:
```bash
cd backend
npm run build  # If you have a build script
```

2. **Environment variables**:
   - Set `NODE_ENV=production`
   - Update database URI for production
   - Set secure JWT secrets
   - Configure production email settings

3. **Deploy to platforms**:
   - **Heroku**: Use Heroku CLI
   - **DigitalOcean**: Use App Platform
   - **AWS**: Use Elastic Beanstalk or EC2
   - **Railway**: Connect GitHub repository

### Frontend Deployment

1. **Build for production**:
```bash
cd frontend
npm run build
```

2. **Deploy to platforms**:
   - **Vercel**: `vercel --prod`
   - **Netlify**: Connect GitHub repository
   - **AWS S3**: Upload build files
   - **DigitalOcean**: Use App Platform

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm test                    # Run all tests
npm test -- --watch        # Run tests in watch mode
npm test -- --coverage     # Run tests with coverage
```

### Frontend Testing
```bash
cd frontend
npm test                    # Run component tests
npm run test:e2e           # Run end-to-end tests
```

## 📊 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/social-login` - Social authentication
- `POST /api/auth/logout` - User logout
- `POST /api/auth/forgot-password` - Password reset request
- `PATCH /api/auth/reset-password/:token` - Reset password
- `GET /api/auth/verify-email/:token` - Email verification

### User Endpoints
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `POST /api/users/upload-avatar` - Upload profile picture
- `PATCH /api/users/change-password` - Change password

### Doctor Endpoints
- `GET /api/doctors` - Get all doctors
- `GET /api/doctors/:id` - Get doctor by ID
- `GET /api/doctors/search` - Search doctors
- `GET /api/doctors/specialty/:specialty` - Get doctors by specialty

### Appointment Endpoints
- `POST /api/appointments` - Book appointment
- `GET /api/appointments` - Get user appointments
- `GET /api/appointments/:id` - Get appointment details
- `PUT /api/appointments/:id` - Update appointment
- `PATCH /api/appointments/:id/cancel` - Cancel appointment

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Email: support@healthcare-plus.com
- Documentation: [Project Wiki](link-to-wiki)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Express.js](https://expressjs.com/) - Backend framework
- [MongoDB](https://www.mongodb.com/) - Database
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Radix UI](https://www.radix-ui.com/) - UI components

---

**Built with ❤️ for better healthcare accessibility**