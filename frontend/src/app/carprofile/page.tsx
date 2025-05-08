import React from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button"

export default function CarProfile() {
    return(
        <div>
            
                <div className="box-border w-[80%]"><b className="ml-1 text-black text-xl">Car Name</b></div>
                <div className="flex flex-col px-3 py-3 bg-[#C4C4C4] text-black rounded-xl w-[80%] h-[70%] min-h-35">
                    <div className="px-1 pb-2 flex justify-between items-center"><b className="text-lg"></b></div>
                    <div className="bg-white rounded-xl p-40 mb-2 flex-1 overflow-auto">
                    
                    </div>
                </div>
                <footer className= "flex-col justify-end px-1 bg-[#C4C4C4] text-black rounded-xl w-[18%] h-[15%] min-h-15 flex justify-between items-center">
                <p className = "flex justify-between"><Button variant="outline">Find Auto Parts</Button><Button variant="outline">Find Auto Parts</Button></p>
                </footer>
        </div>
    )
}