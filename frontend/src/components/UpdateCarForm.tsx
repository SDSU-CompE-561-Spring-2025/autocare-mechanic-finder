'use client';
import { API_HOST_URL } from '@/lib/constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const formSchema = z.object({
	trim: z.string().optional(),
	mileage: z.coerce.number().optional(),
	LastOilChange: z.string().optional(),
	AirFilter: z.string().optional(),
});

export default function UpdateCarForm() {
	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			trim: '',
			LastOilChange: '',
			AirFilter: '',
		},
	});

	const [submissionStatus, setStatus] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [successful, isSuccessful] = useState(false);
	const params = useSearchParams();
	const carId = params.get('carid'); // Get the carId from the URL

	// 2. Define a submit handler.
	const onSubmit = async (data: z.infer<typeof formSchema>) => {
		setIsLoading(true);
		try{
			const token = localStorage.getItem('accesstoken');	// Get the token from local storage, must match the variable name given in login
			const response = await fetch(`${API_HOST_URL}/cars/update/${carId}`,
				{
					method: 'PUT',
					headers: { 'Authorization': `Bearer ${token}` , 'Content-Type': 'application/json' },
					body: JSON.stringify(data),
				},
			)
			if(response.status === 200) {
				setStatus('Car updated successfully!');
				isSuccessful(true);
			} else{
				setStatus("Error: " + response.statusText);
				isSuccessful(false);
			}
		} catch (error) {
			console.error('Error updating user:', error);
		} finally {
			setIsLoading(false);
		}
		console.log("Data: " + JSON.stringify(data));
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
			>
			<FormField
					control={form.control}
					name="trim"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Trim:</FormLabel>
							<FormControl>
								<Input
									placeholder="Vehicle's trim"
									className='border-2 border-zinc-500 bg-white mb-4'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="mileage"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Mileage:</FormLabel>
							<FormControl>
								<Input
									type="number"
									placeholder="Vehicle's mileage"
									className='border-2 border-zinc-500 bg-white mb-4'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="LastOilChange"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Last Oil Change:</FormLabel>
							<FormControl>
								<Input
									placeholder="Vehicle's last oil change"
									className='border-2 border-zinc-500 bg-white mb-4'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="AirFilter"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Last Air Filter Change:</FormLabel>
							<FormControl>
								<Input
									placeholder="Vehicle's air filter change"
									className='border-2 border-zinc-500 bg-white mb-4'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex justify-between w-full">
					<Button type="submit" className="py-6 px-9.5 bg-[#738678] rounded-xl cursor-pointer text-xl font-bold text-white hover:bg-[#7ba686] mr-3">
						{isLoading ? 'Loading...' : 'Submit'}</Button>
					<Button asChild className="py-6 px-12.5 bg-zinc-600 rounded-xl cursor-pointer text-xl font-bold text-white hover:bg-zinc-500">
						<Link href={`/carupdate?car_id=${carId}`}>Back</Link>
					</Button>
				</div>
				<div className={successful ? "flex justify-center text-xl font-bold text-green-600 mt-2" : "flex justify-center text-xl font-bold text-red-600 mt-2"}>
					{submissionStatus}
				</div>
			</form>
		</Form>
	);
}
