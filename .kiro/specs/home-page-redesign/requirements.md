# Requirements Document

## Introduction

Complete redesign of the home page for an EdTech/online courses platform built with Next.js App Router, Tailwind CSS, shadcn/ui, and Lucide Icons. The redesign targets a modern, premium aesthetic inspired by Coursera and Linear, using a deep navy and electric indigo color palette with glass-morphism effects, smooth transitions, and responsive layouts across all sections.

## Glossary

- **Home_Page**: The main landing page served at the root route (`/`), located at `app/(Home Page)/page.tsx`
- **HomeNavbar**: A sticky client component navigation bar with scroll-aware background behavior, located at `app/(Home Page)/_components-home/HomeNavbar.tsx`
- **Hero_Section**: The full-viewport introductory section containing headline, subtext, CTA buttons, stats, and a floating Live Session card
- **Features_Section**: A grid section displaying six feature cards with glass-morphism styling
- **Testimonials_Section**: A section displaying five customer reviews in a responsive layout (horizontal scroll on mobile, 3-column grid on desktop)
- **Promo_Banner**: A full-width gradient banner promoting a discount offer with a CTA button
- **Newsletter_Section**: An email subscription section with an input field and submit button
- **Footer**: A two-row layout with logo, social icons, link columns, and copyright notice
- **Trusted_Logos_Strip**: A horizontal row of five placeholder company text logos displayed below the hero stats
- **Live_Session_Card**: A floating UI card in the hero section showing a mock live session with avatar, course name, and a pulsing green "Live" indicator badge
- **Feature_Card**: An individual card in the Features Section with a colored icon background, dark glass-morphism style, subtle border, and hover lift effect

## Requirements

### Requirement 1: Navbar Scroll Behavior

**User Story:** As a visitor, I want the navigation bar to remain visible as I scroll, so that I can access navigation links at any point on the page.

#### Acceptance Criteria

1. THE HomeNavbar SHALL render as a sticky element fixed to the top of the viewport with a z-index ensuring it overlays page content.
2. WHILE the page scroll position is at the top (zero offset), THE HomeNavbar SHALL display a fully transparent background.
3. WHEN the user scrolls down past zero offset, THE HomeNavbar SHALL transition to a solid dark background (#0F172A) with a backdrop-blur effect (backdrop-blur-md).
4. THE HomeNavbar SHALL contain the "Learn" logo text linking to the root route, navigation links ("Dashboard", "Explore"), and "Sign Up" / "Sign In" buttons linking to `/sign-up` and `/sign-in` respectively.
5. THE HomeNavbar SHALL be implemented as a client component (`"use client"`) to support useState and useEffect for scroll detection.

### Requirement 2: Hero Section Layout

**User Story:** As a visitor, I want to see a compelling hero section when I land on the page, so that I immediately understand the platform's value proposition.

#### Acceptance Criteria

1. THE Hero_Section SHALL occupy the full viewport height (min-h-screen) with a deep navy (#0F172A) background.
2. THE Hero_Section SHALL display a left-aligned headline using text-5xl on mobile and text-6xl on desktop with bold weight and white text color.
3. THE Hero_Section SHALL display descriptive subtext below the headline in slate-300 color.
4. THE Hero_Section SHALL display two CTA buttons: a primary "Get Started Free" button with electric indigo (#6366F1) background linking to `/dashboard`, and a secondary outlined "Explore Courses" button linking to `/explore`.
5. THE Hero_Section SHALL display two stat badges: "4.8/5 Rating" with five star icons and "98% Success Rate", styled as pill-shaped elements with semi-transparent backgrounds.
6. THE Hero_Section SHALL display the Live_Session_Card on the right side of the layout on desktop viewports, positioned as a floating element with rounded corners, a dark glass-morphism background, and a subtle border.
7. THE Live_Session_Card SHALL contain an avatar image, the text "English with Sarah", and a pulsing green dot indicator with the label "Live".

### Requirement 3: Trusted Logos Strip

**User Story:** As a visitor, I want to see recognizable company logos, so that I trust the platform is used by reputable organizations.

#### Acceptance Criteria

1. THE Trusted_Logos_Strip SHALL display below the Hero_Section stats area with the heading text "Trusted by learners from".
2. THE Trusted_Logos_Strip SHALL render five placeholder company names as styled SVG text elements in a horizontal row with equal spacing.
3. THE Trusted_Logos_Strip SHALL display the company names in a muted gray color (slate-500) with medium font weight.

### Requirement 4: Features Section

**User Story:** As a visitor, I want to understand the platform's key features at a glance, so that I can evaluate whether it meets my learning needs.

#### Acceptance Criteria

1. THE Features_Section SHALL display the heading "Why Choose Our Platform" centered above the feature cards with white text on a dark background.
2. THE Features_Section SHALL render six Feature_Cards in a responsive grid: single column on mobile, two columns on medium screens, and three columns on large screens.
3. EACH Feature_Card SHALL display a Lucide icon (BookOpen, Users, Video, User, Globe, or BarChart) inside a colored circular background, a bold title, and a descriptive paragraph.
4. EACH Feature_Card SHALL use a dark glass-morphism style with a semi-transparent background (bg-white/5), a subtle border (border-white/10), and rounded-xl corners.
5. WHEN a user hovers over a Feature_Card, THE Feature_Card SHALL translate upward by 4px (hover:-translate-y-1) with a smooth transition (transition-all duration-300).

### Requirement 5: Testimonials Section

**User Story:** As a visitor, I want to read reviews from other learners, so that I can feel confident about enrolling in courses.

#### Acceptance Criteria

1. THE Testimonials_Section SHALL display the heading "What Our Learners Say" centered above the testimonials.
2. THE Testimonials_Section SHALL render five testimonial cards, each containing a reviewer avatar (rendered as a colored circle with initials), full name, star rating (using filled Star icons), and a unique realistic quote about the learning experience.
3. THE Testimonials_Section SHALL display testimonials in a horizontally scrollable row on mobile (overflow-x-auto with snap scrolling) and a three-column grid on desktop (md:grid-cols-3).
4. EACH testimonial card SHALL display between 3 and 5 filled star icons to represent the reviewer's rating.
5. EACH testimonial quote SHALL be unique, realistic EdTech-related text with no placeholder or Lorem ipsum content.

### Requirement 6: Promo Banner

**User Story:** As a visitor, I want to see a prominent discount offer, so that I am motivated to enroll in a course.

#### Acceptance Criteria

1. THE Promo_Banner SHALL span the full width of the viewport with a gradient background transitioning from indigo (#6366F1) to purple (#7C3AED).
2. THE Promo_Banner SHALL display the text "Get 20% off on your next course" in large bold white text (text-3xl on mobile, text-5xl on desktop).
3. THE Promo_Banner SHALL contain a CTA button labeled "Claim Discount" with a white background and indigo text, linking to `/explore`.
4. THE Promo_Banner SHALL include vertical padding of at least py-16 to create visual prominence.

### Requirement 7: Newsletter Section

**User Story:** As a visitor, I want to subscribe to updates via email, so that I receive news about new courses and offers.

#### Acceptance Criteria

1. THE Newsletter_Section SHALL display a heading prompting the user to subscribe (e.g., "Stay updated with new courses and offers").
2. THE Newsletter_Section SHALL render an email input field with placeholder text and a "Subscribe" submit button.
3. THE Newsletter_Section SHALL center the input and button horizontally within a max-width container.
4. THE Newsletter_Section SHALL use a dark background consistent with the overall page theme (#0F172A or similar dark shade).

### Requirement 8: Footer Layout

**User Story:** As a visitor, I want to find social links, service information, and legal notices in the footer, so that I can navigate to additional resources.

#### Acceptance Criteria

1. THE Footer SHALL use a two-row layout: the top row containing the "Learn" logo and social media icon links, and the bottom row containing link columns and copyright text.
2. THE Footer SHALL display at least three link columns (e.g., "Platform", "Resources", "Company") with relevant navigation items.
3. THE Footer SHALL display a copyright notice with the text "© 2024 Learn. All rights reserved."
4. THE Footer SHALL use a dark background (#0F172A) with light-colored text (slate-400 for body, white for headings).
5. THE Footer SHALL render social media icons (Facebook, Instagram, Twitter/X, GitHub) as SVG elements with hover color transitions.

### Requirement 9: Color Palette and Typography

**User Story:** As a visitor, I want a visually cohesive and modern interface, so that the platform feels professional and trustworthy.

#### Acceptance Criteria

1. THE Home_Page SHALL use deep navy (#0F172A) as the primary background color for all major sections.
2. THE Home_Page SHALL use electric indigo (#6366F1) as the primary accent color for buttons, highlights, and interactive elements.
3. THE Home_Page SHALL use white (#FFFFFF) for primary headings and slate-300/slate-400 for body text and secondary content.
4. THE Home_Page SHALL use text-5xl or text-6xl with font-bold for the hero headline, and text-3xl or text-4xl with font-bold for section headings.
5. THE Home_Page SHALL apply subtle gradient overlays where specified (hero background, promo banner) using Tailwind gradient utilities.

### Requirement 10: Responsive Design

**User Story:** As a visitor on any device, I want the page to adapt to my screen size, so that I have a usable experience on mobile, tablet, and desktop.

#### Acceptance Criteria

1. THE Home_Page SHALL use a single-column layout on viewports below 768px (md breakpoint) and multi-column layouts on larger viewports.
2. THE Hero_Section SHALL stack the text content above the Live_Session_Card on mobile and display them side-by-side on desktop.
3. THE HomeNavbar SHALL remain fully functional and accessible on all viewport sizes from 320px width and above.
4. ALL interactive elements (buttons, links, inputs) SHALL have a minimum touch target size of 44x44 pixels on mobile viewports.

### Requirement 11: Technical Architecture

**User Story:** As a developer, I want the code to follow Next.js App Router conventions, so that the codebase remains maintainable and performant.

#### Acceptance Criteria

1. THE Home_Page main file (`app/(Home Page)/page.tsx`) SHALL be a React Server Component (no "use client" directive) that composes child section components.
2. THE HomeNavbar SHALL be extracted as a separate client component at `app/(Home Page)/_components-home/HomeNavbar.tsx` with the "use client" directive.
3. THE Home_Page SHALL use `next/link` for all internal navigation links and `next/image` for all image elements.
4. THE Home_Page SHALL import Lucide icons (BookOpen, Users, Video, User, Globe, BarChart, Star) from the `lucide-react` package.
5. THE Home_Page SHALL use only Tailwind CSS utility classes for styling with no inline style objects or external CSS files beyond `globals.css`.
6. THE Home_Page SHALL not introduce any external dependencies beyond those already listed in `package.json`.

### Requirement 12: Content Quality

**User Story:** As a visitor, I want all text on the page to be meaningful and relevant, so that I can make informed decisions about the platform.

#### Acceptance Criteria

1. THE Home_Page SHALL contain only realistic EdTech-related copy with no Lorem ipsum or placeholder text.
2. THE Testimonials_Section SHALL display five testimonials with unique reviewer names and unique quotes that reference specific aspects of the learning experience.
3. THE Home_Page SHALL not contain any placeholder comments (e.g., `{/* TODO */}`, `{/* placeholder */}`) in the final output.
4. ALL section headings, button labels, and descriptive text SHALL be written in clear, professional English appropriate for an EdTech audience.
