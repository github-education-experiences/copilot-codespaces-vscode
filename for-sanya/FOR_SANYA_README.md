# For Sanya 💌 - Valentine's Day Proposal Website

A beautiful, romantic, and interactive full-stack proposal website built for Sanya Tripathi. This website takes the user through a sweet journey with animations, games, and a heartfelt proposal.

## 🌸 Features

### User Experience
- **Landing Page**: Cute welcome with floating hearts animation
- **Compliments Page**: Sweet animated cards with compliments
- **Interactive Game**: Fun heart-catching mini-game
- **Love Letter**: Typewriter effect letter with emotional content
- **Proposal Page**: Interactive YES/NO buttons (NO button runs away!)
- **Success Page**: Confetti celebration with social sharing options

### Technical Features
- **Full-stack Application**: Next.js with TypeScript
- **Beautiful UI**: TailwindCSS with custom pink/red theme
- **Smooth Animations**: Framer Motion for all transitions
- **Backend API**: MongoDB for storing responses
- **Admin Dashboard**: Track visits and responses
- **Mobile-First**: Fully responsive design

## 🛠 Tech Stack

- **Frontend**: Next.js 15 + TypeScript + TailwindCSS v4
- **Animations**: Framer Motion + canvas-confetti
- **Backend**: Next.js API Routes
- **Database**: MongoDB
- **Icons**: React Icons
- **Deployment**: Vercel (Frontend) + MongoDB Atlas (Database)

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ installed
- MongoDB installed locally OR MongoDB Atlas account

### Local Development

1. **Clone the repository**
   ```bash
   cd for-sanya
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy `.env.local.example` to `.env.local` and configure:
   ```env
   # MongoDB Connection
   MONGODB_URI=mongodb://localhost:27017/sanya-proposal
   # OR for MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sanya-proposal

   # Admin Credentials
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=your-secure-password-here

   # Next.js
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Start MongoDB (if using local)**
   ```bash
   # On Linux/Mac
   mongod

   # On Windows
   "C:\Program Files\MongoDB\Server\6.0\bin\mongod.exe"
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

## 🚀 Deployment Guide

### Option 1: Vercel + MongoDB Atlas (Recommended)

#### Step 1: Set up MongoDB Atlas

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free tier available)
3. Create a database user with password
4. Whitelist all IPs: `0.0.0.0/0`
5. Get your connection string:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/sanya-proposal
   ```

#### Step 2: Deploy to Vercel

1. Push code to GitHub repository
2. Go to [Vercel](https://vercel.com)
3. Import your GitHub repository
4. Configure environment variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `ADMIN_USERNAME`: Your chosen admin username
   - `ADMIN_PASSWORD`: Your chosen admin password
   - `NEXT_PUBLIC_APP_URL`: Your Vercel URL (e.g., `https://for-sanya.vercel.app`)
5. Deploy!

Your website will be live at: `https://your-project-name.vercel.app`

### Option 2: Other Platforms

#### Netlify
```bash
npm run build
# Deploy the .next folder
```

#### Railway
1. Create new project on [Railway](https://railway.app)
2. Add MongoDB plugin
3. Add your Next.js app
4. Set environment variables
5. Deploy

## 📱 Pages & Routes

- `/` - Landing page with welcome message
- `/compliments` - Sweet compliments for Sanya
- `/game` - Interactive heart-catching game
- `/letter` - Love letter with typewriter effect
- `/proposal` - The big question with playful buttons
- `/success` - Celebration page with confetti
- `/admin` - Admin dashboard (password protected)

## 🔐 Admin Panel

Access the admin panel at `/admin`

**Default Credentials** (change in .env.local):
- Username: `admin`
- Password: `ilovesanya2024`

**Features**:
- View total visits and unique visitors
- See page-wise visit statistics
- Check Sanya's response (YES/NO)
- Read her message
- Auto-refresh every 30 seconds

## 🎨 Customization

### Colors
Edit `app/globals.css` to change the color scheme:
```css
:root {
  --pink: #ffb3d9;
  --pink-light: #ffe6f0;
  --pink-dark: #ff69b4;
  --red: #ff6b9d;
  --peach: #ffc0cb;
}
```

### Content
- **Compliments**: Edit `app/compliments/page.tsx`
- **Love Letter**: Edit `app/letter/page.tsx`
- **Proposal Text**: Edit `app/proposal/page.tsx`

### Fonts
Current fonts (from Google Fonts):
- Poppins (main text)
- Pacifico (headings)
- Quicksand (letter)

## 🐛 Troubleshooting

### MongoDB Connection Issues
- **Local**: Make sure MongoDB is running (`mongod`)
- **Atlas**: Check IP whitelist and connection string
- **Firewall**: Ensure port 27017 is not blocked

### Build Errors
```bash
# Clear cache and reinstall
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

### Environment Variables Not Working
- Restart the dev server after changing `.env.local`
- Make sure variables start with `NEXT_PUBLIC_` if used in client components
- Check for typos in variable names

## 📊 Database Schema

### Collections

#### `responses`
```typescript
{
  _id: ObjectId,
  name: "Sanya Tripathi",
  response: "YES" | "NO",
  message: string,
  timestamp: Date,
  userAgent: string,
  ipAddress: string
}
```

#### `visits`
```typescript
{
  _id: ObjectId,
  page: string,
  timestamp: Date,
  userAgent: string,
  ipAddress: string
}
```

## 🎯 API Endpoints

### POST `/api/response`
Submit proposal response
```json
{
  "response": "YES" | "NO",
  "message": "Optional message"
}
```

### GET `/api/response`
Get latest response

### POST `/api/visit`
Log page visit
```json
{
  "page": "landing" | "compliments" | "game" | "letter" | "proposal" | "success"
}
```

### GET `/api/visit`
Get visit statistics

### GET `/api/admin/stats`
Get admin dashboard data (requires Basic Auth)

## 💝 Made With Love

This project was created with love for Sanya Tripathi. May it bring a smile to her face! 

## 📄 License

This is a personal project. Feel free to use it as inspiration for your own proposals! 💕

---

**Created by**: A hopeful Valentine 🥺💗
**For**: Sanya Tripathi 💌
**Date**: February 2024

Good luck! 🌹✨
