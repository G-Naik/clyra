"use client";

import Link from "next/link";
import Button from "../Components/Button";

interface CardDesings {
  icon:string,
  title:string
}

const Card = ({icon , title}:CardDesings) => {
  return(
      <div className="my-2 py-1 border-[1px] border-solid w-[120px] rounded-xl flex flex-col justify-center items-center">
          <div>
            <span className="material-symbols-outlined pt-[4px]">
              {icon}
            </span>
          </div>
          <div className="items-center">{title}</div>
       </div>
  )
}

const CandyBar = ({icon,title}:CardDesings) => {
  return(
        <div className="flex justify-between py-2 border-b-[1px] border-solid">
              <h3 className="flex justify-center items-center gap-2"><span className="material-symbols-outlined">{icon}</span>{title}</h3>
              <div className="material-symbols-outlined">chevron_right</div>
          </div>
  )
}

const Profile = () => {
  const name = "";

  return (
    <div className="px-4">
      <div className="w-full border-[1px] border-solid py-2 rounded-xl">
        <div className="flex h-[36px]">
          <div className="material-symbols-outlined pl-2">person</div>
          <div className="pt-[2px]">{name || "Name"}</div>
        </div>
        <p className="text-[12px] px-4">
          Login or signup to track your orders and get access to exclusive deals
        </p>
       <div className="px-2 py-2">
       <div className="py-2 text-center w-full bg-[#000042] text-white rounded-xl">
          <Link href="/signup">
            Login or Sign up
          </Link>
        </div>
       </div>
      </div>
      <section className="flex justify-around flex-grow-1 gap-2 text-[14px]">
        <Card icon="receipt_long" title="Orders" />
        <Card icon="location_on" title="My Address" />
        <Card icon="notifications_active" title="Notifications" />
      </section>
      <section className="border-[1px] border-solid rounded-lg">
        <div className="border-b-[1px]">
          <h2 className="py-2 pl-2 font-black">Others</h2>
        </div>
        <section className="px-2 text-[14px]">
          <CandyBar icon="info" title="About"/>
          <CandyBar icon="star" title="Rate us"/>
          <CandyBar icon="call" title="Contact us"/>
          <CandyBar icon="settings" title="More options"/>   
        </section>
      </section>
    </div>
  );
};
export default Profile;
