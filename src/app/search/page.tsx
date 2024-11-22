"use client";

import Link from "next/link";
import { Card, CardActionArea, CardMedia, Input, Typography } from "@mui/material";
import { useEffect, useState ,useCallback } from "react";
import { useRouter } from "next/navigation";

const page = () => {
    const exploreSearch = [
        {
            title: "Clothes",
            url: "/",
            icon: "apparel",
        },
        {
            title: "Shoes",
            url: "/",
            icon: "steps",
        },
        {
            title: "Mobiles",
            url: "/",
            icon: "smartphone",
        },
        {
            title: "Books",
            url: "/",
            icon: "book",
        },
        {
            title: "Headphone",
            url: "/",
            icon: "headphones",
        },
        {
            title: "Bottle",
            url: "/",
            icon: "water_bottle",
        },
    ];

    const [search, updateSearch] = useState<{ title: string; url: string; icon: string }[]>([]);
    const [searchQuery, updateSearchQuery] = useState<{ title: string; url: string; icon: string }[]>([]);


   const fetchData = useCallback(async () => {
        const getSearchData = await fetch("http://localhost:3000/api/products");
        const respondSearchData = await getSearchData.json();
        updateSearch(respondSearchData);
    },[])

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const findOutProducts = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const queryData = event.target.value.toLowerCase();
        if(queryData.length > 0){
            const filteredData = search.filter((product) => product.title.toLowerCase().includes(queryData));
            updateSearchQuery(filteredData);
        }else{
            updateSearchQuery([])
        }
    };

    const router = useRouter()
    const productHandle = (_id:string) => {
        router.push(`/products/${_id}`)
    }

    return (
        <div className="w-screen">
            <section className="px-4">
                <div className="py-3 flex justify-center items-center relative md:hidden h-[64px]">
                    <Input
                        className="bg-white rounded-lg pl-10 py-1 border-[1px] shadow-sm border-[#0000005c]  px-4 w-full text-sm"
                        autoFocus={false}
                        disableUnderline
                        placeholder="Enter your order here..."
                        onChange={(event) => findOutProducts(event)}
                    />
                    <div className="absolute left-2 pt-1">
                        <Link href="/" className="material-symbols-outlined text-[#000000d7]">
                            arrow_back
                        </Link>
                    </div>
                </div>
               <div>
                    {
                        searchQuery.length <= 0 ? 
                            <div>
                                <h4 className="font-black py-2">You might like</h4>
                                <div className="grid grid-cols-2 gap-2">
                                    {exploreSearch.map((item, index) => (
                                        <div
                                            className="border-2 border-solid flex justify-between h-14 items-center rounded-2xl p-2"
                                            key={index}
                                        >
                                            <div>
                                                <Link href={item.url}>{item.title}</Link>
                                            </div>
                                            <div>
                                                <span className="material-symbols-outlined">{item.icon}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        :
                        <div>
                            {
                              searchQuery.map((item: any) => (
                                <div className="py-2" key={item?.id || item?.title} >
                                  <Card
                                  onClick={() => productHandle(item._id)}
                                  className="flex justify-between items-start gap-2 h-[100px]">
                                    <div className="w-[200px] h-[100px] overflow-hidden">
                                      <img
                                        src={item?.image}
                                        alt={item?.title}
                                        className="w-full h-full object-fit"
                                      />
                                    </div>
                                    <CardActionArea>
                                      <div>
                                        <Typography className="text-[12px]" component="h2">
                                          {item?.title}
                                        </Typography>
                                      </div>
                                    </CardActionArea>
                                  </Card>
                                </div>
                              ))
                              
                            }
                        </div>
                    }
               </div>
            </section>
        </div>
    );
};

export default page;
