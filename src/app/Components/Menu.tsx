'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

interface MenuLinks {
    url: string,
    label: string,
    icon: string,
}

interface MenuClass {
    className?: string
}

const Menu = ({ className }: MenuClass) => {

    const menuLinks: MenuLinks[] = [
        {
            url: "/",
            label: "Home",
            icon: "home",
        },
        {
            url: "/search",
            label: "Search",
            icon: "search",
        },
        {
            url: "/wishlist",
            label: "Favorite",
            icon: "favorite",
        },
        {
            url: "/cart",
            label: "Cart",
            icon: "shopping_bag",
        },
        {
            url: "/profile",
            label: "Profile",
            icon: "person",
        },
    ]

    const pathName = usePathname()

    // Set initial active menu based on the current path
    const [toggleMenu, updateToggleMenu] = useState<string>(() => {
        const activeLink = menuLinks.find(item => item.url === pathName)
        return activeLink ? activeLink.label : "Home"
    })

    // Update menu when the pathname changes
    useEffect(() => {
        const activeLink = menuLinks.find(item => item.url === pathName)
        if (activeLink) {
            updateToggleMenu(activeLink.label)
        }
    }, [pathName])

    return (
      <>
      {
        pathName !== "/cart" && 
        <div className="bottom-0 fixed w-full bg-[#ffffff] h-[64px] md:hidden z-100" style={{ zIndex: 1000 }}>
            <section className="flex justify-center items-center">
                {
                    menuLinks.map((item, index) => (
                        <div 
                            onClick={() => updateToggleMenu(item.label)} 
                            className={`${item.label === toggleMenu ? "border-t-2 border-[#000042]" : "bg-white"} flex justify-center items-center flex-col w-20`} 
                            key={index}
                        >
                            <div className="flex items-center justify-center">
                                <Link href={item.url} className="text-center">
                                    <div className="material-symbols-outlined text-center pt-2">{item.icon}</div>
                                    <div className="text-[12px] text-center">{item.label}</div>
                                </Link>
                            </div>
                        </div>
                    ))
                }
            </section>
        </div>
      }
      </>
    )
}
export default Menu
