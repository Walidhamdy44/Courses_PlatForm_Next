"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Play,
  PlayCircle,
  Star,
  X,
  CheckCircle,
  Users,
  BookOpen,
  Clock,
} from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const LandingPage = () => {
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);
  const [isJoinSessionOpen, setIsJoinSessionOpen] = useState(false);
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  const howItWorksSteps = [
    {
      icon: <Users className="h-6 w-6 text-blue-600" />,
      title: "Choose Your Teacher",
      description:
        "Browse through our qualified native speakers and select the one that fits your learning style.",
    },
    {
      icon: <BookOpen className="h-6 w-6 text-blue-600" />,
      title: "Select Your Course",
      description:
        "Pick from our wide range of courses designed for all proficiency levels.",
    },
    {
      icon: <Clock className="h-6 w-6 text-blue-600" />,
      title: "Schedule Your Session",
      description:
        "Book a time that works for you and get ready for an interactive learning experience.",
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-blue-600" />,
      title: "Start Learning",
      description:
        "Join your live session and begin your language learning journey with native speakers.",
    },
  ];

  const handleJoinSession = () => {
    setIsJoinSessionOpen(true);
    // In a real app, this would redirect to the actual session
    setTimeout(() => {
      setIsJoinSessionOpen(false);
      // Redirect to dashboard or course page
      window.location.href = "/dashboard";
    }, 2000);
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10">
          <div className="flex-1 space-y-6 md:space-y-8 order-2 md:order-1">
            <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full hover:bg-blue-100 transition-colors cursor-pointer">
              <span className="text-blue-600 font-medium">New Feature</span>
              <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs">
                Coming soon
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Learn Language With
              <span className="text-blue-600"> Native Speaker</span>
            </h1>

            <p className="text-gray-600 text-base md:text-lg">
              Practice speaking with qualified native teachers. Improve your
              speaking, pronunciation, vocabulary and grammar.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link href="/dashboard">
                <Button className="bg-blue-600 hover:bg-blue-700 px-6 md:px-8 py-4 md:py-6 text-base md:text-lg w-full sm:w-auto transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  Get Started Free
                </Button>
              </Link>
              <Button
                onClick={() => setIsHowItWorksOpen(true)}
                variant="outline"
                className="flex items-center gap-2 text-gray-700 w-full sm:w-auto justify-center sm:justify-start border-2 hover:border-blue-600 hover:text-blue-600 transition-all duration-200"
              >
                <PlayCircle className="h-8 w-8 md:h-12 md:w-12 text-blue-600" />
                <span>How it works</span>
              </Button>
            </div>

            <div className="flex items-center gap-6 md:gap-8 pt-6 md:pt-8">
              <div className="text-center">
                <p className="text-2xl md:text-4xl font-bold">4.8/5</p>
                <div className="flex items-center gap-1 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 md:h-5 md:w-5 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-600 mt-1 text-sm md:text-base">
                  User Rating
                </p>
              </div>
              <div className="text-center">
                <p className="text-2xl md:text-4xl font-bold">98%</p>
                <p className="text-gray-600 text-sm md:text-base">
                  Success Rate
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 relative order-1 md:order-2 w-full">
            <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/imgs/7855_11zon.jpg"
                alt="Learning Platform"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8 right-4 md:right-8 bg-white/95 backdrop-blur-sm p-3 md:p-4 rounded-xl shadow-lg border border-gray-200">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 relative rounded-full overflow-hidden flex-shrink-0 border-2 border-blue-600">
                    <Image
                      src="/imgs/1.jpg"
                      alt="Teacher"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm md:text-base">
                      Live Session
                    </h3>
                    <p className="text-xs md:text-sm text-gray-600">
                      English with Sarah
                    </p>
                  </div>
                  <Button
                    onClick={handleJoinSession}
                    className="ml-auto flex-shrink-0 bg-green-600 hover:bg-green-700 transition-all duration-200 transform hover:scale-105"
                    size="sm"
                  >
                    <Play className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                    <span className="hidden sm:inline">Join Now</span>
                    <span className="sm:hidden">Join</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Modal */}
      <Dialog open={isHowItWorksOpen} onOpenChange={setIsHowItWorksOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">
              How It Works
            </DialogTitle>
            <DialogDescription className="text-center text-gray-600">
              Follow these simple steps to start your language learning journey
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {howItWorksSteps.map((step, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="bg-blue-100 p-2 rounded-lg flex-shrink-0">
                  {step.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-6">
            <Link href="/dashboard">
              <Button className="bg-blue-600 hover:bg-blue-700 px-8 py-3">
                Get Started Now
              </Button>
            </Link>
          </div>
        </DialogContent>
      </Dialog>

      {/* Join Session Modal */}
      <Dialog open={isJoinSessionOpen} onOpenChange={setIsJoinSessionOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-center">
              Joining Session...
            </DialogTitle>
            <DialogDescription className="text-center">
              Connecting you to Sarah&apos;s English session
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4 py-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600 animate-pulse" />
            </div>
            <div className="text-center">
              <p className="font-semibold">English with Sarah</p>
              <p className="text-sm text-gray-600">Live Session</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full animate-pulse"
                style={{ width: "60%" }}
              ></div>
            </div>
            <p className="text-sm text-gray-600">Preparing your session...</p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LandingPage;
