import DiscoutSec from "./_components-home/DiscoutSec";
import HomeSection2 from "./_components-home/HomeSection2";
import LandingPage from "./_components-home/LandingPage";
import NavBarHome from "./_components-home/NavBarHome";
import TestimonialsSec from "./_components-home/TestemonilsSec";

const Home = () => {
  return (
    <div className="flex items-start flex-col w-full h-full">
      <div className="w-full">
        <NavBarHome />
      </div>
      <div className="w-full">
        <LandingPage />
      </div>
      <div className="w-full">
        <HomeSection2 />
      </div>
      <div className="w-full">
        <TestimonialsSec />
      </div>
      <div className="p-4 m-auto">
        <DiscoutSec />
      </div>
    </div>
  );
};

export default Home;
