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
	/*const getGarage = useQuery<Car[]>({
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
	});*/

	const data = [{
		  "year": 2012,
		  "BrandName": "Hyundai",
		  "model": "Genesis Coupe",
		  "trim": "2.0T",
		  "car_id": 1,
		  "cars": 1,
		  "mileage": 100000,
		  "LastOilChange": "99000",
		  "AirFilter": "99000",
		  "created_at": "2025-05-06T23:49:42.973643"
		},
		{
		  "year": 2012,
		  "BrandName": "Hyundai",
		  "model": "Genesis Coupe",
		  "trim": "2.0T",
		  "car_id": 2,
		  "cars": 1,
		  "mileage": 100000,
		  "LastOilChange": "99000",
		  "AirFilter": "99000",
		  "created_at": "2025-05-06T23:49:45.648363"
		},
		{
		  "year": 2024,
		  "BrandName": "Rivian",
		  "model": "R1S",
		  "trim": null,
		  "car_id": 3,
		  "cars": 1,
		  "mileage": 20000,
		  "LastOilChange": null,
		  "AirFilter": null,
		  "created_at": "2025-05-06T23:50:17.065969"
		},
		{
		  "year": 2024,
		  "BrandName": "Ford",
		  "model": "F-150",
		  "trim": "Raptor R",
		  "car_id": 4,
		  "cars": 1,
		  "mileage": 30000,
		  "LastOilChange": "25000",
		  "AirFilter": "25000",
		  "created_at": "2025-05-06T23:51:08.379397"
		},
		{
			"year": 2018,
			"BrandName": "Toyota",
			"model": "Camry",
			"trim": "LE",
			"car_id": 11,
			"cars": 1,
			"mileage": 65000,
			"LastOilChange": "62000",
			"AirFilter": "58000",
			"created_at": "2025-05-06T23:49:42.973643"
		  },
		  {
			"year": 2020,
			"BrandName": "Honda",
			"model": "Civic",
			"trim": "EX",
			"car_id": 12,
			"cars": 1,
			"mileage": 42000,
			"LastOilChange": "40000",
			"AirFilter": "35000",
			"created_at": "2025-05-06T23:49:42.973643"
		  },
		  {
			"year": 2015,
			"BrandName": "Ford",
			"model": "F-150",
			"trim": "XLT",
			"car_id": 13,
			"cars": 1,
			"mileage": 115000,
			"LastOilChange": "112000",
			"AirFilter": "105000",
			"created_at": "2025-05-06T23:49:42.973643"
		  },
		  {
			"year": 2022,
			"BrandName": "Tesla",
			"model": "Model 3",
			"trim": "Long Range",
			"car_id": 14,
			"cars": 1,
			"mileage": 28000,
			"LastOilChange": "N/A",
			"AirFilter": "25000",
			"created_at": "2025-05-06T23:49:42.973643"
		  },
		  {
			"year": 2019,
			"BrandName": "Nissan",
			"model": "Altima",
			"trim": "SR",
			"car_id": 5,
			"cars": 1,
			"mileage": 78000,
			"LastOilChange": "75000",
			"AirFilter": "70000",
			"created_at": "2025-05-06T23:49:42.973643"
		  },
		  {
			"year": 2017,
			"BrandName": "Chevrolet",
			"model": "Malibu",
			"trim": "LT",
			"car_id": 6,
			"cars": 1,
			"mileage": 92000,
			"LastOilChange": "89000",
			"AirFilter": "85000",
			"created_at": "2025-05-06T23:49:42.973643"
		  },
		  {
			"year": 2021,
			"BrandName": "Subaru",
			"model": "Outback",
			"trim": "Premium",
			"car_id": 7,
			"cars": 1,
			"mileage": 35000,
			"LastOilChange": "32000",
			"AirFilter": "28000",
			"created_at": "2025-05-06T23:49:42.973643"
		  },
		  {
			"year": 2016,
			"BrandName": "BMW",
			"model": "3 Series",
			"trim": "328i",
			"car_id": 8,
			"cars": 1,
			"mileage": 88000,
			"LastOilChange": "85000",
			"AirFilter": "80000",
			"created_at": "2025-05-06T23:49:42.973643"
		  },
		  {
			"year": 2023,
			"BrandName": "Kia",
			"model": "Sportage",
			"trim": "LX",
			"car_id": 9,
			"cars": 1,
			"mileage": 15000,
			"LastOilChange": "12000",
			"AirFilter": "10000",
			"created_at": "2025-05-06T23:49:42.973643"
		  },
		  {
			"year": 2014,
			"BrandName": "Mazda",
			"model": "Mazda3",
			"trim": "i Grand Touring",
			"car_id": 10,
			"cars": 1,
			"mileage": 105000,
			"LastOilChange": "102000",
			"AirFilter": "98000",
			"created_at": "2025-05-06T23:49:42.973643"
		  }
	];
	useEffect(() => {
		setCars(data);
	}, []);

	console.log(cars.length)
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
						<Link href={`/carupdate?car_id=${car.car_id}`}>More</Link>
					</Button>
				</CardContent>
			</Card>
			))}
		</div>)
	}
	else{
	return(
		<div>No Cars In User's Garage</div>
	)
	}
}
