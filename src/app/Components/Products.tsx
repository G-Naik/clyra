"use client"
import Button from "./Button"

interface ProductDataTypes {
  productid:string,
  name:string,
  description:string,
  category:string,
  price:number,
  currency:string,
  stock:number,
  images:string[],
  thumbnail:string,
  arrtributes:attributesTypes,
  sku:string,
  brand:string,
  ratings:number,
  status:string,
  tags:string[],
  saleprice:number,
  warranty:string,
}

interface attributesTypes {
  colors:string[],
  size:string[]
}


const dummyData =  {
  productid: "x0001",
  name: "Paralians",
  description:
    "Featuring a clean and solid pattern, this men’s shirt adds a touch of simplicity and sophistication to your wardrobe. Its minimalistic design makes it a versatile choice, pairing well with both casual and semi-formal outfits. Whether for a relaxed evening out or a low-key social event, the solid colour offers a timeless appeal, ensuring it remains a staple piece in your collection.",
  category: "Clothes",
  price: 999,
  curreny: "INR",
  stock: 10,
  images: [
    "https://rukminim2.flixcart.com/image/832/832/xif0q/shirt/j/g/t/s-1149-paralians-original-imah3fcvrgpw7cmp.jpeg?q=70&crop=false",
    "https://rukminim2.flixcart.com/image/832/832/xif0q/shirt/c/6/s/s-1149-paralians-original-imah3fcvnphhcfnu.jpeg?q=70&crop=false",
    "https://www.example.com/images/product1_back.jpg",
  ],
  thumbnail:
    "https://rukminim2.flixcart.com/image/832/832/xif0q/shirt/j/g/t/s-1149-paralians-original-imah3fcvrgpw7cmp.jpeg?q=70&crop=false",
  attributes: {
    color: ["black", "brown", "red", "blue"],
    size: ["s", "m", "l", "xl", "xxl"],
  },
  SKU: "Elec:0001",
  brand: "Paralians",
  ratings: 4.7,
  status: "active",
  tags: ["Bestsellers", "Trending", "New arrivals"],
  saleprice: 700,
  warranty: "1-year manufacturer warranty",
}

const Products = () => {
  return (
    <div className="relative">
    <div className="relative p-4">
        <div className="max-w-full h-[80%]">
            <img 
            className="w-full h-full object-fit rounded-2xl"
            src={dummyData.thumbnail} alt="" />
        </div>
        <div className="flex gap-4 py-4 overflow-auto scrollbar">
            {
              dummyData.attributes.size.map((item,index) => (
                <div key={index}>
                    <div className="border-[1px] border-solid px-6 py-2 rounded-2xl uppercase">
                        {item}
                    </div>
                </div>
              ))
            }
        </div>
        <div className="text-2xl font-black py-2">
          ₹{dummyData.saleprice}<span className="text-lg pl-2 text-slate-400 line-through">{dummyData.price}</span>
        </div>
        <div>
            <h2 className="text-2xl">{dummyData.name}</h2>
        </div>
        <div>
          <p>{dummyData.description}</p>
        </div>
    </div>
    <div className="bg-[#e2e0e0f0] rounded-t-2xl h-20 sticky bottom-0 w-full flex items-center px-4">
          <Button
          ClassName="w-full text-lg bg-blue-800 text-white py-2 rounded-xl"
          >
            Add to cart 
          </Button>
    </div>
    </div>
  )
}
export default Products