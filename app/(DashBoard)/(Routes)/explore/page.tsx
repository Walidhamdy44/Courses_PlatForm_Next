import { db } from "@/lib/db";
import Categories from "./_components/Categories";
import SearchNavBar from "../../_components/SearchNavBar";

const ExplorePage = async () => {
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
  return (
    <div className="p-6">
      <div className="w-[95%] block md:hidden mb-[30px]">
        <SearchNavBar />
      </div>
      <Categories items={categories} />
    </div>
  );
};

export default ExplorePage;
