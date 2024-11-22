"use client";
import { useCallback, useEffect, useState } from "react";
import CardContainer from "./CardContainer";
import Tabs from "./Tabs";

interface productsData {
  _id: string;
  price: number;
  id: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
  name: string;
}

interface Rating {
  rate: number;
  count: number;
}

const TabsData = [
  { name: "All", icon: "widgets", url: "/" },
  { name: "Clothes", icon: "apparel", url: "/" },
  { name: "Shoes", icon: "steps", url: "/" },
];

const Page = () => {
  const [data, updateData] = useState<productsData[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<string | null>(null);
  const [showFilter, updateFilter] = useState(false);


  const getProductsData = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:3000/api/products");
      const products: productsData[] = await response.json();
      updateData(products);
    } catch (err) {
      console.error(err);
    }
  },[]);

  useEffect(() => {
    getProductsData();
  }, [getProductsData]);

  // Create a unique list of categories
  const categories = Array.from(new Set(data.map((item) => item.category)));

  // Function to handle checkbox change for category filter
  const handleCheckboxChange = (category: string) => {
    setFilteredCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  // Function to handle sorting order change with checkbox logic
  const handleSortChange = (order: string) => {
    setSortOrder(sortOrder === order ? null : order);
  };

  // Filter and sort products based on selected categories and sort order
  const filteredData =
    filteredCategories.length > 0
      ? data.filter((item) => filteredCategories.includes(item.category))
      : data;

  const sortedData =
    sortOrder === "asc"
      ? [...filteredData].sort((a, b) => a.price - b.price)
      : sortOrder === "desc"
      ? [...filteredData].sort((a, b) => b.price - a.price)
      : filteredData;

  // Filter section component for desktop and mobile
  const FilterSection = ({ show, close }: { show: boolean; close: () => void }) => (
    <div
      className={`${
        show ? "fixed inset-x-0 bottom-16 translate-y-0" : "fixed translate-y-full"
      } md:ml-10 md:mt-4 md:static bottom-0 md:translate-y-0 transition-transform duration-300 ease-in-out bg-white p-4 shadow-lg rounded-t-lg z-50 md:z-auto md:w-72 md:top-4`}
    >
      <div className="flex justify-between items-center mb-4 md:hidden">
        <h1 className="text-lg font-semibold">Filter</h1>
        <button onClick={close} className="text-sm text-red-500 material-symbols-outlined">
          close
        </button>
      </div>
      <h1 className="text-[16px] font-semibold mb-2">Category</h1>
      <div className="flex flex-col px-2 py-2 space-y-2">
        {categories.map((item, index) => (
          <div key={index} className="px-2">
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                id={`checkbox-${item}`}
                checked={filteredCategories.includes(item)}
                onChange={() => handleCheckboxChange(item)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor={`checkbox-${item}`}
                className="text-sm first-letter:capitalize cursor-pointer"
              >
                {item}
              </label>
            </div>
          </div>
        ))}
      </div>
      <section>
        <h1 className="text-[16px] font-semibold mt-4 mb-2">Sort</h1>
        <section className="px-2 space-y-2">
          {["desc", "asc"].map((order) => (
            <div key={order} className="flex items-center gap-2">
              <input
                type="checkbox"
                id={`sort-${order}`}
                checked={sortOrder === order}
                onChange={() => handleSortChange(order)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor={`sort-${order}`}
                className="text-sm cursor-pointer"
              >
                {order === "asc" ? "Low to High" : "High to Low"}
              </label>
            </div>
          ))}
        </section>
      </section>
    </div>
  );

  return (
    <>
      {/* Filter button only visible on mobile */}
     <section className="md:hidden block">
     <div
        onClick={() => updateFilter(!showFilter)}
        className="material-symbols-outlined p-2 rounded-lg bg-[#000042] w-10 h-10 text-white fixed bottom-20 right-4"
        style={{ zIndex: 1000 }}
      >
        filter_alt
      </div>
     </section>
     
      <div className="flex flex-col md:flex-row justify-around md:gap-4">
        {/* Render FilterSection only for desktop */}
        <section className="hidden md:block">
          <FilterSection show={true} close={() => {}} />
        </section>

        {/* Render FilterSection only for mobile */}
        {showFilter && (
          <FilterSection show={showFilter} close={() => updateFilter(false)} />
        )}

        {/* Product display section */}
        <section className="w-full">
          <div className="sticky md:hidden block top-3 bg-[#FFF] z-10">
            <Tabs props={TabsData} />
          </div>
          <CardContainer item={sortedData} />
        </section>
      </div>
    </>
  );
};

export default Page;
