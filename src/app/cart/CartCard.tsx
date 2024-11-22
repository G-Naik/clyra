import { Card, CardActionArea } from "@mui/material";
import { removeFromCart } from "../store/slice/cart";
import { useAppDispatch } from "@/app/store/store";
import { useCallback } from "react";
import React from "react";

// Styles can be moved to a CSS file for better maintainability
const CardImageStyle = {
  height: "160px",
  minHeight: "120px",
  width: "100%",
};

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

interface CartCardProps {
  data: ProductItem[];
}

const CartCard: React.FC<CartCardProps> = ({ data }) => {
  const dispatch = useAppDispatch();

  const removeCartItem = useCallback(
    (itemId: number) => {
      dispatch(removeFromCart({ id: itemId }));
    },
    [dispatch]
  );

  return (
    <div className="px-2">
      {data.map(({ _id, image, title, description, price, id }) => (
        <div key={_id}>
          <Card className="my-4 flex items-start relative h-[160px] rounded-2xl border border-solid shadow-none">
            <div className="max-w-[240px]" style={CardImageStyle}>
              <img
                src={image}
                className="w-full h-full object-contain"
                alt={title}
                onError={(e) => {
                  e.currentTarget.src = "/path/to/placeholder-image.png"; // Placeholder image on error
                }}
              />
            </div>
            <CardActionArea className="bg-[#fcfcfd] max-h-full rounded-none">
              <div className="px-2 h-[160px] flex flex-col justify-between">
                <div className="pt-2">
                  <h1 className="text-[14px] font-black text-[#000042]">{title}</h1>
                  <p className="text-[12px] font-light text-[#66668E]">{description}</p>
                </div>
                <div>
                  <div className="h-1 border-b border-dotted border-[#66668E]"></div>
                  <div>
                    <h3 className="text-end text-[#000042] text-[14px] font-bold py-2">
                      ₹{Math.floor(price * 40)}
                    </h3>
                  </div>
                </div>
              </div>
              <div
                className="material-symbols-outlined absolute top-2 right-1 cursor-pointer"
                style={{ fontSize: "18px" }}
                onClick={() => removeCartItem(id)}
              >
                close
              </div>
            </CardActionArea>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default React.memo(CartCard); // Wrap with React.memo for optimization
