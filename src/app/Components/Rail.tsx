"use client"
interface Categories {
    title:string,
    activate:boolean,
    imageUrl:string
}

interface CategoriesProps {
    categoriesRail : Categories[],
    heading:string
}

const Rail = ({categoriesRail,heading}:CategoriesProps,) => {

  return (
    <div className="py-3">
        <div className="px-4">
            <h2 className="font-extrabold text-md">{heading}</h2>
        </div>
         <div className="flex overflow-auto px-2 scrollbar mt-2">
            {
                categoriesRail.map((item,index) => (
                    <div className="px-2" key={index}>
                         <div className="h-42 w-40 md:h-[360px]">
                             <img className="w-full h-full object-fit rounded-3xl" src={item.imageUrl} alt={item.title} />
                        </div>
                     </div>
                ))
            }
       </div>

    </div>
  )
}
export default Rail