import { NextResponse } from "next/server"

interface productsData {
    _id:string,
    price:number,
    id:number,
    description:string,
    category:string,
    image:string,
    rating:Rating
}

interface Rating {
    rate:number,
    count:number
}

const db_url = process.env.DB_URL ?? ""

export const GET = async() => {

    try{
        const getData = await fetch(db_url)
        const theUpdatedData = await getData.json()
        return NextResponse.json(theUpdatedData);
      } catch (error) {
        return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
      }

}
