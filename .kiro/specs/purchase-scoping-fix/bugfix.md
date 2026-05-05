# Bugfix Requirements Document

## Introduction

Course purchases and chapter progress are not correctly scoped to individual users. When any user purchases a course, all other users see that course as purchased because queries include all purchase records without filtering by the authenticated user's `userId`. Similarly, chapter completion is stored directly on the `Chapter` model (a shared record) rather than on the per-user `UserProgress` model, meaning one user marking a chapter complete marks it complete for everyone. The `Purchase` model also lacks a `@@unique([userId, courseId])` database constraint, allowing potential duplicate purchase records.

## Bug Analysis

### Current Behavior (Defect)

1.1 WHEN user A purchases a course AND user B views the same course's chapter page THEN the system shows the course as purchased for user B because the query `include: { purchase: true }` returns all purchase records without filtering by userId

1.2 WHEN user A marks a chapter as complete THEN the system updates the `Chapter.isCompleted` field directly, causing all users to see that chapter as completed

1.3 WHEN the `getChapter` server action fetches course data THEN the system includes all purchases for the course without filtering by the requesting user's userId

1.4 WHEN the Purchase model stores records THEN the system does not enforce a unique constraint on `(userId, courseId)` at the database level, allowing duplicate purchase records

1.5 WHEN the dashboard's CoursesDashboard component includes nested course data with `purchase: true` THEN the system exposes all purchase records for each course rather than only the current user's purchases

### Expected Behavior (Correct)

2.1 WHEN user A purchases a course AND user B views the same course's chapter page THEN the system SHALL only show the course as purchased if user B has their own purchase record, by filtering purchases with `where: { userId }`

2.2 WHEN user A marks a chapter as complete THEN the system SHALL upsert a `UserProgress` record scoped to user A's userId and the specific chapterId, leaving other users' progress unchanged

2.3 WHEN the `getChapter` server action fetches course data THEN the system SHALL query the purchase using `findUnique` with the compound key `{ userId_courseId: { userId, courseId } }` to return only the requesting user's purchase

2.4 WHEN the Purchase model stores records THEN the system SHALL enforce a `@@unique([userId, courseId])` constraint and an `@@index([userId])` at the database level to prevent duplicates and optimize user-scoped queries

2.5 WHEN the dashboard's CoursesDashboard component includes nested course data THEN the system SHALL filter the nested purchase inclusion by the current user's userId

### Unchanged Behavior (Regression Prevention)

3.1 WHEN a user who has purchased a course views that course's chapter page THEN the system SHALL CONTINUE TO show the chapter as unlocked and display the video player

3.2 WHEN a user browses the explore page THEN the system SHALL CONTINUE TO show "purchased" badges only on courses that user has actually purchased (the `getCourse` action already filters correctly)

3.3 WHEN a Stripe checkout completes successfully THEN the system SHALL CONTINUE TO create a Purchase record with the correct userId and courseId from the session metadata

3.4 WHEN a user views the dashboard THEN the system SHALL CONTINUE TO display only courses that specific user has purchased

3.5 WHEN a user views a free chapter THEN the system SHALL CONTINUE TO display the video without requiring a purchase

3.6 WHEN a course has attachments THEN the system SHALL CONTINUE TO make attachments accessible to users who have purchased the course
