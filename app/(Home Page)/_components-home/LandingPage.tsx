import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Play, PlayCircle, Star } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="flex-1 space-y-8">
          <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full">
            <span className="text-blue-600 font-medium">New Feature</span>
            <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs">
              Coming soon
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Learn Language With
            <span className="text-blue-600"> Native Speaker</span>
          </h1>

          <p className="text-gray-600 text-lg">
            Practice speaking with qualified native teachers. Improve your
            speaking, pronunciation, vocabulary and grammar.
          </p>

          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button className="bg-blue-600 hover:bg-blue-700 px-8 py-6 text-lg">
                Get Started Free
              </Button>
            </Link>
            <button className="flex items-center gap-2 text-gray-700">
              <PlayCircle className="h-12 w-12 text-blue-600" />
              <span>How it works</span>
            </button>
          </div>

          <div className="flex items-center gap-8 pt-8">
            <div className="text-center">
              <p className="text-4xl font-bold">4.8/5</p>
              <div className="flex items-center gap-1 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mt-1">User Rating</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold">98%</p>
              <p className="text-gray-600">Success Rate</p>
            </div>
          </div>
        </div>

        <div className="flex-1 relative">
          <div className="relative w-full h-[600px] rounded-2xl overflow-hidden">
            <Image
              src="/imgs/7855_11zon.jpg"
              alt="Learning Platform"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-sm p-4 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 relative rounded-full overflow-hidden">
                  <Image
                    src="/imgs/1.jpg"
                    alt="Teacher"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">Live Session</h3>
                  <p className="text-sm text-gray-600">English with Sarah</p>
                </div>
                <Button className="ml-auto" size="sm">
                  <Play className="h-4 w-4 mr-2" />
                  Join Now
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
