# Courses Platform - Business & Application Logic Documentation

## Overview

This is a full-stack **Learning Management System (LMS)** built with Next.js 15. It allows teachers to create and sell courses, and students to purchase, consume, and track their progress through course content.

---

## Technology Stack

| Layer            | Technology                         |
| ---------------- | ---------------------------------- |
| Framework        | Next.js 15 (App Router)            |
| Language         | TypeScript, React 18               |
| Database         | MongoDB (via Prisma ORM)           |
| Authentication   | Clerk                              |
| Payments         | Stripe                             |
| Video Processing | Mux                                |
| File Uploads     | UploadThing                        |
| Styling          | Tailwind CSS                       |
| UI Components    | Radix UI (shadcn/ui), Lucide Icons |
| State Management | Zustand                            |
| Forms            | React Hook Form + Zod              |
| Notifications    | React Hot Toast                    |

---

## Data Models

### Course

- Owner: `userId` (from Clerk)
- Fields: title, description, image URL, price, publication status
- Relations: belongs to Category, has many Chapters, Attachments, Purchases

### Category

- Simple name-based categorization for courses
- Used for filtering in the explore page

### Chapter

- Belongs to a Course
- Fields: title, description, video URL, position (ordering), completion status
- Flags: `isPublished`, `ifFree` (free preview chapters)
- Relations: has one MuxData, has many UserProgress records

### Attachment

- Course resources (PDFs, images, etc.)
- Fields: name, URL
- Belongs to a Course (cascading delete)

### MuxData

- Stores Mux video processing metadata
- Fields: `assetsId`, `playbackId`
- One-to-one with Chapter

### UserProgress

- Tracks chapter completion per user
- Unique constraint: one record per (chapterId + userId)
- Field: `isCompleted`

### Purchase

- Records that a user purchased a course
- Fields: userId, courseId
- Used for access control to course content

### StripeCustomer

- Maps Clerk userId to Stripe customer ID
- Prevents duplicate Stripe customer creation

---

## Authentication & Authorization

### Clerk Integration

- **Protected routes**: `/dashboard`, `/teacher`, `/explore`, `/teacher/*`
- **Public routes**: Home page (`/`), sign-in, sign-up
- Middleware uses `clerkMiddleware` with `createRouteMatcher`
- All API routes verify `auth()` before processing

### Authorization Rules

- **Teachers**: Can only edit/delete their own courses (verified via `userId` match)
- **Students**: Can only access published courses; locked chapters require purchase
- **Course ownership**: Checked on every mutation (update, delete, publish)

---

## Business Flows

### 1. Course Creation Flow (Teacher)

```
Teacher creates course (title only)
    → Teacher fills required fields:
        - Title
        - Description
        - Image (via UploadThing)
        - Price
        - Category
        - At least 2 chapters
        - At least 1 attachment
        - At least 1 published chapter
    → Progress bar shows completion %
    → Publish button enabled when ALL requirements met
    → Course becomes visible in explore page
```

**Publishing Requirements:**

- All fields must be filled
- Minimum 2 chapters created
- Minimum 1 attachment uploaded
- At least 1 chapter must be published
- Confetti animation plays on successful publish

### 2. Chapter Management (Teacher)

```
Teacher creates chapter (title + auto-position)
    → Teacher adds:
        - Description
        - Video (file upload or external URL)
        - Free/Paid flag
    → Video uploaded → Mux processes it → MuxData stored
    → Teacher publishes chapter
```

**Video Processing:**

- When video URL provided, Mux creates an asset
- Old Mux assets are deleted when video is replaced
- Playback ID stored for HLS streaming
- Encoding tier: baseline, playback policy: public

### 3. Course Discovery (Student)

```
Student visits /explore
    → Sees all published courses
    → Can filter by:
        - Category (clickable category badges)
        - Search title (debounced search, 500ms delay)
    → Course cards show: image, title, price, chapter count, category
```

**Search Logic:**

- Uses Prisma `contains` filter on title
- Category filter via `categoryId`
- Only published courses with published chapters shown
- Results ordered by creation date (newest first)

### 4. Course Purchase Flow (Student)

```
Student views course → sees locked chapters
    → Clicks "Buy Course for $X"
    → POST /api/courses/[id]/checkout
        → Find/create Stripe customer
        → Create Stripe checkout session
        → Return session URL
    → Student redirected to Stripe checkout
    → Student pays
    → Stripe sends webhook (checkout.session.completed)
    → POST /api/webhook
        → Creates Purchase record in DB
    → Student redirected to course page with access
```

**Stripe Integration Details:**

- Checkout session includes course title, description, price
- Metadata carries `userId` and `courseId` for webhook processing
- Success URL: `/courses/[id]?success=1`
- Cancel URL: `/courses/[id]?canceled=1`
- Webhook verifies signature before processing

### 5. Course Consumption Flow (Student)

```
Student accesses /courses/[courseId]
    → Redirected to first published chapter
    → Sidebar shows all chapters with:
        - Lock icon (if not purchased)
        - Check icon (if completed)
        - Progress bar (% completed)
    → Student watches video
    → Student marks chapter as completed
    → Progress updates in sidebar
    → Student can download attachments (if purchased)
```

**Access Control:**

- Video player shows lock icon if no purchase record exists
- Free chapters (`ifFree: true`) show video regardless of purchase
- Attachments only downloadable after purchase
- Banner displayed: "This Chapter is Locked!" for unpurchased content

### 6. Progress Tracking

```
Student clicks "Mark as Completed"
    → PATCH /api/courses/[id]/chapter/[chapterId]/progress
    → Updates chapter.isCompleted = true
    → Sidebar progress bar recalculates
    → Visual indicator updates (checkmark)
```

**Progress Calculation:**

- `completedChapters / totalPublishedChapters * 100`
- Displayed in course sidebar as progress bar
- Individual chapter items show completion state

---

## API Routes

| Route                                            | Method   | Purpose                          | Auth          |
| ------------------------------------------------ | -------- | -------------------------------- | ------------- |
| `/api/courses`                                   | POST     | Create new course                | Teacher       |
| `/api/courses/[id]`                              | PATCH    | Update course fields             | Owner         |
| `/api/courses/[id]`                              | DELETE   | Delete course                    | Owner         |
| `/api/courses/[id]/chapter`                      | POST     | Create chapter                   | Owner         |
| `/api/courses/[id]/chapter/[chapterId]`          | PATCH    | Update chapter + Mux video       | Owner         |
| `/api/courses/[id]/chapter/[chapterId]`          | DELETE   | Delete chapter                   | Owner         |
| `/api/courses/[id]/chapter/[chapterId]/progress` | PATCH    | Mark chapter complete/incomplete | Student       |
| `/api/courses/[id]/attachment`                   | POST     | Add attachment                   | Owner         |
| `/api/courses/[id]/attachment/[atId]`            | DELETE   | Delete attachment                | Owner         |
| `/api/courses/[id]/checkout`                     | POST     | Create Stripe checkout session   | Student       |
| `/api/courses/[id]/purchase`                     | POST     | Record purchase                  | Student       |
| `/api/webhook`                                   | POST     | Stripe webhook handler           | Stripe        |
| `/api/uploadthing/*`                             | GET/POST | File upload handling             | Authenticated |

---

## Server Actions

### `getCourse({ userId, title?, categoryId? })`

- Fetches all published courses
- Filters by title (contains) and category
- Includes: category info, published chapters (IDs only), user's purchases
- Ordered by creation date descending

### `getChapter({ courseId, chapterId, userId })`

- Fetches chapter details for consumption
- Includes course with purchases, chapter data
- Returns Mux data for free chapters
- Returns null values if chapter/course not found

---

## File Upload Configuration

| Upload Type        | Max Size | Max Files | Accepted                       |
| ------------------ | -------- | --------- | ------------------------------ |
| Course Image       | 4MB      | 1         | Images                         |
| Chapter Video      | 512GB    | 1         | Video                          |
| Course Attachments | Mixed    | Multiple  | Video, Audio, PDF, Image, HTML |

---

## Application Routes Structure

### Public Routes

- `/` - Home/Landing page
- `/sign-in` - Clerk sign-in
- `/sign-up` - Clerk sign-up

### Protected Routes (require authentication)

- `/dashboard` - Student dashboard (purchased courses)
- `/explore` - Browse all published courses
- `/teacher/courses` - Teacher's course list
- `/teacher/courses/[id]` - Course editor
- `/teacher/courses/[id]/chapter/[chapterId]` - Chapter editor
- `/teacher/analtics` - Analytics page
- `/courses/[courseId]` - Course consumption
- `/courses/[courseId]/chapter/[chapterId]` - Chapter viewing

---

## Key Components

### Teacher Side

- **TitleForm** - Edit course title (inline editing)
- **DescForm** - Edit course description
- **ImageForm** - Upload course thumbnail
- **CategoryForm** - Select course category (combobox)
- **PriceForm** - Set course price
- **AttachmentForm** - Upload/manage course attachments
- **ChapterForm** - Create/reorder chapters
- **PublishCourse** - Publish/unpublish toggle
- **ChapterTitleForm** - Edit chapter title
- **VideoFileUploadForm** - Upload chapter video (file)
- **VideoUrlChapterForm** - Set chapter video (URL)
- **ChapterDescForm** - Edit chapter description
- **ChapterAccessForm** - Toggle free/paid access
- **PublishChapter** - Publish/unpublish chapter

### Student Side

- **VideoPlayer** - ReactPlayer with lock state
- **ChapterCompleteSec** - Chapter info + completion toggle + attachments
- **CourseSidebar** - Chapter list with progress
- **CourseSideBarItem** - Individual chapter with status icon
- **CourseNavBar** - Course-specific navigation
- **BuyCourse** - Purchase button with Stripe redirect
- **CourseCard** - Course preview card in explore/dashboard

### Shared

- **Banner** - Warning/info banner (locked chapters, unpublished courses)
- **FileUpload** - Generic UploadThing component
- **SearchNavBar** - Search input with debounce
- **Categories** - Category filter badges
- **Footer** - Site footer

---

## Hooks & Utilities

### Custom Hooks

- **useConfetti** (Zustand) - Controls confetti animation on course publish
- **useDebounced** - Debounces value changes (500ms default, used for search)

### Utilities

- **cn()** - Tailwind class merging (clsx + twMerge)
- **db** - Prisma client singleton
- **stripe** - Stripe client instance

### Providers

- **ClerkProvider** - Authentication context
- **ToastProvider** - Toast notifications
- **ConfettiProvider** - Confetti animation overlay

---

## Environment Variables Required

| Variable                            | Purpose                                                |
| ----------------------------------- | ------------------------------------------------------ |
| `DATABASE_URL`                      | MongoDB connection string (must include database name) |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk public key                                       |
| `CLERK_SECRET_KEY`                  | Clerk secret key                                       |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL`     | Sign-in route                                          |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL`     | Sign-up route                                          |
| `UPLOADTHING_SECRET`                | UploadThing secret                                     |
| `UPLOADTHING_APP_ID`                | UploadThing app ID                                     |
| `MUX_ID`                            | Mux token ID                                           |
| `MUX_SECRET`                        | Mux token secret                                       |
| `STRIPE_API_SEC`                    | Stripe secret key                                      |
| `STRIPE_WEBHOK_KEY`                 | Stripe webhook signing secret                          |
| `NEXT_PUBLIC_BASE_URL`              | App base URL (for Stripe redirects)                    |

---

## Security Measures

1. **Authentication**: All mutations require Clerk auth
2. **Ownership verification**: Course owner checked before edits/deletes
3. **Purchase verification**: Content access gated by Purchase records
4. **Webhook signature**: Stripe webhook verified before processing
5. **File upload auth**: UploadThing middleware checks authentication
6. **Route protection**: Middleware blocks unauthenticated access to protected routes
7. **Cascading deletes**: Prisma handles cleanup of related records

---

## Known Patterns & Notes

- Course deletion cascades to chapters, attachments, purchases (via Prisma `onDelete: Cascade`)
- Chapter deletion removes associated MuxData and Mux video asset
- Video replacement: old Mux asset deleted before new one created
- Search uses debounced input (500ms) to reduce API calls
- Categories are pre-seeded in the database (not user-created)
- Progress tracking is per-chapter, not per-video-timestamp
- The `BuyCourse` component calls both checkout AND purchase endpoints (purchase called in `finally` block after checkout redirect)
