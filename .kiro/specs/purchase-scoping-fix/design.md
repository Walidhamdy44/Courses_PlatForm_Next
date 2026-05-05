# Purchase Scoping Fix - Bugfix Design

## Overview

Course purchases and chapter progress are shared across all users because database queries do not filter by the authenticated user's `userId`. The fix scopes all purchase lookups and progress mutations to the current user by adding `where: { userId }` filters, switching chapter completion to the per-user `UserProgress` model, and adding a `@@unique([userId, courseId])` constraint on `Purchase` to prevent duplicates.

## Glossary

- **Bug_Condition (C)**: Any query or mutation that reads/writes purchase or progress data without scoping to the authenticated user's `userId`
- **Property (P)**: Purchase and progress data is always scoped to the requesting user — a user only sees their own purchases and their own chapter completion state
- **Preservation**: Existing behaviors that must remain unchanged — free chapter access, Stripe webhook purchase creation, explore page filtering (already correct), attachment access for purchasers
- **Purchase**: The `Purchase` model in `prisma/schema.prisma` linking a `userId` to a `courseId`
- **UserProgress**: The `UserProgress` model in `prisma/schema.prisma` tracking per-user chapter completion with `@@unique([chapterId, userId])`
- **getChapter**: Server action in `actions/get-chapter.ts` that fetches chapter data including purchase status
- **CoursesDashboard**: Component in `app/(DashBoard)/(Routes)/dashboard/_components/CoursesDashboard.tsx` that displays a user's purchased courses

## Bug Details

### Bug Condition

The bug manifests when any authenticated user views a course chapter page, the dashboard, or triggers a progress update. The system returns or modifies shared records instead of user-scoped records because queries use unfiltered `include: { purchase: true }` or update `Chapter.isCompleted` directly.

**Formal Specification:**

```
FUNCTION isBugCondition(input)
  INPUT: input of type { userId: string, queryType: "purchase_lookup" | "progress_update", filtersByUserId: boolean }
  OUTPUT: boolean

  RETURN (input.queryType == "purchase_lookup" AND input.filtersByUserId == false)
         OR (input.queryType == "progress_update" AND targetModel == "Chapter" AND NOT targetModel == "UserProgress")
END FUNCTION
```

### Examples

- **Chapter page**: User B visits `/courses/abc/chapter/ch1`. The query `db.course.findUnique({ include: { purchase: true } })` returns User A's purchase record, so User B sees the chapter as unlocked. Expected: User B should see the chapter as locked.
- **Progress route**: User A marks chapter `ch1` complete via `PATCH /api/courses/abc/chapter/ch1/progress`. The handler updates `Chapter.isCompleted = true`, so User B also sees `ch1` as complete. Expected: Only User A's `UserProgress` record should be updated.
- **getChapter action**: The server action includes `purchase: true` without filtering, exposing all users' purchases. Expected: Only the requesting user's purchase should be returned.
- **Dashboard**: `CoursesDashboard` queries purchases by `userId` (correct), but the nested `include: { course: { include: { purchase: true } } }` exposes all purchase records for each course. Expected: Nested purchase include should filter by `userId`.

## Expected Behavior

### Preservation Requirements

**Unchanged Behaviors:**

- Mouse/click interactions on "Buy Course" buttons must continue to work
- Free chapters (`ifFree: true`) must remain viewable without a purchase
- Stripe webhook at `/api/webhook` must continue to create `Purchase` records with correct `userId` and `courseId`
- The explore page (`getCourse` action) already filters purchases by `userId` and must continue to do so
- Attachments must remain accessible to users who have purchased the course
- Course creation, editing, and publishing by teachers must remain unaffected

**Scope:**
All inputs that do NOT involve purchase lookups or progress updates should be completely unaffected by this fix. This includes:

- Course browsing and search
- Teacher admin operations (create, edit, publish courses/chapters)
- Stripe checkout session creation
- File uploads and attachment management
- User authentication and sign-in/sign-up flows

## Hypothesized Root Cause

Based on the bug description, the most likely issues are:

1. **Unfiltered Purchase Includes**: The chapter page (`page.tsx`) and `getChapter` action use `include: { purchase: true }` without a `where: { userId }` clause, returning all purchase records for a course regardless of which user is requesting

2. **Shared Chapter Completion Field**: The progress route (`progress/route.ts`) updates `Chapter.isCompleted` directly on the shared `Chapter` model instead of upserting a `UserProgress` record scoped to the user. The `UserProgress` model exists but is not used for tracking completion.

3. **Missing Unique Constraint on Purchase**: The `Purchase` model lacks `@@unique([userId, courseId])`, which means:
   - `findUnique` with compound key cannot be used
   - Duplicate purchases are possible at the database level
   - No `@@index([userId])` exists to optimize user-scoped queries

4. **Dashboard Nested Include Leak**: `CoursesDashboard` correctly queries purchases by `userId` at the top level, but the nested `include: { course: { include: { purchase: true } } }` does not filter, exposing all purchase records within the nested course object

## Correctness Properties

Property 1: Bug Condition - Purchase and Progress Scoped to User

_For any_ authenticated request where a purchase lookup or progress update occurs (isBugCondition returns true), the fixed code SHALL scope the operation to the authenticated user's `userId`, ensuring that only that user's purchase records are returned and only that user's progress records are created or updated.

**Validates: Requirements 2.1, 2.2, 2.3, 2.5**

Property 2: Preservation - Non-Scoping Behavior Unchanged

_For any_ operation that does NOT involve purchase lookups or progress updates (isBugCondition returns false), the fixed code SHALL produce exactly the same behavior as the original code, preserving free chapter access, Stripe webhook purchase creation, explore page filtering, teacher operations, and attachment access.

**Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5, 3.6**

## Fix Implementation

### Changes Required

Assuming our root cause analysis is correct:

**File**: `prisma/schema.prisma`

**Model**: `Purchase`

**Specific Changes**:

1. **Add unique constraint**: Add `@@unique([userId, courseId])` to prevent duplicate purchases and enable `findUnique` with compound key
2. **Add index**: Add `@@index([userId])` to optimize user-scoped purchase queries

---

**File**: `app/(course)/courses/[courseId]/chapter/[chapterId]/page.tsx`

**Function**: `ChapterPage`

**Specific Changes**:

1. **Filter purchase include by userId**: Change `include: { purchase: true }` to `include: { purchase: { where: { userId } } }` so only the current user's purchase is returned
2. **Update purchase check logic**: The existing `course!.purchase.length < 1` check will now correctly reflect only the current user's purchase status

---

**File**: `actions/get-chapter.ts`

**Function**: `getChapter`

**Specific Changes**:

1. **Use findUnique with compound key**: Replace the unfiltered `include: { purchase: true }` with a separate `db.purchase.findUnique({ where: { userId_courseId: { userId, courseId } } })` query to fetch only the requesting user's purchase
2. **Return purchase in result**: Uncomment and fix the purchase variable, returning it in the result object
3. **Conditionally fetch attachments**: Uncomment the attachment fetch that is gated on the user having a purchase

---

**File**: `app/api/courses/[id]/chapter/[chapterId]/progress/route.ts`

**Function**: `PATCH`

**Specific Changes**:

1. **Replace Chapter update with UserProgress upsert**: Instead of `db.chapter.update({ data: { isCompleted } })`, use `db.userProgress.upsert({ where: { chapterId_userId: { chapterId, userId } }, create: { userId, chapterId, isCompleted }, update: { isCompleted } })`
2. **Return UserProgress record**: Return the upserted `UserProgress` record instead of the chapter

---

**File**: `app/(DashBoard)/(Routes)/dashboard/_components/CoursesDashboard.tsx`

**Function**: `CoursesDashboard`

**Specific Changes**:

1. **Filter nested purchase include**: Change `purchase: true` inside the nested course include to `purchase: { where: { userId } }` so the nested course object only contains the current user's purchase record

## Testing Strategy

### Validation Approach

The testing strategy follows a two-phase approach: first, surface counterexamples that demonstrate the bug on unfixed code, then verify the fix works correctly and preserves existing behavior.

### Exploratory Bug Condition Checking

**Goal**: Surface counterexamples that demonstrate the bug BEFORE implementing the fix. Confirm or refute the root cause analysis. If we refute, we will need to re-hypothesize.

**Test Plan**: Write tests that simulate two different authenticated users interacting with the same course. Verify that purchase records and progress updates leak between users on the UNFIXED code.

**Test Cases**:

1. **Chapter Page Cross-User Purchase Leak**: User A purchases course X, User B views course X chapter page — assert User B sees course as purchased (will fail on unfixed code, demonstrating the bug)
2. **Progress Route Shared Completion**: User A marks chapter as complete, User B views same chapter — assert User B sees chapter as incomplete (will fail on unfixed code)
3. **getChapter Action Purchase Leak**: Call getChapter with User B's userId for a course only User A purchased — assert no purchase returned (will fail on unfixed code)
4. **Dashboard Nested Purchase Leak**: User A views dashboard, nested course includes show all purchases — assert only User A's purchases appear (will fail on unfixed code)

**Expected Counterexamples**:

- Purchase arrays contain records belonging to other users
- Chapter.isCompleted is true for users who never marked it complete
- Possible causes: unfiltered includes, shared Chapter.isCompleted field, missing userId filter

### Fix Checking

**Goal**: Verify that for all inputs where the bug condition holds, the fixed function produces the expected behavior.

**Pseudocode:**

```
FOR ALL input WHERE isBugCondition(input) DO
  result := fixedQuery(input)
  ASSERT allPurchaseRecords(result).every(p => p.userId == input.userId)
  ASSERT allProgressRecords(result).every(p => p.userId == input.userId)
END FOR
```

### Preservation Checking

**Goal**: Verify that for all inputs where the bug condition does NOT hold, the fixed function produces the same result as the original function.

**Pseudocode:**

```
FOR ALL input WHERE NOT isBugCondition(input) DO
  ASSERT originalFunction(input) = fixedFunction(input)
END FOR
```

**Testing Approach**: Property-based testing is recommended for preservation checking because:

- It generates many test cases automatically across the input domain
- It catches edge cases that manual unit tests might miss
- It provides strong guarantees that behavior is unchanged for all non-buggy inputs

**Test Plan**: Observe behavior on UNFIXED code first for free chapter access, Stripe webhook handling, and explore page queries, then write property-based tests capturing that behavior.

**Test Cases**:

1. **Free Chapter Access Preservation**: Verify that free chapters remain viewable without purchase after the fix
2. **Stripe Webhook Preservation**: Verify that webhook still creates Purchase records correctly with userId and courseId
3. **Explore Page Preservation**: Verify that the explore page getCourse action continues to filter purchases by userId (already correct)
4. **Attachment Access Preservation**: Verify that purchased users can still access attachments

### Unit Tests

- Test that chapter page query includes `where: { userId }` in purchase filter
- Test that progress route upserts UserProgress instead of updating Chapter
- Test that getChapter uses findUnique with compound key
- Test edge cases: user with no purchases, user viewing free chapter, duplicate purchase prevention

### Property-Based Tests

- Generate random (userId, courseId) pairs and verify purchase lookups always return only records matching the userId
- Generate random progress updates and verify UserProgress records are scoped to the correct userId
- Generate random course configurations (free/paid chapters) and verify free chapter access is unaffected

### Integration Tests

- Test full purchase flow: checkout → webhook → chapter page shows unlocked for purchaser only
- Test full progress flow: mark complete → verify only that user's progress is updated
- Test multi-user scenario: two users, one purchases, verify isolation of purchase and progress data
