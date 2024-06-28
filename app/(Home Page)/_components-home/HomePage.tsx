import Image from "next/image";
import SmallIcon from "./SmallIcon";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const LandingPage = () => {
  return (
    <div
      className="container-home flex items-center justify-between gap-3 container mt-[80px] relative pb-[50px]"
      style={{
        background:
          "linear-gradient(to bottom,rgba(99, 230, 12, 0.116), rgba(78, 217, 127, 0.275), rgba(99, 230, 12, 0.012)",
      }}
    >
      <Image
        src="/imgs/f.svg"
        alt="jjs"
        width={80}
        height={50}
        className="absolute max-sm:top-[202px] max-sm:right-[120px] md:top-[130px] md:right-[50%]"
      />
      <Image
        src="/imgs/e.svg"
        alt="jjs"
        width={80}
        height={50}
        className="absolute max-sm:top-[1024px] max-sm:right-[200px] md:top-[400px] md:right-[16%]"
      />
      <div className="flex items-start gap-4 flex-col basis-[60%] mt-[40px] ">
        <h1 className="max-sm:text-[50px] md:text-[66px] font-extrabold fontty relative">
          Let&apos;s Lea<span className=" text-green-400">r</span>n beyond the
          limits
          <Image
            src="/imgs/Screenshot__10_-removebg-preview.png"
            alt="ks"
            width={300}
            height={20}
            className="absolute object-contain bottom-[-14px] max-sm:left-[-20px] left-[90px] "
          />
        </h1>
        <div className="py-[30px] relative text-center flex items-center justify-center w-full">
          <div className="img-border">
            <div className="absolute top-[45%] left-[45%]">
              <SmallIcon />
            </div>
            <Image
              src="/imgs/7855_11zon.jpg"
              alt="new"
              width={500}
              height={300}
              className="relative  h-[320px] rounded-3xl border-[5px] border-opacity-50 border-green-400 max-sm:ml-3"
            />
          </div>
          <Image
            src="/imgs/arrow-hand-drawn-curly-shape_78370-6119-removebg-preview.png"
            alt="ks"
            width={300}
            height={20}
            className="imgg absolute object-contain  md:bottom-[30px] md:right-[-100px] -z-10"
          />
        </div>
        <div className="max-sm:mt-[120px] md:mt-[20px]">
          <div className="w-full h-[3px] bg-black rounded-xl"></div>
          <div className="flex items-center justify-between gap-4 pl-[20px] py-[20px]">
            <h2 className="max-sm:text-[25px] max-sm:pt-[30px] md:text-[30px] font-extrabold fontty max-sm:w-full md:w-[50%]">
              A Vibrant Platform to Bost You..🤍
            </h2>
            <div className="flex flex-col items-start gap-2">
              <p className="max-sm:text-[30px] md:text-[50px] font-extrabold fontty flex items-center">
                51k <Plus className="text-green-700 size-[43px]" />
              </p>
              <p className="font-bold">Students</p>
            </div>
            <div className="flex items-center gap-2"></div>
          </div>
        </div>
      </div>
      <div className="flex items-start gap-4 flex-col basis-[35%] max-sm:mt-[140px] md:mt-[-40px] relative">
        <div className="flex items-center">
          <div className="relative right-[-20px] home-img1">
            <Image
              src="/imgs/5.jpg"
              alt="ung-female-teacher-wearing-glasses-sits-table-with-school-suppli"
              width={200}
              height={200}
              className="w-[170px] h-[170px] border-[3px] border-orange-400 z-50"
              style={{ borderRadius: "50%" }}
            />
          </div>
          <div className="relative home-img2">
            <Image
              src="/imgs/2148888824_11zon.jpg"
              alt="ung-female-teacher-wearing-glasses-sits-table-with-school-suppli"
              width={200}
              height={200}
              className="w-[170px] h-[170px] border-[3px] border-gray-500"
              style={{ borderRadius: "50%" }}
            />
          </div>
        </div>
        <div className="flex items-start flex-col gap-4 pt-[30px] md:pl-[30px]">
          <div>
            <h3 className="fontty text-[32px] font-extrabold">Our Story</h3>
            <p className="text-gray-500 w-[80%]">
              Discover the journey and experiences that shape our platform. We
              will Help You Along the way .
            </p>
          </div>
          <div>
            <Link href="/dashboard">
              <Button variant="default">Become a Member !</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
