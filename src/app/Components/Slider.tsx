"use client"
import Link from "next/link";

import { useRef, useState } from "react";

interface CarouselStructure {
  imageUrl: string,
  webUrl: string,
  title: string,
  id: string,
  ratio: string,
  active: boolean,
  imgWeb:string,
}

interface SliderProps {
  sliderContent: CarouselStructure[];
}

const Slider = ({ sliderContent }: SliderProps) => {
  
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (sliderRef.current) {
      const scrollPosition = sliderRef.current.scrollLeft;
      const width = sliderRef.current.offsetWidth;
      const newIndex = Math.round(scrollPosition / width);
      setActiveIndex(newIndex);
    }
  };

  const handleTouchStart = (event: React.TouchEvent) => {
    const touchStartX = event.touches[0].clientX;
    const handleTouchMove = (moveEvent: TouchEvent) => {
      const touchEndX = moveEvent.touches[0].clientX;
      const touchDelta = touchStartX - touchEndX;

      if (Math.abs(touchDelta) > 50) {
        if (touchDelta > 0) {
          scrollNext();
        } else {
          scrollPrev();
        }
        window.removeEventListener("touchmove", handleTouchMove);
      }
    };
    window.addEventListener("touchmove", handleTouchMove);
  };

  const scrollNext = () => {
    if (sliderRef.current) {
      const newIndex = Math.min(activeIndex + 1, sliderContent.length - 1);
      setActiveIndex(newIndex);
      sliderRef.current.scrollTo({
        left: sliderRef.current.offsetWidth * newIndex,
        behavior: "smooth"
      });
    }
  };

  const scrollPrev = () => {
    if (sliderRef.current) {
      const newIndex = Math.max(activeIndex - 1, 0);
      setActiveIndex(newIndex);
      sliderRef.current.scrollTo({
        left: sliderRef.current.offsetWidth * newIndex,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="py-4">
      <div
        className="flex overflow-auto scrollbar"
        ref={sliderRef}
        onScroll={handleScroll}
        onTouchStart={handleTouchStart}
      >
       {sliderContent.map((item) => (
          <div className="min-w-full px-3" key={item.id}>
            <div className="aspect-w-16 aspect-h-9 md:h-[270px] overflow-hidden">
              <div className="md:hidden block">
                <Link href={item.webUrl}>
                <img className="w-full h-full object-cover" src={item.imageUrl} alt={item.title} />
                </Link>
              </div>
              <div className="hidden md:block">
                <Link href={item.webUrl}>
                  <img src={item.imgWeb} alt="" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 flex bg-[#D9D9D9] w-[75px] m-auto rounded-full">
        {sliderContent.map((_, index) => (
          <div
            className={`${index === activeIndex ? "bg-black" : "bg-inherit"} flex-1 h-1 rounded-full`}
            key={index}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default Slider;
