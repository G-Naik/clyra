import type { Metadata } from "next";
import {Roboto} from "next/font/google";
import "./globals.css";
import Provider from "./Components/Provider";
import ReduxProvider from "./Components/ReduxProvider";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Menu from "./Components/Menu";


const roboto = Roboto({ weight:"400" , subsets: ["latin"] });


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>)

{


  return (
    <html lang="en">
      <head>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
      </head>
      <body className={roboto.className}>
        <Provider>
          <ReduxProvider>
            <Navbar/>
           {children}
           <div className="md:hidden">
            <Menu/>
           </div>
           <Footer/>
          </ReduxProvider>
        </Provider>
        </body>
    </html>
  );
}
