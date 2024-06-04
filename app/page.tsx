import HomePage from "./_components-home/HomePage";
import NavBarHome from "./_components-home/NavBarHome";

const Home = () => {
  return (
    <div className="flex items-start flex-col w-full h-full">
      <div>
        <NavBarHome />
      </div>
      <div className="w-full min-h-[100vh]">
        <HomePage />
      </div>
    </div>
  );
};

export default Home;
