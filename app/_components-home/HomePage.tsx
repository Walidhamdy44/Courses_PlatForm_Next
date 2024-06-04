import Image from "next/image";
import SmallIcon from "./SmallIcon";

const HomePage = () => {
  return (
    <div
      className="container-home flex items-center gap-3 container mt-[80px] relative pb-[50px]"
      style={{
        background:
          "linear-gradient(to bottom,rgba(99, 230, 12, 0.116), rgba(78, 217, 127, 0.275), rgba(99, 230, 12, 0.012)",
      }}
    >
      <div className="flex items-start gap-4 flex-col basis-[60%] mt-[40px] ">
        <h1 className="max-sm:text-[50px] md:text-[66px] font-extrabold fontty relative">
          Let&apos;s Lea<span className=" text-green-400">r</span>n beyond the
          limits
          <Image
            src="/imgs/Screenshot__10_-removebg-preview.png"
            alt="ks"
            width={300}
            height={20}
            className="absolute object-contain bottom-[-14px] max-sm:right-[50px] left-[90px] "
          />
        </h1>
        <div className="pt-[30px] relative text-center flex items-center justify-center w-full">
          <div className="img-border">
            <div className="absolute top-[45%] left-[50%]">
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
      </div>
      <div className="flex items-start gap-4 flex-col basis-[35%]"></div>
    </div>
  );
};

export default HomePage;
