'use client';
import { API_HOST_URL } from '@/lib/constants';
import { useState } from 'react';
import { set, useForm } from 'react-hook-form';
import Link from 'next/link';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
  } from "@/components/ui/card"

interface Car{
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

export default function UserGarage() {
	const [cars, setCars] = useState<Car[]>([]);
	const getGarage = async () => {
		try {
			const token = localStorage.getItem('accesstoken');	// Get the token from local storage, must match the variable name given in login
			const response = await fetch(`${API_HOST_URL}/cars/garage`,
				{
					method: 'GET',
					headers: { 'Authorization': `Bearer ${token}`},
				},
			);
			const data = response.data;
			setCars(data);
		} catch (error) {
			console.error("Error fetching garage data:", error);
		}
	}


    return(
        <div>
            Garage Items
        </div>
    )
}
