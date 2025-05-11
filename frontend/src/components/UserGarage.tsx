'use client';
import { API_HOST_URL } from '@/lib/constants';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { set, useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button"
import Link from 'next/link';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
  } from "@/components/ui/card"

interface Garage{
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
	const [cars, setCars] = useState<Garage[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [token, hasToken] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
		  const token = localStorage.getItem('accesstoken');	// Get the token from local storage, nonexistent if not logged in
        if(token){
			setLoading(true);
			try {
				const token = localStorage.getItem('accesstoken');	// Get the token from local storage, must match the variable name given in login
				const response = await fetch(`${API_HOST_URL}/cars/mygarage`, {
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
		}
		fetchData();
	  }, [`${API_HOST_URL}/cars/mygarage`]);

	//console.log(cars.length)
	if(cars.length > 0){
	return(
		<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2'>
			{cars.map((car, index) => (
				<Card key = {index}>
				<CardHeader className='flex-col items-center'>
				<CardTitle>{car.year} {car.BrandName}</CardTitle>
				<CardDescription>{car.model} {car.trim}</CardDescription>
				</CardHeader>
				<CardContent>
					<p>{car.mileage} mi</p>
					<Button asChild className="mt-2 bg-[#C4C4C4] border-1 border-zinc-200 cursor-pointer text-sm text-black hover:bg-[#7ba686] flex justify-center">
						<Link href={`/carprofile?carid=${car.car_id}`}>More</Link>
					</Button>
				</CardContent>
			</Card>
			))}
		</div>)
	}
	else{
	return(
		<div>No Cars In Garage</div>
	)
	}
}
