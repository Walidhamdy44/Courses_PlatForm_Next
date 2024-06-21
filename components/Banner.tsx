import { cn } from "@/lib/utils";
interface Banner {
  message: string;
  color?: string;
}
const Banner = ({ message, color }: Banner) => {
  return (
    <div
      className={cn(
        `w-full bg-yellow-300 text-center text-[23px] font-extrabold text-white h-[70px] flex items-center justify-center transition-all`,
        color
      )}
    >
      {message}
    </div>
  );
};

export default Banner;
