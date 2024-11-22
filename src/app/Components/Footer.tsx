"use client";

import Link from "next/link";
import Button from "./Button";
import { useState , useEffect } from "react";
import { usePathname } from "next/navigation";

interface FooterLinks {
  title: string;
  additionalLinks: footerAdditionalLinks[];
}

interface footerAdditionalLinks {
  name: string;
  url: string;
}

const Footer = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [setPath , updatePath ] = useState<string | undefined>()

  const pathName = usePathname()

  const paths = ["cart", "search", "wishlist","profile","login","signup"]; // List of paths

  useEffect(() => {
      
      // Find the matching path
      const matchingPath = paths.find((item) => `/${item}` === pathName);
      updatePath(matchingPath); // Save the matching path or undefined

  }, [pathName]);


  const footerLinks: FooterLinks[] = [
    {
      title: "Help",
      additionalLinks: [
        { name: "Contact us", url: "/" },
        { name: "Payments", url: "/" },
        { name: "FAQ", url: "/" },
        { name: "Shipments", url: "/" },
        { name: "Track your order", url: "/" },
        { name: "Return your order", url: "/" },
        { name: "Shipments", url: "/" },
      ],
    },
    {
      title: "Legal Info",
      additionalLinks: [
        { name: "Privacy Policy", url: "/" },
        { name: "Terms & Conditions", url: "/" },
        { name: "Return Policy", url: "/" },
        { name: "Cookie Policy", url: "/" },
      ],
    },
    {
      title: "Follow us",
      additionalLinks: [
        { name: "Instagram", url: "/" },
        { name: "Facebook", url: "/" },
        { name: "Twitter", url: "/" },
      ],
    },
  ];

  const handleFooterDropDown = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (  
    <>
    {pathName !== `/${setPath}` &&
    
    <div className="bg-[#ffffff] h-[240px] pt-10 ">
      {/* Logo */}
      <div className="flex flex-col md:flex-row justify-evenly md:h-[240px] py-2">
        <div className="italic px-4">
          <h1 className="md:text-[24px] text-[20px] font-black md:w-[150px] ">
            JOIN THE CLYRA MOVEMENT
          </h1>
          <p className="text-[14px] font-black">Finest Product</p>
        </div>
        <div className="flex flex-col md:flex-row md:justify-evenly md:gap-40">
          {footerLinks.map((item, index) => (
            <div key={index}>
              <section className="flex justify-between px-4 py-2">
                <h1 className="text-[18px] font-black">{item.title}</h1>
                <section className="md:hidden block">
                  <Button onClick={() => handleFooterDropDown(index)} ClassName={`material-symbols-outlined ${openIndex ===index ? "rotate-180" :"rotate-0"} `}>
                    keyboard_arrow_down
                  </Button>
                </section>
              </section>
              <section className={`md:block ${openIndex === index ? "block" : "hidden"}`}>
                {item.additionalLinks.map((link, linkIndex) => (
                  <div key={linkIndex} className="text-[14px] px-4">
                    <Link href={link.url}>{link.name}</Link>
                  </div>
                ))}
              </section>
            </div>
          ))}
        </div>
      </div>
      <div className="h-1 border-b-[1px] border-solid px-20"></div>
      <h1 className="md:text-[80px] text-[40px] font-black italic md:pl-40 pb-20 md:pb-0 px-4">CLYRA</h1>
    </div>
    } 
    </>
  );
};

export default Footer;
