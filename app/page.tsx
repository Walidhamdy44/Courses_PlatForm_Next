import HomePage from "./_components-home/HomePage";
import NavBarHome from "./_components-home/NavBarHome";

const Home = () => {
  return (
    <div className="flex items-start flex-col">
      <div>
        <NavBarHome />
      </div>
      <div>
        <HomePage />
      </div>
    </div>
  );
};

export default Home;
