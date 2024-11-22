"use client";
import Button from "../Components/Button";
import CartCard from "./CartCard";
import { useAppSelector } from "../store/store";
import Link from "next/link";
import { useEffect, useMemo } from "react";

const Page = () => {
  const displayProducts = useAppSelector((state) => state.cart.cartItem);

  // Use useMemo to memoize the total price calculation
  const totalPrice = useMemo(() => {
    return displayProducts.reduce((acc, item) => acc + item.price, 0);
  }, [displayProducts]);

  useEffect(() => {
    console.log(displayProducts);
  }, [displayProducts]);

  return (
    <>
     <div className="h-[48px] w-full bg-white text-[16px] font-black text-[#000042] pl-4 py-2 mb-2 shadow-md">
          <div className="flex">
          <Link href="/">
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <div className="md:pl-[128px] pl-[8px]">
              Clyra
          </div>
          </div>
      </div>
      {displayProducts.length <= 0 ? (
        <div className="w-full h-[500px] flex justify-center items-center flex-col">
          <h2 className="text-md font-black">No Products</h2>
          <Link href="/" className="bg-blue-200 px-4 py-2 rounded-2xl">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div>
          <section className="md:flex justify-center gap-4 bg-white">
            <div className="md:w-[500px]">
              <h1 className="text-[16px] font-extrabold py-2 px-2">Cart Item ({displayProducts.length})</h1>
              <CartCard data={displayProducts} />
            </div>
            <section className="h-screen border-b-[80px] md:border-b-0">
              <h1 className="text-[16px] font-extrabold py-2 px-2">Bill & Details</h1>
              <div className="px-2">
                <div className="px-2 py-2 shadow-md rounded-2xl border border-solid">
                  {displayProducts.map((item, index) => (
                    <div key={item._id} className="rounded-2xl">
                      <section className="flex w-full justify-between">
                        <div className="px-2">
                          <p className="text-[12px] text-[#66668E]">Item {index + 1}</p>
                        </div>
                        <div className="text-[12px]">
                          ₹{Math.floor(item.price * 40)}
                        </div>
                      </section>
                    </div>
                  ))}
                  <div className="h-4" style={{ borderBottom: "1px dotted #66668E" }}></div>
                  <div className="text-[12px] py-2 flex w-full justify-between">
                    <h2 className="text-[12px] font-black">Total Payable</h2>
                    <h2>₹{Math.floor(totalPrice * 40)}</h2>
                  </div>
                </div>
                <div className="flex justify-center mt-4">
                    <Link href="/checkout">
                      <Button ClassName="w-full hidden md:block text-lg bg-[#000042] text-white py-2 rounded-xl px-12">
                        Proceed to Checkout
                      </Button>
                    </Link>
                  </div>
              </div>
            </section>
          </section>
          <div className="bg-[#f6f6f6] md:hidden rounded-t-2xl h-20 fixed bottom-0 w-full flex items-center px-4">
            <div className="flex justify-between w-full">
              <div>
                <h3 className="text-[16px] font-black ">₹{Math.floor(totalPrice * 40)}</h3>
                <p className="text-[12px]">Total Bill</p>
              </div>
              <div className="w-[160px]">
                <Link href="/checkout">
                  <Button ClassName="w-full text-lg bg-[#000042] text-white py-2 rounded-xl">
                    Checkout
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
