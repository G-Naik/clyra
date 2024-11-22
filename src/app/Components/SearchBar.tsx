"use client"

import { Input } from "@mui/material"

const SearchBar = () => {
  return (
    <div className="w-screen">
        <section>
            <h2>Top Trending Searches on the App</h2>
            <div className="py-2 px-4 flex justify-center items-center relative md:hidden">
              <Input
                className="bg-white rounded-lg pl-10 py-1 border-[1px] shadow-sm border-[#0000005c]  px-4 w-full text-sm"
                autoFocus={false}
                disableUnderline
                placeholder="Enter your order here..."
                />
                <div className="absolute left-6 pt-1">
                    <span className="material-symbols-outlined text-[#000000d7]">arrow_backward</span>
                </div>
              </div>
          </section>
    </div>
  )
}
export default SearchBar