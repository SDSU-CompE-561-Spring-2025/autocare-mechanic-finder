import Image from "next/image";
import { Button } from "@/components/ui/button"
import Link from 'next/link';
import NavigationBar from "@/components/NavigationBar";




export default function Home() {
  return (
    
    <div className="h-screen w-screen bg-black overflow-auto min-h-fit min-w-fit">
      <div className="h-screen w-screen bg-[url('/images/CarOnRoad_Darkened.jpg')] bg-cover bg-center flex flex-col items-center">
        <div className="h-full flex items-center">
          <div className="flex flex-col justify-center items-center bg-black/50 rounded-4xl max-w-180">
            <img className="w-1/4 min-w-3xs max-w-md mt-6" src="/images/MyCarCare_NoBG.png"/>
            <main className="items-center text-[#C4C4C4] mx-10 mt-6 font-semibold text-center text-lg">
              My Car Care was created with the purpose to make autocare simple and convenient. Users are able to add their vehicle and keep track of the essential maintanance such as oil change intervals. 
              Additional features include finding nearby autoshops in order for the user to source car parts locally. 
            </main>
            <div className="w-full flex justify-evenly my-10">
              <Button asChild className="px-14 py-6 bg-[#738678] cursor-pointer text-lg font-bold hover:bg-[#7ba686]">
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild className="px-4 py-6 bg-[#738678] cursor-pointer text-lg font-bold hover:bg-[#7ba686]">
                <Link href="/register">Create an Account</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
