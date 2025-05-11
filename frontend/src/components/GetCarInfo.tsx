'use client'

import { useSearchParams } from "next/navigation"
import { API_HOST_URL } from '@/lib/constants';
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface CarInfo {
    year: number;
    BrandName: string;
    model: string;
    trim: string | null;
    car_id: number;
    cars: number;
    mileage: number | null;
    LastOilChange: string | null;
    AirFilter: string | null;
    created_at: string;
}

export default function GetCarInfo() {
    const params = useSearchParams();
    const carId = params.get('carid');
    const [cars, setCars] = useState<CarInfo>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [errormessage, setMessage] = useState('');


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
            const token = localStorage.getItem('accesstoken');	// Get the token from local storage, must match the variable name given in login
            //console.log(`${API_HOST_URL}/cars/info/${carId}`);
            const response = await fetch(`${API_HOST_URL}/cars/info/${carId}`, {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` , 'Content-Type': 'application/json' },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
                const data = await response.json();
                setCars(data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
                setMessage('There was an error. Returning to Dashboard');
                setTimeout(() => {
                    window.location.href = '/dashboard';
                }, 3000);
            }
        };
    
        fetchData();
        }, [`${API_HOST_URL}/cars/mygarage`]);
        
    if(errormessage){
        return(
            <div className='text-center text-red-500 font-bold text-lg'>{errormessage}</div>
        );
    }
    else{
        return (
            <div className="flex flex-col text-black rounded-xl">
                <div className="flex justify-between items-center"><b className="text-lg">{cars?.BrandName} {cars?.model}</b></div>
                <div className="bg-white rounded-xl  flex-1 overflow-auto">
                    <p className = 'p-5'>Year: {cars?.year}</p>
                    <p className = 'p-5'>Trim: {cars?.trim}</p>
                    <p className = 'p-5'>Mileage: {cars?.mileage}</p>
                    <p className = 'p-5'>Last Oil Change: {cars?.LastOilChange}</p>
                    <p className = 'p-5'>Air Filter: {cars?.AirFilter}</p>
                </div>
            </div>
        );
    }
}
