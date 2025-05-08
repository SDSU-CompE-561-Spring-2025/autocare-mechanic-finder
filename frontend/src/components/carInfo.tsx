'use client'

import { useSearchParams } from "next/navigation"
import {useQuery} from "@tanstack/react-query"
import { API_HOST_URL } from '@/lib/constants';

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
    const getGarage = useQuery<CarInfo[]>({
		queryKey: ['garage'],
		queryFn: async () => {
			const token = localStorage.getItem('accesstoken');	// Get the token from local storage, must match the variable name given in login
			const response = await fetch(`${API_HOST_URL}/cars/garage`, {
				method: 'GET',
				headers: { 'Authorization': `Bearer ${token}` , 'Content-Type': 'application/json' },
			});
			if (response.status === 200) {
				const data = await response.json();
				setCars(data);
				console.log(data);
				return data;
			} else {
				throw new Error('Failed to fetch garage items');
			}
		},
	});
    return (
        <div>
            <h1>Car Information</h1>
        </div>
    );
}
