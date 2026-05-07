import Image from "next/image";

const mentors = [
  {
    name: "Cristian M. Durant",
    role: "Editing Expert",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB03ZO365ZidrlAS6H7DbYhxQ-RJDC-fWdJOjUf1ZElDFWXH-r3RVesthMgiMYLv4sov5rq1ajfdZdvFarAI2SULnzzmlx66UmU3QlDwXrchuznZVgDwLEMywQkq9gpU41LAxWaVD2fYb08EGqlsi6kKBYsImkZN_aYi5O9Jf7IPsmBJ1X_84hxf6VwKiJttbvAk421Qpm4gd3tdACNnjggij3SXkN3kG0-9x1RIH8-fr3_e_BxuaxPLXarHu-LQwePptkSVNHSfhqg",
  },
  {
    name: "Nicolas R. Billington",
    role: "Designer",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCawnN2tgqqnt0GKu_KnWbt_L6V7yCl4_t891jxzBoNElc2Xb2eqbE4iuMxi967ARZWzJPlp0JS1daHzGknIBjSUXjcXpi18lXVKUr1TQpbIMCrXySiUieucuoCO92UScdLsQJtzCyTql_kaWjm1s4iUNmnD986-oR7_TAI-DIXKmo1uozeAFo7uGCwSkZ0B0D-EW56sbvE7r6E4Bbh42bprgkyAGCh67Xw93vckdcJZOEljSrZp1goTsvqijg5-rdMsF88B6Mm17ST",
  },
  {
    name: "Leonardo F. Ashton",
    role: "Copywriting",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCvHWci-pJ87RuuSBZd9UgOajzuCCKYv6vE6LLZs06nzdiYmHvmwWgLrfEemDhi5yAtb6FNAjXeTlM-6yOqVk1Nm5e-0T0MS7lq-uv1aladtuCWWZ1_SqnPB7aMfon_6rgme6APz04XYBpVEbcwABOnsaaD_gFd7UmgOrio2UPzZluOXnOkHAy0DJBMW9gQ6yhKbmryfkQNJJOGsY_kY0G0SmMEX7buYNGer4Val-BfgGKXZg5-_d5Q1cyawUUtR2i8CzSneqYsn6dc",
  },
];

export default function TestimonialsSection() {
  return (
    <section id="mentors" className="py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-900">
          Meet With World class
          <br />
          &amp; expert mentors
        </h2>
        <p className="text-gray-500 mt-4 max-w-xl mx-auto">
          Meet the Experts Guidance Your Learning Journey
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {mentors.map((mentor) => (
            <div
              key={mentor.name}
              className="group relative rounded-2xl overflow-hidden aspect-[3/4]"
            >
              <Image
                src={mentor.image}
                alt={mentor.name}
                width={400}
                height={533}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6 text-left">
                <span className="bg-indigo-900 text-white text-[10px] font-bold uppercase w-fit px-2 py-1 rounded mb-2">
                  {mentor.role}
                </span>
                <h4 className="text-white font-bold text-lg">{mentor.name}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
