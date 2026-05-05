# Tasks

## Task 1: Database Cleanup and Prisma Schema Update

- [x] 1.1 Add `@@unique([userId, courseId])` constraint to the `Purchase` model in `prisma/schema.prisma`
- [x] 1.2 Add `@@index([userId])` to the `Purchase` model in `prisma/schema.prisma`
- [x] 1.3 Verify `UserProgress` model already has `@@unique([chapterId, userId])` — confirm no changes needed, document the finding
- [x] 1.4 Write and run a MongoDB script to detect and remove duplicate `(userId, courseId)` pairs in the `Purchase` collection before applying the unique constraint. Log any duplicates found. This prevents `prisma db push` from failing on existing data.
- [x] 1.5 Run `npx prisma db push` to apply schema changes (unique constraint + index) to the MongoDB database
- [x] 1.6 Run `npx prisma generate` to regenerate the Prisma client with the new compound unique key types

## Task 2: Fix Chapter Page Purchase Scoping

- [x] 2.1 In `app/(course)/courses/[courseId]/chapter/[chapterId]/page.tsx`, replace the unfiltered `include: { purchase: true }` on the course query with a separate `db.purchase.findUnique({ where: { userId_courseId: { userId, courseId } } })` call. Pass the resulting purchase (or null) to child components instead of the full purchase array. This ensures only the authenticated user's purchase is checked when determining locked/unlocked state.

## Task 3: Fix Progress Route to Use UserProgress Model

- [x] 3.1 Verify that the current progress route (`app/api/courses/[id]/chapter/[chapterId]/progress/route.ts`) updates `Chapter.isCompleted` directly (shared field) rather than using the per-user `UserProgress` model. Document the confirmed behavior before changing it.
- [x] 3.2 Replace `db.chapter.update({ data: { isCompleted } })` with `db.userProgress.upsert({ where: { chapterId_userId: { chapterId, userId } }, create: { userId, chapterId, isCompleted: values.isCompleted }, update: { isCompleted: values.isCompleted } })` using the authenticated `userId` from `auth()`. Never use userId from the request body.
- [x] 3.3 Return the upserted `UserProgress` record in the response instead of the chapter

## Task 4: Fix getChapter Server Action

- [x] 4.1 In `actions/get-chapter.ts`, add a `db.purchase.findUnique({ where: { userId_courseId: { userId, courseId } } })` query to fetch only the requesting user's purchase
- [x] 4.2 Remove the unfiltered `include: { purchase: true }` from the course query (keep other includes like category if needed)
- [x] 4.3 Conditionally fetch attachments when the user has a valid purchase OR when the chapter is free (`chapter.ifFree === true`). This preserves the regression case where free chapter viewers who also purchased the course can still see attachments.
- [x] 4.4 Return the `purchase` object (or null) in the result alongside course, chapter, muxData, and attachments

## Task 5: Fix Dashboard CoursesDashboard Component

- [x] 5.1 In `app/(DashBoard)/(Routes)/dashboard/_components/CoursesDashboard.tsx` (this is a server component using `async` and `auth()`), change the nested `purchase: true` inside `include: { course: { include: { ... } } }` to `purchase: { where: { userId } }` so only the current user's purchase records appear in the nested course object. The top-level `where: { userId }` on `db.purchase.findMany` is already correct.

## Task 6: Fix Stripe Webhook Idempotency

- [x] 6.1 In `app/api/webhook/route.ts`, replace `db.purchase.create()` with `db.purchase.upsert({ where: { userId_courseId: { userId, courseId } }, create: { courseId, userId }, update: {} })` to handle duplicate webhook deliveries gracefully. Stripe can send the same `checkout.session.completed` event multiple times, and with the new `@@unique` constraint, a duplicate `create` would throw an error.

## Task 7: Fix BuyCourse Component Data Integrity Bug

- [x] 7.1 In `app/(course)/courses/[courseId]/_components/BuyCourse.tsx`, remove the `UpdatePurchase()` call from the `finally` block of `onClick`. The current code calls `POST /api/courses/${courseId}/purchase` regardless of whether the Stripe checkout succeeded or failed (it runs in `finally`). This creates a purchase record even when the user cancels payment or the checkout fails. The purchase record should ONLY be created by the Stripe webhook after confirmed payment.
- [x] 7.2 Remove the `UpdatePurchase` function entirely since purchase creation is handled exclusively by the webhook
- [x] 7.3 Update the component props — change `purchase: Purchase[]` to `purchase: Purchase | null` to match the new scoped query pattern from Task 2. Update the purchase check logic accordingly (e.g., `purchase !== null` instead of `purchase.length > 0`).

## Task 8: Update VideoPlayer and ChapterCompleteSec Component Props

- [x] 8.1 In `app/(course)/courses/[courseId]/_components/VideoPlayer.tsx`, update the `purchase` prop type from `Purchase[]` to `Purchase | null` and change the access check from `purchase.length !== 0` to `purchase !== null`
- [x] 8.2 In `app/(course)/courses/[courseId]/_components/ChapterCompleteSec.tsx`, update the `purchase` prop type from `Purchase[]` to `Purchase | null` and update any purchase checks to use `purchase !== null`
