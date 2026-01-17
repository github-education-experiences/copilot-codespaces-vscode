# 🌸 For Sanya 💌 - Valentine's Day Proposal Website

## Project Overview

This is a **beautiful, romantic, full-stack Valentine's Day proposal website** built for Sanya Tripathi. The website takes users through an interactive romantic journey with smooth animations, games, and a heartfelt proposal.

---

## ✨ Features Implemented

### 🎨 Frontend Pages (6 Pages Total)

1. **Landing Page** (`/`)
   - Beautiful welcome message with Sanya's name
   - Floating hearts animation in the background
   - Gradient pink/red theme
   - "Open Your Surprise" button to start the journey

2. **Compliments Page** (`/compliments`)
   - 8 sweet compliment cards with emojis
   - Cards appear one-by-one with fade-in animations
   - Glassmorphism design with hover effects
   - Next button appears after all cards are shown

3. **Interactive Game Page** (`/game`)
   - Fun heart-catching mini-game
   - User must catch 5 hearts to proceed
   - Hearts disappear with animation when clicked
   - Success celebration when complete

4. **Love Letter Page** (`/letter`)
   - Beautiful typewriter effect for the letter
   - Romantic, heartfelt message
   - Paper-style card design
   - Cursor animation during typing

5. **Proposal Page** (`/proposal`)
   - The big question: "Will you be my Valentine?"
   - YES button (gets bigger with each NO hover)
   - NO button that moves away when hovered (playful!)
   - Optional message input after YES
   - Multiple NO button texts for fun

6. **Success Page** (`/success`)
   - Confetti animation celebration
   - Victory message
   - Share button for WhatsApp
   - Screenshot reminder button
   - Final romantic message

### 🔐 Admin Panel

7. **Admin Dashboard** (`/admin`)
   - Password-protected login
   - View total visits and unique visitors
   - See page-wise visit statistics
   - View Sanya's response (YES/NO)
   - Read her optional message
   - Auto-refresh every 30 seconds

---

## 🛠 Technical Stack

### Frontend
- **Framework**: Next.js 15 (React)
- **Language**: TypeScript
- **Styling**: TailwindCSS v4
- **Animations**: Framer Motion
- **Confetti**: canvas-confetti
- **Icons**: React Icons
- **Fonts**: Google Fonts (Poppins, Pacifico, Quicksand)

### Backend
- **API Routes**: Next.js API Routes
- **Database**: MongoDB
- **Driver**: MongoDB Node.js Driver

### Design Theme
- **Colors**: Soft pink, red, peach, pastel gradients
- **Style**: Glassmorphism, rounded corners, soft shadows
- **Responsive**: Mobile-first design
- **Typography**: Romantic and cute fonts

---

## 📦 Project Structure

```
for-sanya/
├── app/
│   ├── admin/
│   │   └── page.tsx              # Admin dashboard
│   ├── api/
│   │   ├── admin/stats/
│   │   │   └── route.ts          # Admin stats API
│   │   ├── response/
│   │   │   └── route.ts          # Save/get proposal responses
│   │   └── visit/
│   │       └── route.ts          # Track page visits
│   ├── compliments/
│   │   └── page.tsx              # Compliments page
│   ├── game/
│   │   └── page.tsx              # Heart-catching game
│   ├── letter/
│   │   └── page.tsx              # Love letter with typewriter
│   ├── proposal/
│   │   └── page.tsx              # Main proposal page
│   ├── success/
│   │   └── page.tsx              # Success celebration
│   ├── globals.css               # Global styles + theme
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Landing page
├── components/
│   ├── FloatingHearts.tsx        # Animated hearts background
│   └── PageTransition.tsx        # Page transition wrapper
├── lib/
│   ├── mongodb.ts                # MongoDB connection
│   └── types.ts                  # TypeScript interfaces
├── public/                       # Static assets
├── .env.local                    # Environment variables
├── .env.local.example            # Env template
├── FOR_SANYA_README.md          # Project documentation
├── DEPLOYMENT.md                 # Deployment guide
├── package.json                  # Dependencies
└── tsconfig.json                 # TypeScript config
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### Installation

```bash
cd for-sanya
npm install
```

### Setup Environment Variables

Create `.env.local`:

```env
MONGODB_URI=mongodb://localhost:27017/sanya-proposal
ADMIN_USERNAME=admin
ADMIN_PASSWORD=ilovesanya2024
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

### Build for Production

```bash
npm run build
npm start
```

---

## 🎯 User Journey

1. **Landing** → User sees welcome message
2. **Compliments** → Sweet messages appear one by one
3. **Game** → Interactive heart-catching game
4. **Letter** → Heartfelt love letter with typewriter effect
5. **Proposal** → The big question with playful buttons
6. **Success** → Celebration with confetti!

---

## 🔐 Admin Access

- **URL**: `/admin`
- **Default Username**: `admin`
- **Default Password**: `ilovesanya2024` (change in .env.local)

---

## 🎨 Design Features

### Animations
- ✅ Floating hearts background on all pages
- ✅ Smooth page transitions
- ✅ Card fade-in animations
- ✅ Button hover effects
- ✅ Typewriter effect for letter
- ✅ Confetti celebration
- ✅ Pulse and scale animations

### Responsive Design
- ✅ Mobile-first approach
- ✅ Works on all screen sizes
- ✅ Touch-friendly buttons
- ✅ Optimized for phones

### Special Interactions
- ✅ NO button runs away on hover
- ✅ YES button grows bigger each time
- ✅ Hearts disappear when caught
- ✅ Auto-advancing animations

---

## 📊 Database Collections

### `responses`
Stores proposal responses:
```typescript
{
  name: "Sanya Tripathi",
  response: "YES" | "NO",
  message: string,
  timestamp: Date,
  userAgent: string,
  ipAddress: string
}
```

### `visits`
Tracks page visits:
```typescript
{
  page: string,
  timestamp: Date,
  userAgent: string,
  ipAddress: string
}
```

---

## 🌐 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/response` | POST | Submit YES/NO response |
| `/api/response` | GET | Get latest response |
| `/api/visit` | POST | Log page visit |
| `/api/visit` | GET | Get visit stats |
| `/api/admin/stats` | GET | Get admin dashboard data |

---

## 📱 Deployment Options

### Option 1: Vercel + MongoDB Atlas (Recommended)
- ✅ Free hosting
- ✅ Auto-deploy from GitHub
- ✅ Easy setup
- See `DEPLOYMENT.md` for step-by-step guide

### Option 2: Other Platforms
- Netlify
- Railway
- Render
- See `DEPLOYMENT.md` for details

---

## 🎁 Special Features

### Playful NO Button
- Moves to random position on hover
- Changes text with each attempt
- Makes YES button bigger
- Eventually makes it obvious to say YES!

### Message Input
- Optional message after YES
- Stores in database
- Viewable in admin panel

### Visit Tracking
- Tracks all page visits
- Records timestamps
- Shows in admin dashboard
- Counts unique visitors

---

## 🔧 Customization

### Change Colors
Edit `app/globals.css`:
```css
:root {
  --pink: #ffb3d9;
  --red: #ff6b9d;
  /* etc */
}
```

### Edit Compliments
Edit `app/compliments/page.tsx`:
```typescript
const compliments = [
  { text: "Your text here", emoji: "😊" },
  // Add more...
];
```

### Modify Letter
Edit `app/letter/page.tsx`:
```typescript
const letterContent = `Your letter here...`;
```

---

## 📸 Screenshots

All pages have been tested and verified:
- ✅ Landing page with floating hearts
- ✅ Compliments with animated cards
- ✅ Interactive game working perfectly
- ✅ Letter with typewriter effect
- ✅ Proposal with playful buttons
- ✅ Success page with confetti
- ✅ Admin login and dashboard

---

## 🐛 Known Issues

### MongoDB Connection
- If MongoDB is not running, API calls will fail with 500 errors
- Frontend will still work, but responses won't be saved
- Solution: Start MongoDB or use MongoDB Atlas

### Font Loading
- Google Fonts may be blocked by ad blockers
- Fallback fonts are in place

---

## 📝 TODO (Optional Enhancements)

- [ ] Add background music toggle
- [ ] Add countdown timer to Valentine's Day
- [ ] Add photo gallery
- [ ] Add "reasons I like you" generator
- [ ] Add mood slider
- [ ] Add more interactive games
- [ ] Add email notifications when response received

---

## 💕 Credits

**Created for**: Sanya Tripathi  
**Purpose**: Valentine's Day 2024 Proposal  
**Theme**: Long-distance love, romantic, sweet, cute  
**Tech**: Next.js, TypeScript, MongoDB, TailwindCSS, Framer Motion  

---

## 📄 License

This is a personal project created with love. Feel free to use as inspiration for your own proposals! 💖

---

## 🎊 Final Notes

This website was built with care and attention to every detail. Every animation, every color, every word was chosen to make Sanya smile and feel special.

Good luck with your proposal! 🌹✨

May she say YES! 💕

---

**For detailed deployment instructions, see**: `DEPLOYMENT.md`  
**For technical documentation, see**: `FOR_SANYA_README.md`
