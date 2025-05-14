'use client';
import React, {useState} from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button"
import CarsInfo from '@/components/GetCarInfo';
import EditCarButton from '@/components/EditCarButton'


export default function CarProfile() {

    return(
        <div className="flex flex-col justify-center items-center h-screen min-h-fit overflow-auto w-screen">
            <div className="w-[40%] min-w-fit">
                <div className="ml-1 mb-2 text-white font-bold text-xl w-auto flex justify-between items-end">
                    Car Profile
                    <EditCarButton/>
                </div>
                <div className="p-2 bg-[#C4C4C4] rounded-xl w-full h-fit">
                    <div className="bg-white rounded-xl p-10 flex-1">
                    <CarsInfo />
                    </div>
                </div>
                <footer className= "flex flex-col w-full h-fit justify-center items-center">
                <p className = "flex w-full justify-between mt-2 rounded-xl">
                    <Button aschild className="px-4 bg-[#738678] cursor-pointer text-lg font-bold hover:bg-[#7ba686]"><Link href="/car-parts">Find Auto Parts</Link></Button>
                    <Button aschild className="px-4 bg-[#738678] cursor-pointer text-lg font-bold hover:bg-[#7ba686]"><Link href="/AutoshopFinder">Car Search</Link></Button>
                    <Button aschild className="px-4 bg-[#738678] cursor-pointer text-lg font-bold hover:bg-[#7ba686]"><Link href="/dashboard">Dashboard</Link></Button></p>
                </footer>
        </div>
        </div>
    )
}