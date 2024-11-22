"use client";

import { useEffect, useState } from "react";
import { useAppDispatch } from "@/app/store/store";
import { useRouter } from "next/navigation";
import { addtoCart } from "@/app/store/slice/cart";
import Loaders from "@/app/Components/Loaders";

interface ProductParams {
  params: {
    detail: string;
  };
}

interface ProductItem {
  _id: string;
  price: number;
  id: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
  title: string;
}

interface Rating {
  rate: number;
  count: number;
}

// Fetch item data
const getItemData = async (id: string) => {
  try {
    const response = await fetch(`http://localhost:4000/products/:id/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch");
    }
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const ProductDetail = ({ params }: ProductParams) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // State for single product data
  const [singlePostData, setSinglePostData] = useState<ProductItem | null>(null);

  // Destructure product detail from params
  const { detail } = params;

  // Handle add to cart
  const addProductToCart = () => {
    if (singlePostData) {
      dispatch(addtoCart(singlePostData));
      router.push("/cart");
    }
  };

  // Fetch product details on component mount
  useEffect(() => {
    getItemData(detail).then(setSinglePostData);
  }, [params]);

  // Conditional rendering for product data
  if (!singlePostData) {
    return <div className="w-full h-screen flex justify-center items-center"><Loaders></Loaders></div>;
  }

  return (
    <section className="sm:py-2">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-16 lg:mt-12 mt-8">
          {/* Product Image */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-center overflow-hidden rounded-lg max-w-[300px] mx-auto lg:max-w-[360px]">
              <img
                className="object-fit w-full h-[300px] lg:h-[400px] rounded-lg"
                src={singlePostData.image}
                alt={singlePostData.title}
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="lg:col-span-2 lg:row-span-2">
            <h1 className="text-3xl font-bold text-gray-900">{singlePostData.title}</h1>

            {/* Ratings Section */}
            <div className="mt-5 flex items-center">
              <div className="flex">
                {[...Array(Math.round(singlePostData.rating.rate))].map((_, index) => (
                  <svg
                    key={index}
                    className="h-4 w-4 text-yellow-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
              <p className="ml-2 text-sm font-medium text-gray-500">
                {singlePostData.rating.count} Reviews
              </p>
            </div>

            {/* Subscription Options */}
            <h2 className="mt-8 text-base text-gray-900">Choose Subscription</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {["4 Months", "8 Months", "12 Months"].map((duration, idx) => (
                <label key={idx} className="cursor-pointer">
                  <input type="radio" name="subscription" value={duration} className="peer sr-only" />
                  <p className="peer-checked:bg-black peer-checked:text-white border rounded-lg px-6 py-2 font-bold">
                    {duration}
                  </p>
                  <span className="block text-xs mt-1 text-center">{
                    idx === 0 ? '2000/mo' : idx === 1 ? '1600/mo' : '1200/mo'
                  }</span>
                </label>
              ))}
            </div>

            {/* Price and Add to Cart */}
            <div className="mt-10 flex items-center justify-between py-4 border-t border-b">
              <h1 className="text-3xl font-bold">Rs {Math.floor(singlePostData.price * 40)}</h1>
              <button
                onClick={addProductToCart}
                className="bg-slate-900 text-white px-8 py-2 rounded-md flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                Add to Cart
              </button>
            </div>

            {/* Additional Information */}
            <ul className="mt-8 space-y-2">
              <li className="flex items-center text-sm text-gray-600">
                <svg
                  className="mr-2 h-5 w-5 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                Free shipping worldwide
              </li>
              <li className="flex items-center text-sm text-gray-600">
                <svg
                  className="mr-2 h-5 w-5 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  ></path>
                </svg>
                Cancel Anytime
              </li>
            </ul>
          </div>

          {/* Description Section */}
          <div className="lg:col-span-3 mt-8 lg:mt-0">
            <div className="border-b">
              <nav className="flex gap-4">
                <a
                  href="#"
                  className="px-4 py-3 text-sm font-medium text-gray-700 border-b-2 border-black"
                >
                  Description
                </a>
              </nav>
            </div>
            <div className="mt-8 text-sm text-gray-700 space-y-4">
              <p>{singlePostData.description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
