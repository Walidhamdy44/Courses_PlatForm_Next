import { Book, Users, Video, MessageCircle, Globe, Trophy } from "lucide-react";

const features = [
  {
    icon: <Video className="h-8 w-8 text-blue-600" />,
    title: "Live Online Classes",
    description: "Interactive sessions with native speakers in real-time",
  },
  {
    icon: <Book className="h-8 w-8 text-blue-600" />,
    title: "Structured Curriculum",
    description: "Well-designed courses for all proficiency levels",
  },
  {
    icon: <Users className="h-8 w-8 text-blue-600" />,
    title: "Group Practice",
    description: "Practice with other learners in small groups",
  },
  {
    icon: <MessageCircle className="h-8 w-8 text-blue-600" />,
    title: "1-on-1 Tutoring",
    description: "Personalized attention from experienced teachers",
  },
  {
    icon: <Globe className="h-8 w-8 text-blue-600" />,
    title: "Cultural Exchange",
    description: "Learn about different cultures and traditions",
  },
  {
    icon: <Trophy className="h-8 w-8 text-blue-600" />,
    title: "Progress Tracking",
    description: "Monitor your learning journey with detailed analytics",
  },
];

const HomeSection2 = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-4">Why Choose Our Platform</h2>
          <p className="text-gray-600">
            Discover the features that make our language learning platform
            unique and effective
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="bg-blue-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeSection2;
