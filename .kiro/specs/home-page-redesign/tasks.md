# Implementation Plan: Home Page Redesign

## Overview

Replace the existing light-themed home page with a modern dark-themed design using deep navy and electric indigo palette. Implementation follows a bottom-up approach: simplify the layout, build individual section components, compose them in the page, then clean up old files.

## Tasks

- [x] 1. Simplify layout and set up page structure
  - [x] 1.1 Update `app/(Home Page)/layout.tsx` to remove the `Footer` import and render only `{children}`
    - Remove the `import Footer from "@/components/Footer"` statement
    - Remove the `<html>` and `<body>` wrappers (the root layout handles those)
    - Export a simple layout that renders `<>{children}</>`
    - _Requirements: 11.1, 11.5_

  - [x] 1.2 Create the new `app/(Home Page)/page.tsx` shell as a server component
    - Import all new section components (to be created in subsequent tasks)
    - Wrap content in `<main className="bg-[#0F172A] min-h-screen text-white">`
    - Compose components in order: HomeNavbar, HeroSection, TrustedLogos, FeaturesSection, TestimonialsSection, PromoBanner, NewsletterSection, HomeFooter
    - _Requirements: 11.1, 9.1_

- [x] 2. Implement HomeNavbar client component
  - [x] 2.1 Create `app/(Home Page)/_components-home/HomeNavbar.tsx`
    - Add `"use client"` directive at the top
    - Implement `scrolled` state with `useState` (boolean, default false)
    - Attach scroll listener in `useEffect` that sets `scrolled` to `window.scrollY > 0`, with cleanup on unmount
    - Apply `fixed top-0 left-0 right-0 z-50` positioning
    - When not scrolled: `bg-transparent`; when scrolled: `bg-[#0F172A]/95 backdrop-blur-md border-b border-white/10`
    - Render "Learn" logo text linking to `/` via `next/link`
    - Render "Dashboard" link to `/dashboard` and "Explore" link to `/explore`
    - Render "Sign Up" button (indigo bg) linking to `/sign-up` and "Sign In" button (outlined) linking to `/sign-in`
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 10.3_

- [x] 3. Implement HeroSection server component
  - [x] 3.1 Create `app/(Home Page)/_components-home/HeroSection.tsx`
    - Use `min-h-screen` with `bg-[#0F172A]` and `pt-24` for navbar clearance
    - Two-column grid on desktop (`lg:grid-cols-2`), stacked on mobile
    - Left column: headline (`text-5xl md:text-6xl font-bold text-white`), subtext (`text-lg text-slate-300`), two CTA buttons, two stat badges
    - Primary CTA "Get Started Free" with `bg-indigo-600` linking to `/dashboard`
    - Secondary CTA "Explore Courses" with outlined style linking to `/explore`
    - Stat badges: "4.8/5 Rating" with 5 Star icons, "98% Success Rate" — pill-shaped with `bg-white/10`
    - Right column (hidden on mobile, `hidden lg:block`): Live Session Card with glass-morphism styling, avatar via `next/image` (`/imgs/1.jpg`), "English with Sarah" text, pulsing green dot "Live" indicator
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 10.2_

- [x] 4. Implement TrustedLogos server component
  - [x] 4.1 Create `app/(Home Page)/_components-home/TrustedLogos.tsx`
    - Display heading "Trusted by learners from" in muted text
    - Render 5 company names (Google, Microsoft, Amazon, Meta, Apple) as styled text in `text-slate-500 font-medium`
    - Use `flex items-center justify-center gap-8 flex-wrap` layout
    - _Requirements: 3.1, 3.2, 3.3_

- [x] 5. Implement FeaturesSection server component
  - [x] 5.1 Create `app/(Home Page)/_components-home/FeaturesSection.tsx`
    - Section heading "Why Choose Our Platform" centered, white text
    - Responsive grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`
    - 6 feature cards with Lucide icons (BookOpen, Users, Video, User, Globe, BarChart)
    - Each card: icon in colored circular background, bold title, descriptive paragraph
    - Card styling: `bg-white/5 border border-white/10 rounded-xl p-6 hover:-translate-y-1 transition-all duration-300`
    - Icon backgrounds use per-card accent colors (indigo, emerald, etc.)
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 11.4_

- [x] 6. Implement TestimonialsSection server component
  - [x] 6.1 Create `app/(Home Page)/_components-home/TestimonialsSection.tsx`
    - Section heading "What Our Learners Say" centered
    - 5 testimonial cards with unique names, initials, colored avatar circles, star ratings (3-5 stars using Star icon), and unique realistic quotes
    - Mobile layout: `flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4` with `min-w-[300px] snap-start` per card
    - Desktop layout: `md:grid md:grid-cols-3 md:gap-6`
    - Card styling: `bg-white/5 border border-white/10 rounded-xl p-6`
    - Use all 5 testimonials from the design document with exact quotes
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 12.2_

- [x] 7. Checkpoint - Verify core sections render correctly
  - Ensure all tests pass, ask the user if questions arise.

- [x] 8. Implement PromoBanner server component
  - [x] 8.1 Create `app/(Home Page)/_components-home/PromoBanner.tsx`
    - Full-width gradient: `bg-gradient-to-r from-indigo-600 to-purple-600 py-16 px-4`
    - Headline "Get 20% off on your next course" (`text-3xl md:text-5xl font-bold text-white text-center`)
    - Subtext "Limited time offer for new learners" (`text-white/80`)
    - CTA button "Claim Discount" with `bg-white text-indigo-600 font-semibold px-8 py-3 rounded-lg hover:bg-white/90` linking to `/explore`
    - _Requirements: 6.1, 6.2, 6.3, 6.4_

- [x] 9. Implement NewsletterSection server component
  - [x] 9.1 Create `app/(Home Page)/_components-home/NewsletterSection.tsx`
    - Centered content within `max-w-2xl mx-auto`
    - Dark background consistent with page theme
    - Heading "Stay updated with new courses and offers"
    - Subtext about weekly insights and exclusive discounts
    - Form with email input (`bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-slate-500 flex-1`) and "Subscribe" button (`bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg`)
    - Form prevents default submission (presentational only)
    - _Requirements: 7.1, 7.2, 7.3, 7.4_

- [x] 10. Implement HomeFooter server component
  - [x] 10.1 Create `app/(Home Page)/_components-home/HomeFooter.tsx`
    - Two-row layout within `max-w-7xl mx-auto`
    - Row 1: "Learn" logo text (left) + social icons (Facebook, Instagram, Twitter/X, GitHub) as inline SVGs (right) with `text-slate-400 hover:text-white transition-colors`
    - Row 2: Three link columns (Platform, Resources, Company) with relevant navigation items
    - Column headings: `text-white font-semibold`; links: `text-slate-400 hover:text-slate-200 transition-colors`
    - Separator: `border-t border-white/10` between columns and copyright
    - Copyright: "© 2024 Learn. All rights reserved." in `text-slate-500 text-sm`
    - Dark background (#0F172A) with light-colored text
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

- [x] 11. Wire all components together and verify page composition
  - [x] 11.1 Finalize `app/(Home Page)/page.tsx` with all imports and correct composition order
    - Ensure all section components are imported from `_components-home/`
    - Verify the page has no `"use client"` directive
    - Confirm all `next/link` usage for internal navigation and `next/image` for images
    - _Requirements: 11.1, 11.2, 11.3, 11.5, 11.6_

- [x] 12. Remove old component files
  - [x] 12.1 Delete deprecated home page components
    - Remove `app/(Home Page)/_components-home/NavBarHome.tsx`
    - Remove `app/(Home Page)/_components-home/BtnsHome.tsx`
    - Remove `app/(Home Page)/_components-home/LandingPage.tsx`
    - Remove `app/(Home Page)/_components-home/HomeSection2.tsx`
    - Remove `app/(Home Page)/_components-home/TestemonilsSec.tsx`
    - Remove `app/(Home Page)/_components-home/DiscoutSec.tsx`
    - Remove `app/(Home Page)/_components-home/HomePage.tsx`
    - Remove `app/(Home Page)/_components-home/SmallIcon.tsx`
    - Remove `app/(Home Page)/_components-home/Logo.tsx`
    - _Requirements: 11.1_

- [x] 13. Final checkpoint - Ensure build passes and no regressions
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- All components use Tailwind CSS exclusively — no inline styles or external CSS beyond `globals.css`
- Only `HomeNavbar` is a client component; all other sections are server components for optimal performance
- The shared `components/Footer.tsx` remains untouched for use by Dashboard and other routes
- All text content is realistic EdTech copy with no placeholder or Lorem ipsum text
- No new dependencies are introduced — uses existing `lucide-react`, `next/link`, `next/image`, and Tailwind
- Responsive breakpoints follow Tailwind defaults: `md` (768px), `lg` (1024px)
