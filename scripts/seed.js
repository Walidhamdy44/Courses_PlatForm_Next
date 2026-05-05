/**
 * MongoDB Seed Script for LMS Application
 *
 * Inserts realistic course data directly into MongoDB.
 * Run with: node scripts/seed.js
 *
 * Before running:
 * 1. Replace TEACHER_USER_ID with your real Clerk userId
 * 2. Replace MONGODB_URI with your connection string
 * 3. Replace DB_NAME with your database name
 */

const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

// ============================================================
// CONFIGURATION — Update these before running
// ============================================================
const TEACHER_USER_ID = "user_2hLZJZ7k4DNeroSDL9dP49PDwya"; // Your Clerk userId
const MONGODB_URI = process.env.DATABASE_URL; // Reads from your .env file
const DB_NAME = "db1";

// ============================================================
// Pre-generate all ObjectIds for consistent relationships
// ============================================================

// Category IDs
const catWebDev = new ObjectId();
const catDataScience = new ObjectId();
const catMobileDev = new ObjectId();
const catUiUx = new ObjectId();
const catDevOps = new ObjectId();

// Course IDs
const course1 = new ObjectId();
const course2 = new ObjectId();
const course3 = new ObjectId();
const course4 = new ObjectId();
const course5 = new ObjectId();
const course6 = new ObjectId();
const course7 = new ObjectId();
const course8 = new ObjectId();

// Chapter IDs (grouped by course)
const c1ch1 = new ObjectId(),
  c1ch2 = new ObjectId(),
  c1ch3 = new ObjectId(),
  c1ch4 = new ObjectId(),
  c1ch5 = new ObjectId();
const c2ch1 = new ObjectId(),
  c2ch2 = new ObjectId(),
  c2ch3 = new ObjectId(),
  c2ch4 = new ObjectId();
const c3ch1 = new ObjectId(),
  c3ch2 = new ObjectId(),
  c3ch3 = new ObjectId(),
  c3ch4 = new ObjectId(),
  c3ch5 = new ObjectId();
const c4ch1 = new ObjectId(),
  c4ch2 = new ObjectId(),
  c4ch3 = new ObjectId(),
  c4ch4 = new ObjectId(),
  c4ch5 = new ObjectId(),
  c4ch6 = new ObjectId();
const c5ch1 = new ObjectId(),
  c5ch2 = new ObjectId(),
  c5ch3 = new ObjectId(),
  c5ch4 = new ObjectId();
const c6ch1 = new ObjectId(),
  c6ch2 = new ObjectId(),
  c6ch3 = new ObjectId(),
  c6ch4 = new ObjectId(),
  c6ch5 = new ObjectId();
const c7ch1 = new ObjectId(),
  c7ch2 = new ObjectId(),
  c7ch3 = new ObjectId(),
  c7ch4 = new ObjectId(),
  c7ch5 = new ObjectId(),
  c7ch6 = new ObjectId();
const c8ch1 = new ObjectId(),
  c8ch2 = new ObjectId(),
  c8ch3 = new ObjectId(),
  c8ch4 = new ObjectId();

// Attachment IDs
const att1 = new ObjectId(),
  att2 = new ObjectId(),
  att3 = new ObjectId(),
  att4 = new ObjectId();
const att5 = new ObjectId(),
  att6 = new ObjectId(),
  att7 = new ObjectId(),
  att8 = new ObjectId();

const now = new Date();

// ============================================================
// Categories
// ============================================================
const categories = [
  { _id: catWebDev, name: "Web Development", createdAt: now, updatedAt: now },
  { _id: catDataScience, name: "Data Science", createdAt: now, updatedAt: now },
  {
    _id: catMobileDev,
    name: "Mobile Development",
    createdAt: now,
    updatedAt: now,
  },
  { _id: catUiUx, name: "UI/UX Design", createdAt: now, updatedAt: now },
  { _id: catDevOps, name: "DevOps", createdAt: now, updatedAt: now },
];

// ============================================================
// Courses
// ============================================================
const courses = [
  {
    _id: course1,
    title: "Full-Stack Web Development with Next.js 15",
    description:
      "Master modern full-stack development using Next.js 15, React Server Components, and the App Router. This comprehensive course covers everything from project setup to deployment, including authentication, database integration with Prisma, and building production-ready applications.",
    imageUrl: "https://placehold.co/600x400",
    price: 49.99,
    isPublished: true,
    userId: TEACHER_USER_ID,
    categoryId: catWebDev.toString(),
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: course2,
    title: "Python for Data Science and Machine Learning",
    description:
      "Dive deep into data science with Python. Learn pandas, NumPy, scikit-learn, and TensorFlow through hands-on projects. You will build real predictive models, perform exploratory data analysis, and understand the mathematics behind machine learning algorithms.",
    imageUrl: "https://placehold.co/600x400",
    price: 79.99,
    isPublished: true,
    userId: TEACHER_USER_ID,
    categoryId: catDataScience.toString(),
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: course3,
    title: "React Native: Build Cross-Platform Mobile Apps",
    description:
      "Learn to build beautiful, performant mobile applications for iOS and Android using React Native. This course covers navigation, state management, native modules, and publishing your app to both app stores. No prior mobile development experience required.",
    imageUrl: "https://placehold.co/600x400",
    price: 59.99,
    isPublished: true,
    userId: TEACHER_USER_ID,
    categoryId: catMobileDev.toString(),
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: course4,
    title: "Advanced UI/UX Design: From Wireframes to Prototypes",
    description:
      "Elevate your design skills with advanced UI/UX techniques. Learn user research methodologies, information architecture, interaction design patterns, and how to create high-fidelity prototypes in Figma. Includes real-world case studies from top tech companies.",
    imageUrl: "https://placehold.co/600x400",
    price: 39.99,
    isPublished: true,
    userId: TEACHER_USER_ID,
    categoryId: catUiUx.toString(),
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: course5,
    title: "Docker and Kubernetes for Production Deployments",
    description:
      "Master containerization and orchestration for modern cloud-native applications. Learn Docker fundamentals, multi-stage builds, Kubernetes architecture, Helm charts, and CI/CD pipelines. Deploy scalable microservices with confidence.",
    imageUrl: "https://placehold.co/600x400",
    price: 69.99,
    isPublished: true,
    userId: TEACHER_USER_ID,
    categoryId: catDevOps.toString(),
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: course6,
    title: "TypeScript Mastery: Advanced Patterns and Best Practices",
    description:
      "Go beyond the basics of TypeScript and learn advanced type system features, design patterns, and architectural best practices. Covers generics, conditional types, mapped types, decorators, and building type-safe libraries that scale.",
    imageUrl: "https://placehold.co/600x400",
    price: 34.99,
    isPublished: true,
    userId: TEACHER_USER_ID,
    categoryId: catWebDev.toString(),
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: course7,
    title: "Deep Learning with PyTorch: Neural Networks from Scratch",
    description:
      "Build neural networks from the ground up using PyTorch. This course covers perceptrons, CNNs, RNNs, transformers, and GANs with mathematical intuition and practical implementations. Train models on real datasets and deploy them to production.",
    imageUrl: "https://placehold.co/600x400",
    price: 99.99,
    isPublished: true,
    userId: TEACHER_USER_ID,
    categoryId: catDataScience.toString(),
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: course8,
    title: "Flutter App Development: The Complete Guide",
    description:
      "Build stunning cross-platform mobile apps with Flutter and Dart. Learn widget composition, state management with Riverpod, animations, platform channels, and Firebase integration. Ship polished apps to iOS and Android from a single codebase.",
    imageUrl: "https://placehold.co/600x400",
    price: 54.99,
    isPublished: true,
    userId: TEACHER_USER_ID,
    categoryId: catMobileDev.toString(),
    createdAt: now,
    updatedAt: now,
  },
];

// ============================================================
// Chapters
// ============================================================
const chapters = [
  // Course 1: Full-Stack Web Development with Next.js 15 (5 chapters)
  {
    _id: c1ch1,
    title: "Introduction to Next.js 15 and Project Setup",
    description:
      "Set up your development environment, create a new Next.js 15 project, and understand the App Router architecture. We will configure TypeScript, ESLint, and Tailwind CSS.",
    videoUrl: "https://placehold.co/video1",
    position: 1,
    isPublished: true,
    ifFree: true,
    courseId: course1.toString(),
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: c1ch2,
    title: "React Server Components and Data Fetching",
    description:
      "Learn the difference between server and client components. Implement efficient data fetching patterns using async components and understand streaming and suspense boundaries.",
    videoUrl: "https://placehold.co/video2",
    position: 2,
    isPublished: true,
    ifFree: false,
    courseId: course1.toString(),
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: c1ch3,
    title: "Authentication with Clerk and Middleware",
    description:
      "Integrate Clerk authentication into your Next.js app. Set up sign-in, sign-up flows, protect routes with middleware, and access user data in server components.",
    videoUrl: "https://placehold.co/video3",
    position: 3,
    isPublished: true,
    ifFree: false,
    courseId: course1.toString(),
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: c1ch4,
    title: "Database Integration with Prisma and MongoDB",
    description:
      "Connect your application to MongoDB using Prisma ORM. Define schemas, run migrations, and build type-safe database queries for your application models.",
    videoUrl: "https://placehold.co/video4",
    position: 4,
    isPublished: true,
    ifFree: false,
    courseId: course1.toString(),
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: c1ch5,
    title: "Deployment to Vercel and Production Optimization",
    description:
      "Deploy your full-stack application to Vercel. Configure environment variables, set up CI/CD, optimize images and fonts, and implement caching strategies for production.",
    videoUrl: "https://placehold.co/video5",
    position: 5,
    isPublished: true,
    ifFree: false,
    courseId: course1.toString(),
    createdAt: now,
    updatedAt: now,
  },

  // Course 2: Python for Data Science (4 chapters)
  {
    _id: c2ch1,
    title: "Python Fundamentals for Data Analysis",
    description:
      "Review Python essentials for data science including list comprehensions, lambda functions, and working with files. Set up Jupyter notebooks and your data science environment.",
    videoUrl: "https://placehold.co/video6",
    position: 1,
    isPublished: true,
    ifFree: true,
    courseId: course2.toString(),
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: c2ch2,
    title: "Data Manipulation with Pandas and NumPy",
    description:
      "Master data wrangling with pandas DataFrames. Learn indexing, filtering, grouping, merging datasets, and handling missing values. Perform vectorized operations with NumPy arrays.",
    videoUrl: "https://placehold.co/video7",
    position: 2,
    isPublished: true,
    ifFree: false,
    courseId: course2.toString(),
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: c2ch3,
    title: "Data Visualization with Matplotlib and Seaborn",
    description:
      "Create compelling visualizations to communicate insights. Build histograms, scatter plots, heatmaps, and interactive dashboards. Learn design principles for effective data storytelling.",
    videoUrl: "https://placehold.co/video8",
    position: 3,
    isPublished: true,
    ifFree: false,
    courseId: course2.toString(),
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: c2ch4,
    title: "Machine Learning with Scikit-Learn",
    description:
      "Build your first ML models including linear regression, decision trees, and random forests. Learn train-test splits, cross-validation, hyperparameter tuning, and model evaluation metrics.",
    videoUrl: "https://placehold.co/video9",
    position: 4,
    isPublished: true,
    ifFree: false,
    courseId: course2.toString(),
    createdAt: now,
    updatedAt: now,
  },

  // Course 3: React Native (5 chapters)
  {
    _id: c3ch1,
    title: "Getting Started with React Native and Expo",
    description:
      "Install the React Native development environment using Expo. Understand the component model, JSX in mobile context, and run your first app on iOS and Android simulators.",
    videoUrl: "https://placehold.co/video10",
    position: 1,
    isPublished: true,
    ifFree: true,
    courseId: course3.toString(),
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: c3ch2,
    title: "Core Components and Styling",
    description:
      "Learn View, Text, Image, ScrollView, and FlatList components. Style your app with StyleSheet, Flexbox layout, and platform-specific styling for a native look and feel.",
    videoUrl: "https://placehold.co/video11",
    position: 2,
    isPublished: true,
    ifFree: false,
    courseId: course3.toString(),
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: c3ch3,
    title: "Navigation with React Navigation",
    description:
      "Implement stack, tab, and drawer navigation patterns. Handle deep linking, pass parameters between screens, and create a polished navigation experience.",
    videoUrl: "https://placehold.co/video12",
    position: 3,
    isPublished: true,
    ifFree: false,
    courseId: course3.toString(),
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: c3ch4,
    title: "State Management and API Integration",
    description:
      "Manage complex state with Context API and Zustand. Fetch data from REST APIs, handle loading and error states, and implement offline-first patterns with AsyncStorage.",
    videoUrl: "https://placehold.co/video13",
    position: 4,
    isPublished: true,
    ifFree: false,
    courseId: course3.toString(),
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: c3ch5,
    title: "Publishing to App Store and Google Play",
    description:
      "Prepare your app for production. Configure app icons, splash screens, and build settings. Submit to the Apple App Store and Google Play Store with proper metadata.",
    videoUrl: "https://placehold.co/video14",
    position: 5,
    isPublished: true,
    ifFree: false,
    courseId: course3.toString(),
    createdAt: now,
    updatedAt: now,
  },

  // Course 4: Advanced UI/UX Design (6 chapters)
  {
    _id: c4ch1,
    title: "User Research Methods and Personas",
    description:
      "Learn qualitative and quantitative research techniques. Conduct user interviews, create surveys, build empathy maps, and develop data-driven personas that guide design decisions.",
    videoUrl: "https://placehold.co/video15",
    position: 1,
    isPublished: true,
    ifFree: true,
    courseId: course4.toString(),
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: c4ch2,
    title: "Information Architecture and User Flows",
    description:
      "Structure content effectively with card sorting and tree testing. Map user journeys, create sitemaps, and design intuitive navigation systems for complex applications.",
    videoUrl: "https://placehold.co/video16",
    position: 2,
    isPublished: true,
    ifFree: false,
    courseId: course4.toString(),
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: c4ch3,
    title: "Wireframing and Low-Fidelity Prototyping",
    description:
      "Rapidly explore design solutions with wireframes. Learn sketching techniques, use Figma for low-fidelity mockups, and validate concepts early with stakeholder feedback.",
    videoUrl: "https://placehold.co/video17",
    position: 3,
    isPublished: true,
    ifFree: false,
    courseId: course4.toString(),
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: c4ch4,
    title: "Visual Design Systems and Component Libraries",
    description:
      "Build scalable design systems with consistent typography, color palettes, spacing scales, and reusable components. Learn atomic design methodology and design tokens.",
    videoUrl: "https://placehold.co/video18",
    position: 4,
    isPublished: true,
    ifFree: false,
    courseId: course4.toString(),
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: c4ch5,
    title: "Interaction Design and Micro-Animations",
    description:
      "Design delightful interactions that guide users. Create meaningful transitions, loading states, and feedback animations. Prototype complex interactions in Figma with Smart Animate.",
    videoUrl: "https://placehold.co/video19",
    position: 5,
    isPublished: true,
    ifFree: false,
    courseId: course4.toString(),
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: c4ch6,
    title: "Usability Testing and Design Iteration",
    description:
      "Plan and conduct usability tests with real users. Analyze findings, prioritize issues by severity, and iterate on designs. Learn A/B testing fundamentals and measuring design impact.",
    videoUrl: "https://placehold.co/video20",
    position: 6,
    isPublished: true,
    ifFree: false,
    courseId: course4.toString(),
    createdAt: now,
    updatedAt: now,
  },

  // Course 5: Docker and Kubernetes (4 chapters)
  {
    _id: c5ch1,
    title: "Docker Fundamentals and Container Basics",
    description:
      "Understand containerization concepts, install Docker, and build your first container. Learn Dockerfiles, image layers, volumes, and networking fundamentals for local development.",
    videoUrl: "https://placehold.co/video21",
    position: 1,
    isPublished: true,
    ifFree: true,
    courseId: course5.toString(),
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: c5ch2,
    title: "Multi-Stage Builds and Docker Compose",
    description:
      "Optimize images with multi-stage builds. Orchestrate multi-container applications with Docker Compose. Set up development environments with hot-reloading and shared volumes.",
    videoUrl: "https://placehold.co/video22",
    position: 2,
    isPublished: true,
    ifFree: false,
    courseId: course5.toString(),
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: c5ch3,
    title: "Kubernetes Architecture and Core Concepts",
    description:
      "Learn Kubernetes architecture including pods, services, deployments, and namespaces. Set up a local cluster with minikube and deploy your first application with kubectl.",
    videoUrl: "https://placehold.co/video23",
    position: 3,
    isPublished: true,
    ifFree: false,
    courseId: course5.toString(),
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: c5ch4,
    title: "Helm Charts and CI/CD Pipelines",
    description:
      "Package applications with Helm charts for repeatable deployments. Build CI/CD pipelines with GitHub Actions that automatically build, test, and deploy to Kubernetes clusters.",
    videoUrl: "https://placehold.co/video24",
    position: 4,
    isPublished: true,
    ifFree: false,
    courseId: course5.toString(),
    createdAt: now,
    updatedAt: now,
  },

  // Course 6: TypeScript Mastery (5 chapters)
  {
    _id: c6ch1,
    title: "Advanced Type System Fundamentals",
    description:
      "Go beyond basic types. Master union and intersection types, type narrowing, discriminated unions, and the never type. Understand structural typing and type compatibility in depth.",
    videoUrl: "https://placehold.co/video25",
    position: 1,
    isPublished: true,
    ifFree: true,
    courseId: course6.toString(),
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: c6ch2,
    title: "Generics and Conditional Types",
    description:
      "Write flexible, reusable code with generics. Learn generic constraints, default type parameters, conditional types, and infer keyword. Build utility types from scratch.",
    videoUrl: "https://placehold.co/video26",
    position: 2,
    isPublished: true,
    ifFree: false,
    courseId: course6.toString(),
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: c6ch3,
    title: "Mapped Types and Template Literal Types",
    description:
      "Transform existing types with mapped types. Use template literal types for string manipulation at the type level. Build complex type transformations for real-world APIs.",
    videoUrl: "https://placehold.co/video27",
    position: 3,
    isPublished: true,
    ifFree: false,
    courseId: course6.toString(),
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: c6ch4,
    title: "Decorators and Metadata Reflection",
    description:
      "Implement decorators for cross-cutting concerns like logging, validation, and dependency injection. Use reflect-metadata for runtime type information and build decorator factories.",
    videoUrl: "https://placehold.co/video28",
    position: 4,
    isPublished: true,
    ifFree: false,
    courseId: course6.toString(),
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: c6ch5,
    title: "Building Type-Safe Libraries",
    description:
      "Design public APIs with excellent type inference. Handle overloads, branded types, and opaque types. Write comprehensive type tests and publish type-safe packages to npm.",
    videoUrl: "https://placehold.co/video29",
    position: 5,
    isPublished: true,
    ifFree: false,
    courseId: course6.toString(),
    createdAt: now,
    updatedAt: now,
  },

  // Course 7: Deep Learning with PyTorch (6 chapters)
  {
    _id: c7ch1,
    title: "Tensors, Autograd, and PyTorch Basics",
    description:
      "Understand tensors as the fundamental data structure. Learn automatic differentiation with autograd, GPU acceleration, and the PyTorch computation graph for building neural networks.",
    videoUrl: "https://placehold.co/video30",
    position: 1,
    isPublished: true,
    ifFree: true,
    courseId: course7.toString(),
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: c7ch2,
    title: "Building Neural Networks with nn.Module",
    description:
      "Construct neural networks using PyTorch's nn.Module. Implement forward passes, loss functions, and optimizers. Train a multi-layer perceptron on tabular data from scratch.",
    videoUrl: "https://placehold.co/video31",
    position: 2,
    isPublished: true,
    ifFree: false,
    courseId: course7.toString(),
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: c7ch3,
    title: "Convolutional Neural Networks for Computer Vision",
    description:
      "Build CNNs for image classification and object detection. Learn convolution operations, pooling, batch normalization, and residual connections. Train on CIFAR-10 and custom datasets.",
    videoUrl: "https://placehold.co/video32",
    position: 3,
    isPublished: true,
    ifFree: false,
    courseId: course7.toString(),
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: c7ch4,
    title: "Recurrent Networks and Sequence Modeling",
    description:
      "Process sequential data with RNNs, LSTMs, and GRUs. Build text classifiers, language models, and time series forecasters. Understand vanishing gradients and attention mechanisms.",
    videoUrl: "https://placehold.co/video33",
    position: 4,
    isPublished: true,
    ifFree: false,
    courseId: course7.toString(),
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: c7ch5,
    title: "Transformers and Self-Attention",
    description:
      "Implement the transformer architecture from scratch. Understand multi-head self-attention, positional encoding, and layer normalization. Fine-tune pre-trained models with Hugging Face.",
    videoUrl: "https://placehold.co/video34",
    position: 5,
    isPublished: true,
    ifFree: false,
    courseId: course7.toString(),
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: c7ch6,
    title: "Generative Adversarial Networks",
    description:
      "Build GANs for image generation. Implement DCGAN, Wasserstein GAN, and StyleGAN architectures. Understand training stability, mode collapse, and evaluation metrics like FID.",
    videoUrl: "https://placehold.co/video35",
    position: 6,
    isPublished: true,
    ifFree: false,
    courseId: course7.toString(),
    createdAt: now,
    updatedAt: now,
  },

  // Course 8: Flutter App Development (4 chapters)
  {
    _id: c8ch1,
    title: "Dart Language and Flutter Setup",
    description:
      "Learn Dart fundamentals including null safety, async/await, and collections. Install Flutter SDK, configure your IDE, and create your first Flutter application with hot reload.",
    videoUrl: "https://placehold.co/video36",
    position: 1,
    isPublished: true,
    ifFree: true,
    courseId: course8.toString(),
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: c8ch2,
    title: "Widget Composition and Layout",
    description:
      "Master Flutter's widget tree. Build complex layouts with Row, Column, Stack, and CustomScrollView. Create responsive designs that adapt to different screen sizes and orientations.",
    videoUrl: "https://placehold.co/video37",
    position: 2,
    isPublished: true,
    ifFree: false,
    courseId: course8.toString(),
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: c8ch3,
    title: "State Management with Riverpod",
    description:
      "Manage application state effectively with Riverpod. Learn providers, consumers, state notifiers, and async value handling. Implement dependency injection and testable architecture.",
    videoUrl: "https://placehold.co/video38",
    position: 3,
    isPublished: true,
    ifFree: false,
    courseId: course8.toString(),
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: c8ch4,
    title: "Firebase Integration and App Deployment",
    description:
      "Connect your Flutter app to Firebase for authentication, Firestore database, and cloud storage. Configure platform-specific settings and deploy to iOS and Android stores.",
    videoUrl: "https://placehold.co/video39",
    position: 4,
    isPublished: true,
    ifFree: false,
    courseId: course8.toString(),
    createdAt: now,
    updatedAt: now,
  },
];

// ============================================================
// MuxData — one record per chapter with fake asset/playback IDs
// ============================================================
const muxData = chapters.map((chapter) => ({
  _id: new ObjectId(),
  assetsId: `asset_${chapter._id.toString().slice(0, 12)}`,
  playbackId: `playback_${chapter._id.toString().slice(0, 12)}`,
  chapterId: chapter._id.toString(),
  createdAt: now,
  updatedAt: now,
}));

// ============================================================
// Attachments — at least 1 per course
// ============================================================
const attachments = [
  {
    _id: att1,
    name: "Next.js 15 Cheat Sheet.pdf",
    url: "https://placehold.co/attachment/nextjs-cheatsheet.pdf",
    courseId: course1.toString(),
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: att2,
    name: "Python Data Science Notebook.ipynb",
    url: "https://placehold.co/attachment/data-science-notebook.ipynb",
    courseId: course2.toString(),
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: att3,
    name: "React Native Starter Template.zip",
    url: "https://placehold.co/attachment/rn-starter.zip",
    courseId: course3.toString(),
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: att4,
    name: "Figma Design System Template.fig",
    url: "https://placehold.co/attachment/design-system.fig",
    courseId: course4.toString(),
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: att5,
    name: "Docker Compose Examples.zip",
    url: "https://placehold.co/attachment/docker-examples.zip",
    courseId: course5.toString(),
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: att6,
    name: "TypeScript Utility Types Reference.pdf",
    url: "https://placehold.co/attachment/ts-utility-types.pdf",
    courseId: course6.toString(),
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: att7,
    name: "PyTorch Model Architectures.pdf",
    url: "https://placehold.co/attachment/pytorch-architectures.pdf",
    courseId: course7.toString(),
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: att8,
    name: "Flutter Widget Catalog.pdf",
    url: "https://placehold.co/attachment/flutter-widgets.pdf",
    courseId: course8.toString(),
    createdAt: now,
    updatedAt: now,
  },
];

// ============================================================
// Main seed function
// ============================================================
async function seed() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log("Connected to MongoDB\n");

    const db = client.db(DB_NAME);

    // Insert Categories
    const catResult = await db.collection("Category").insertMany(categories);
    console.log(`✓ Inserted ${catResult.insertedCount} categories`);

    // Insert Courses
    const courseResult = await db.collection("Course").insertMany(courses);
    console.log(`✓ Inserted ${courseResult.insertedCount} courses`);

    // Insert Chapters
    const chapterResult = await db.collection("Chapter").insertMany(chapters);
    console.log(`✓ Inserted ${chapterResult.insertedCount} chapters`);

    // Insert MuxData
    const muxResult = await db.collection("MuxData").insertMany(muxData);
    console.log(`✓ Inserted ${muxResult.insertedCount} MuxData records`);

    // Insert Attachments
    const attResult = await db.collection("Attachment").insertMany(attachments);
    console.log(`✓ Inserted ${attResult.insertedCount} attachments`);

    console.log("\n🎉 Seed completed successfully!");
    console.log(
      `   Total documents inserted: ${catResult.insertedCount + courseResult.insertedCount + chapterResult.insertedCount + muxResult.insertedCount + attResult.insertedCount}`,
    );
  } catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  } finally {
    await client.close();
    console.log("\nDatabase connection closed.");
  }
}

seed();
