import HomeSection2 from "./_components-home/HomeSection2";
import LandingPage from "./_components-home/LandingPage";
import NavBarHome from "./_components-home/NavBarHome";

const Home = () => {
  return (
    <div className="flex items-start flex-col w-full h-full">
      <div>
        <NavBarHome />
      </div>
      <div className="w-full">
        <LandingPage />
      </div>
      <div>
        <HomeSection2 />
      </div>
    </div>
  );
};

export default Home;
