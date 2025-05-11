'use client';
import React, {useState} from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button"
import CarsInfo from '@/components/GetCarInfo';
import EditCarButton from '@/components/EditCarButton'


export default function CarProfile() {

    return(
        <div className="flex flex-col justify-center items-center h-screen min-h-fit overflow-auto w-screen">
            <div className="min-h-fit overflow-auto w-[40%] min-w-fit">
                <div className="ml-1 mb-1 text-white font-bold text-xl w-auto flex justify-between items-end">
                    Car Profile
                    <EditCarButton/>
                </div>
                <div className="p-2 bg-[#C4C4C4] rounded-xl w-full h-fit">
                    <div className="bg-white rounded-xl p-10 flex-1">
                    <CarsInfo />
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