import React, { useState } from "react"
interface TabsTypes{
  name:string,
  icon:string,
  url:string
}

interface PropChildrens {
  props:TabsTypes[],
  className?:string
}



const Tabs = ({props,className}:PropChildrens) => {

  const [tabsState , updateTabsState] = useState<string>("All")


  const tabsHandle = (name:string) => {
    const tabLabelName = props.filter((item) => item.name === name)
    updateTabsState(tabLabelName[0].name)
  }

  return (
    <div className="flex justify-around pt-2 shadow-sm">
      {
        props.map((item,index) => (
          <div key={index}
          
          className={`${tabsState === item.name ? "border-b-2 border-[#000042]" :"none "} py-[8px]`}>
          <div onClick={() => tabsHandle(item.name)}
            className="flex flex-col items-center w-20"
          >
              <div className="material-symbols-outlined">
                {item.icon}
              </div>
              <div 
              >
                {item.name}
              </div>
          </div>
          </div>
        ))
      }
    </div>
  )
}
export default Tabs