"use client"
import { Box, Drawer, Input, List, ListItem, ListItemButton, ListItemText, Card, CardActionArea, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const Navbar = () => {
    const menuItems = [
        {
            url:"/login",
            label:"Login / Signup"
        },
        {
            url:"/",
            label:"Whatsapp"
        }
    ];
    const [toggleMenu, updateToggleMenu] = useState<boolean>(false);
    const [search, updateSearch] = useState<{ title: string; url: string; icon: string }[]>([]);
    const [searchQuery, updateSearchQuery] = useState<{ title: string; url: string; icon: string }[]>([]);
    const [path, findPath] = useState<string | undefined>();

    const router = useRouter();
    const pathName = usePathname();

    const paths = ["cart", "search", "wishlist"]; // List of paths

    const toggleMenuBar = () => {
        updateToggleMenu(!toggleMenu);
    };

    useEffect(() => {
        // Fetch search data
        const fetchData = async () => {
            const getSearchData = await fetch("http://localhost:3000/api/products");
            const respondSearchData = await getSearchData.json();
            updateSearch(respondSearchData);
        };
        fetchData();

        // Find the matching path
        const matchingPath = paths.find((item) => `/${item}` === pathName);
        findPath(matchingPath); // Save the matching path or undefined

    }, [pathName, searchQuery]);

    // Function to handle search query
    const findOutProducts = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const queryData = event.target.value.toLowerCase();
        if (queryData.length > 0) {
            const filteredData = search.filter((product) => product.title.toLowerCase().includes(queryData));
            updateSearchQuery(filteredData);
        } else {
            updateSearchQuery([]);
        }
    };

    // Function to navigate to product details
    const productHandle = (_id: string) => {
        router.push(`/products/${_id}`);
        updateSearchQuery([]); // Clear the search results
    };

    return (
        <>
            {pathName !== `/${path}` && (
                <div className="md:py-4 sticky top-0 w-full bg-[#ffffff]" style={{ zIndex: 100 }}>
                    <div
                        style={{ zIndex: 1000000 }}
                        className="md:w-[1280px] max-w-full h-[52px] md:rounded-xl md:bg-[#fbfbfb] flex md:px-4 px-4 items-center justify-between m-auto"
                    >
                        <div className="w-[40px] h-[40px] rounded-full bg-slate-50 flex items-center justify-center">
                            Clyra
                        </div>
                        {/* Input section for searching */}
                        <div className="hidden md:block">
                            <Input
                                placeholder="Find your products here..."
                                disableUnderline
                                className="w-[600px] py-1 border-[1px] border-slate-200 pl-2 rounded-lg"
                                onChange={(event) => findOutProducts(event)}
                            />
                        </div>
                        <div className="flex items-center gap-4 pt-1">
                            <div className="md:flex hidden">
                                <div>
                                    <Link href="/cart" className="material-symbols-outlined w-[24px] pt-1 pe-10">shopping_bag</Link>
                                </div>
                                <div>
                                    <Link href="/wishlist" className="material-symbols-outlined w-[24px] pt-1 pe-5">favorite</Link>
                                </div>
                            </div>
                            <div>
                                <div onClick={toggleMenuBar} className="material-symbols-outlined w-[24px] pt-1">
                                    menu
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ zIndex: 100000000 }} className="md:hidden">
                        <Drawer anchor={"right"} open={toggleMenu}>
                            <Box sx={{ width: 250 }} role="presentation" onClick={toggleMenuBar}>
                                <div className="min-w-fit">
                                    <img
                                        className="w-[250px] object-cover"
                                        src="https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/2023/10/26/2415d448-f44d-4174-ae08-6720b267f21b1698300150508-Flat_400--2-.jpg"
                                        alt=""
                                    />
                                </div>
                                <List>
                                    {menuItems.map((text, index) => (
                                        <ListItem key={index}>
                                            <Link href={text.url}>
                                                <ListItemText primary={text.label} />
                                            </Link>
                                        </ListItem>
                                    ))}
                                </List>
                            </Box>
                        </Drawer>
                    </div>
                    <div className="flex justify-center items-center absolute top-[70px] left-96 w-[600px]">
                        <div>
                            {searchQuery.map((item:any) => (
                                <div className="py-2" key={item?.id || item?.title}>
                                    <Card onClick={() => productHandle(item._id)} className="flex justify-between items-start gap-2 h-[100px]">
                                        <div className="w-[200px] h-[100px] overflow-hidden">
                                            <img src={item?.image} alt={item?.title} className="w-full h-full object-fit" />
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
                            ))}
                        </div>
                    </div>
                </div>
            )
          }
        </>
    );
};

export default Navbar;
