import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Play, PlayCircle, Star } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10">
        <div className="flex-1 space-y-6 md:space-y-8 order-2 md:order-1">
          <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full">
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
              <Button className="bg-blue-600 hover:bg-blue-700 px-6 md:px-8 py-4 md:py-6 text-base md:text-lg w-full sm:w-auto">
                Get Started Free
              </Button>
            </Link>
            <button className="flex items-center gap-2 text-gray-700 w-full sm:w-auto justify-center sm:justify-start">
              <PlayCircle className="h-8 w-8 md:h-12 md:w-12 text-blue-600" />
              <span>How it works</span>
            </button>
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
              <p className="text-gray-600 text-sm md:text-base">Success Rate</p>
            </div>
          </div>
        </div>

        <div className="flex-1 relative order-1 md:order-2 w-full">
          <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden">
            <Image
              src="/imgs/7855_11zon.jpg"
              alt="Learning Platform"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8 right-4 md:right-8 bg-white/90 backdrop-blur-sm p-3 md:p-4 rounded-xl">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 relative rounded-full overflow-hidden flex-shrink-0">
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
                <Button className="ml-auto flex-shrink-0" size="sm">
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
  );
};

export default LandingPage;
