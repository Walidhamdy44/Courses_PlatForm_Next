<p align="center">
  <img src="public/imgs/logo1.svg" alt="EduStride Logo" width="60" />
</p>

<h1 align="center">EduStride — Learning Management Platform</h1>

<p align="center">
  A modern, full-stack LMS built with Next.js 15, React, Stripe, Prisma, and MongoDB.<br/>
  Browse courses, learn at your own pace, and track your progress — all in one place.
</p>

<p align="center">
  <a href="https://courses-platform-next.vercel.app/">🌐 Live Demo</a> •
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#getting-started">Getting Started</a>
</p>

---

## ✨ Features

### For Students
- 🔍 Browse, search, and filter courses by category
- 🛒 Purchase courses securely via Stripe checkout
- 📺 Stream video lessons with HLS (Mux player)
- ✅ Mark chapters complete and track progress
- ⭐ Rate and review purchased courses (1–5 stars)
- 👤 Personal profile with skills, interests, and social links
- 👥 Follow your favorite instructors

### For Instructors
- 🎓 Create and publish courses with chapters
- 🖼️ Upload thumbnails, attachments, and videos (UploadThing)
- 📊 Analytics dashboard with student and revenue insights
- 🔀 Drag-and-drop chapter reordering
- 💰 Monetize courses with Stripe integration
- 📝 Rich course and chapter descriptions

### Platform
- 🔐 Authentication and user management via Clerk
- 🎨 Beautiful, responsive UI with Tailwind CSS
- 🌙 Accessible design with modern component library (Radix UI)
- ⚡ Server-side rendering and optimized builds with Next.js 15 App Router
- 🗄️ MongoDB database with Prisma ORM

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS, Radix UI |
| Auth | Clerk |
| Database | MongoDB + Prisma |
| Payments | Stripe |
| Video | Mux (processing + HLS player) |
| File Upload | UploadThing |
| State | Zustand |
| Forms | React Hook Form + Zod |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB database (Atlas or local)
- Accounts for: Clerk, Stripe, Mux, UploadThing

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/courses-platform-next.git
cd courses-platform-next

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Fill in your API keys (see Environment Variables below)

# Push database schema
npx prisma db push

# Run development server
npm run dev
```

### Environment Variables

Create a `.env` file with the following:

```env
# Database
DATABASE_URL=

# Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Mux Video
MUX_TOKEN_ID=
MUX_TOKEN_SECRET=

# UploadThing
UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=

# Stripe
STRIPE_API_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

---

## 📁 Project Structure

```
├── app/
│   ├── (Auth)/            # Sign in / Sign up pages
│   ├── (course)/          # Course player & chapter views
│   ├── (DashBoard)/       # Student dashboard, explore, teacher, profile
│   ├── (Home Page)/       # Landing page
│   └── api/               # API routes (courses, reviews, follow, etc.)
├── actions/               # Server actions
├── components/            # Shared UI components
├── hooks/                 # Custom React hooks
├── lib/                   # DB client, Stripe, utils
├── prisma/                # Database schema
└── public/                # Static assets
```

---

## 📄 License

This project is for educational purposes.

---

<p align="center">
  Built with ❤️ by <strong>Walid Hamdy</strong>
</p>
