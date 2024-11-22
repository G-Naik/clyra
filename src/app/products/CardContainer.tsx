
import { Card, CardActionArea, CardMedia } from "@mui/material";
import { useRouter } from "next/navigation";
import Loaders from "../Components/Loaders";
import { addItem , removeItem} from "../store/slice/wishlistslice";
import { useAppDispatch} from "../store/store";
import { useState } from "react";


const cardHeight = {
  minHeight: "240px",
  width: "100%",
  height: "100%",
  verticalAlign: "Bottom",
  objectFit:"fit"
};

interface productsData {
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

interface Data {
  props: productsData[]  ; // Optional type for props
}

const CardContainer = (props: any) => {


  const router = useRouter()

  const pushProducts = (item:string) => {
    router.push(`/products/${item}`)
  }

  return (
    <div className="md:grid md:grid-cols-3 gap-2 md:px-10 px-4 sm:grid-cols-2">
      {props.item && props.item.length > 0 ? ( // Check if props exists and has data
        props.item.map((item:productsData, index:number) => (
          <div className="py-4" key={index} onClick={() => pushProducts(item?._id)}>
            <Card className="shadow-xl md:shadow-md rounded-lg md:max-w-[300px] "
            >
              <CardActionArea>
                <div className="h-[270px]">
                  {/* <CardMedia sx={cardHeight} image={item.image}
                  className="object-fill"
                  /> */}
                  <img src={item.image} alt="" className="object-fill w-full h-full center-center " />
                </div>
                {/* Heading of product card */}
                <section className="px-4 pt-4 pb-2 bg-[#f9f9fc]">
                  <div className="flex justify-between gap-2">
                    <div>
                      <h1 className="text-[12px] font-black text-[#000042] h-14 ">
                        {item.title}
                      </h1>
                    </div>
                    <div>
                      <h1 className="text-[14px] font-black text-[#000042]">
                        ₹{Math.floor(item.price * 40)}
                      </h1>
                    </div>
                  </div>
                  {/* Dotted Line */}
                  <div
                    className="py-1"
                    style={{ borderBottom: "dotted 1px #66668E" }}
                  ></div>
                  <div>
                    <div className="text-[14px] font-semibold text-[#2261D1] text-end pt-2">
                      <h3 className="font-black">Get it for ₹{Math.floor(item.price * 40)}</h3>
                    </div>
                  </div>
                </section>
                <div
                className="absolute top-2 right-2">
                <svg xmlns="http://www.w3.org/2000/svg" strokeWidth="1" stroke="black" viewBox="0 0 24 24" fill="white" width="24px" height="24px">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                </div>
              </CardActionArea>
            </Card>
          </div>
        ))
      ) : (
        <div className="w-full flex justify-center items-center "><Loaders></Loaders></div> // Fallback if no products are passed
      )}
    </div>
  );
};

export default CardContainer;
