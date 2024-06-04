import Image from "next/image";
import { Star } from "lucide-react";

const TestimonialsSec = () => {
  return (
    <div
      style={{
        background:
          "linear-gradient(to bottom,rgba(99, 230, 12, 0),rgba(78, 217, 127, 0.62), rgba(78, 217, 127, 0.47), rgba(99, 230, 12, 0.012)",
      }}
    >
      <section className="">
        <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <h2 className="text-center text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Read trusted reviews from our customers
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8">
            <blockquote className="rounded-lg bg-gray-50 p-6 shadow-sm sm:p-8">
              <div className="flex items-center gap-4">
                <Image
                  alt="Customer 1"
                  src="/imgs/1.jpg"
                  width={56}
                  height={56}
                  className="rounded-full object-cover"
                />

                <div>
                  <div className="flex justify-center gap-0.5 text-green-500">
                    {[...Array(5)].map((_, index) => (
                      <Star key={index} className="h-5 w-5" />
                    ))}
                  </div>

                  <p className="mt-0.5 text-lg font-medium text-gray-900">
                    Walid Hamdy
                  </p>
                </div>
              </div>

              <p className="mt-4 text-gray-700">
                “This company provided excellent service and the product quality
                is outstanding. I couldn&apos;t be happier with my purchase.”
              </p>
            </blockquote>

            <blockquote className="rounded-lg bg-gray-50 p-6 shadow-sm sm:p-8">
              <div className="flex items-center gap-4">
                <Image
                  alt="Customer 2"
                  src="/imgs/3.png"
                  width={56}
                  height={56}
                  className="rounded-full object-cover"
                />

                <div>
                  <div className="flex justify-center gap-0.5 text-green-500">
                    {[...Array(5)].map((_, index) => (
                      <Star key={index} className="h-5 w-5" />
                    ))}
                  </div>

                  <p className="mt-0.5 text-lg font-medium text-gray-900">
                    Anne Smith
                  </p>
                </div>
              </div>

              <p className="mt-4 text-gray-700">
                “I am thoroughly impressed with the quality and speed of
                service. Highly recommend this company to anyone in need of
                their products.”
              </p>
            </blockquote>

            <blockquote className="rounded-lg bg-gray-50 p-6 shadow-sm sm:p-8">
              <div className="flex items-center gap-4">
                <Image
                  alt="Customer 3"
                  src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
                  width={56}
                  height={56}
                  className="rounded-full object-cover"
                />

                <div>
                  <div className="flex justify-center gap-0.5 text-green-500">
                    {[...Array(5)].map((_, index) => (
                      <Star key={index} className="h-5 w-5" />
                    ))}
                  </div>

                  <p className="mt-0.5 text-lg font-medium text-gray-900">
                    Mohamed Salah
                  </p>
                </div>
              </div>

              <p className="mt-4 text-gray-700">
                “Exceptional experience! The customer service was top-notch and
                the product exceeded my expectations.”
              </p>
            </blockquote>
            <blockquote className="rounded-lg bg-gray-50 p-6 shadow-sm sm:p-8">
              <div className="flex items-center gap-4">
                <Image
                  alt="Customer 3"
                  src="/imgs/3.png"
                  width={56}
                  height={56}
                  className="rounded-full object-cover"
                />

                <div>
                  <div className="flex justify-center gap-0.5 text-green-500">
                    {[...Array(5)].map((_, index) => (
                      <Star key={index} className="h-5 w-5" />
                    ))}
                  </div>

                  <p className="mt-0.5 text-lg font-medium text-gray-900">
                    Osama Ahmed
                  </p>
                </div>
              </div>

              <p className="mt-4 text-gray-700">
                “Exceptional experience! The customer service was top-notch and
                the product exceeded my expectations.”
              </p>
            </blockquote>
            <blockquote className="rounded-lg bg-gray-50 p-6 shadow-sm sm:p-8">
              <div className="flex items-center gap-4">
                <Image
                  alt="Customer 3"
                  src="/imgs/1.jpg"
                  width={56}
                  height={56}
                  className="rounded-full object-cover"
                />

                <div>
                  <div className="flex justify-center gap-0.5 text-green-500">
                    {[...Array(3)].map((_, index) => (
                      <Star key={index} className="h-5 w-5" />
                    ))}
                  </div>

                  <p className="mt-0.5 text-lg font-medium text-gray-900">
                    Maria Leo
                  </p>
                </div>
              </div>

              <p className="mt-4 text-gray-700">
                “Exceptional experience! The customer service was top-notch and
                the product exceeded my expectations.”
              </p>
            </blockquote>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TestimonialsSec;
