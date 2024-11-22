"use client";

import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

import Button from "./Button";

interface cardData {
    imageUrl : string,
    productHeading:string,
    gender:string,
    colors:string,
    price:number,
    gridActivate?:boolean
}

interface SliderCarData {
    sliderCard:cardData[]
}


const Cards = ({sliderCard}:SliderCarData) => {
  return (
    <div>
      <Card className="w-max max-w-full mx-2">
        <CardActionArea className="bg-[#efefefd8] max-w-fit h-fit-content relative">
          <div className="w-48 rounded-s-lg">
            <CardMedia
              component="img"
              className="w-full h-full object-cover"
              image={sliderCard[0].imageUrl}
              alt="green iguana"
            />
          </div>
          <CardContent className="py-2 px-2">
            <Typography
              gutterBottom
              variant="h2"
              component="div"
              className="text-lg font-regular text-[16px] py-0 m-0"
            >
              {sliderCard[0].productHeading}
            </Typography>
            <Typography component="p" className="text-[12px]" >{sliderCard[0].gender}</Typography>
            <Typography className="text-[12px]">{sliderCard[0].colors}</Typography>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              className="text-sm font-black pt-1"
            >
              {sliderCard[0].price}
            </Typography>
            <Button
            ClassName="z-1 material-symbols-outlined bg-[#001166] w-8 h-8 rounded-full absolute right-2 bottom-2 text-white">
              arrow_forward
            </Button>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};
export default Cards;
