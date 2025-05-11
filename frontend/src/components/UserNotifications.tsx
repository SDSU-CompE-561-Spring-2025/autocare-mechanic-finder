'use client';
import { API_HOST_URL } from '@/lib/constants';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

import Link from 'next/link';

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

export default function UserNotifications() {
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

    const oilnotif = cars.filter((item) => (item.mileage >= parseInt(item.LastOilChange) + 4000));
    const airnotif = cars.filter((item) => (item.mileage >= parseInt(item.AirFilter) + 14000));

    if(cars.length > 0){
        return(
            <div className='grid grid-cols-1 xl:grid-cols-2 gap-x-15 gap-y-1 flex-col'>
                {oilnotif.map((x, index) => (
                    <div className='flex justify-between max-w-lg'>{x.year} {x.BrandName} {x.model} {x.trim}<div className='bg-gray-800 rounded-xl ml-3 px-2 text-white text-xs flex items-center'>Oil Change Needed Soon</div></div>))}
                {airnotif.map((x, index) => (
                    <div className='flex justify-between max-w-lg'>{x.year} {x.BrandName} {x.model} {x.trim}<div className='bg-[#738678] rounded-xl ml-3 px-2 text-white text-xs flex items-center'>Air Filter Change Needed Soon</div></div>))}
            </div>)
    }
    else{
    return(<div></div>)
    }
}
