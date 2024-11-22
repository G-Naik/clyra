"use client"
import { Checkbox, FormControlLabel } from "@mui/material"
import { useEffect, useState } from "react"

interface filtersData {
    category:string,
    id:number,
    _id:number,
    title:string
}

const Filter = () => {

    const [getFiltersData , updateFiltersData] = useState<filtersData[]>()

    useEffect(() => {
        async function filtersData () {
            const getUrlData = await fetch("http://localhost:3000/api/products")
            const returnData:filtersData[] = await getUrlData.json()
            updateFiltersData(returnData) 
        }
        filtersData()
    },[])

    const filteredData: string[] = [];

    const startFilteringCategory = getFiltersData?.filter((item: any) => {
        if (!filteredData.includes(item.category)) {
            filteredData.push(item.category);
            return true; 
        }
        return false; 
    });

    const [getFilter , updateFilter] = useState({
        category:"",
        sortOrder:""
    })
    
    const passFilter = (data:string) => {
        updateFilter({
            category:data,
            sortOrder:"asc"
        })
    }

    console.log(getFilter)

  return (
    <div className="w-[300px]">
        <div className="w-[300px] h-fit-content fixed shadow-lg  rounded-[20px] py-2">
            <div className="px-4">
                <h1 className="text-[16px]">Category</h1>
                <div className="flex flex-col px-2 py-2">
                {
                    filteredData?.map((item:string,index:number) => (
                        <div 
                        onClick={() => passFilter(item)}
                        key={index} className="px-2">
                            <div className="flex gap-2">
                                <input type="radio" name={item}/>
                                <label className="first-letter:capitalize" htmlFor="">{item}</label>
                            </div>
                        </div>
                    ))
                }
                </div>
                <section>
                    <h1 className="text-[16px]">Sort</h1>
                   <section className="px-2">
                        <div>
                            <input className="mr-2" type="radio"/>
                            <label className="" htmlFor="">High to Low</label>
                        </div>
                        <div>
                            <input className="mr-2" type="radio"/>
                            <label htmlFor="">Low to High</label>
                        </div>
                   </section>
                </section>
            </div>

        </div>
        
    </div>
  )
}
export default Filter

