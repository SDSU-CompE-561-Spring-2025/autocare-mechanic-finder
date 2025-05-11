'use client'

import { useSearchParams } from "next/navigation"
import {useQuery} from "@tanstack/react-query"
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

export default function CarInfo() {
    const params = useSearchParams();
    const carId = params.get('car_id');
    const [cars, setCars] = useState<CarInfo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
            const token = localStorage.getItem('accesstoken');	// Get the token from local storage, must match the variable name given in login
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
            }
        };
    
        fetchData();
        }, [`${API_HOST_URL}/cars/mygarage`]);


    return (
        <div>
            
            <h1><div>
                {cars.map((car) => (
                    <div key={car.car_id} className="flex flex-col text-black rounded-xl w-[80%] h-[70%] min-h-35">
                        <div className="flex justify-between items-center"><b className="text-lg">{car.BrandName} {car.model}</b></div>
                        <div className="bg-white rounded-xl  flex-1 overflow-auto">
                            <p className = 'p-5'>Year: {car.year}</p>
                            <p className = 'p-5'>Trim: {car.trim}</p>
                            <p className = 'p-5'>Mileage: {car.mileage}</p>
                            <p className = 'p-5'>Last Oil Change: {car.LastOilChange}</p>
                            <p className = 'p-5'>Air Filter: {car.AirFilter}</p>
                        </div>
                    </div>
                ))}
		</div></h1>
        </div>
    );
}
