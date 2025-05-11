'use client';
import React, {useState} from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button"
import CarInfo from '@/components/CarInfo';


export default function CarProfile() {

    return(
        <div>
            <div className="flex flex-col justify-center items-center h-screen w-screen min-h-fit overflow-auto min-w-105">
                <div className="box-border w-[80%]"><b className="ml-1 text-white text-xl">Car Name</b></div>
                <div className="flex flex-col px-2 py-1 bg-[#C4C4C4] text-black rounded-xl w-[80%] h-[70%] min-h-35">
                    <div className="px-1 pb-2  flex justify-between items-center"><b className="text-lg"></b></div>
                    <div className="bg-white rounded-xl p-10 mb-2 flex-1 overflow-auto">
                    <CarInfo />
                    </div>
                </div>
                <footer className= "flex-col m-2 justify-end px-5 bg-[#C4C4C4] text-black rounded-xl w-[37%] h-[15%] min-h-12 flex justify-between items-center">
                <p className = "flex justify-between m-2 margin bottom bg-white rounded-xl p-4 py-5 mb-2 flex-1 overflow-auto">
                    <Button variant="outline" className="mr-20 mb-auto"><Link href="/car-parts">Find Auto Parts</Link></Button>
                    <Button variant="outline" className="ml-50"><Link href="/AutoshopFinderPage">Car Search</Link></Button></p>
                </footer>
        </div>
        </div>
    )
}