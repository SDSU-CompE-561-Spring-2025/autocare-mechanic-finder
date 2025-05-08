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
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';

const formSchema = z.object({
	state: z.string().optional(),
  change_password: z.boolean(),
  new_password: z.string().optional(),
	current_password: z.string().min(1, {
		message: 'You must enter your current password',
	}),
});

export default function UpdateUserForm() {
	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			state: '',
      change_password: false,
      new_password: '',
      current_password: '',

		},
	});

	const isChecked = form.watch('change_password');
	const [submissionStatus, setStatus] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [successful, isSuccessful] = useState(false);

	// 2. Define a submit handler.
	const onSubmit = async (data: z.infer<typeof formSchema>) => {
		setIsLoading(true);
		try{
			const token = localStorage.getItem('accesstoken');	// Get the token from local storage, must match the variable name given in login
			const response = await fetch(`${API_HOST_URL}/users/update`,
				{
					method: 'PUT',
					headers: { 'Authorization': `Bearer ${token}` , 'Content-Type': 'application/json' },
					body: JSON.stringify(data),
				},
			)
			if(response.status === 200) {
				setStatus('User updated successfully!');
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
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<FormField
					control={form.control}
					name="state"
					render={({ field }) => (
						<FormItem>
							<FormLabel>State:</FormLabel>
							<FormControl>
								<Input
									placeholder="Enter USA state of residence"
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
			name="change_password"
			render={({ field }) => (
				<FormItem className="flex space-x-1 mb-4">
				<div>
					<FormLabel>Change Password:</FormLabel>
					<FormDescription className='text-zinc-600'>
					Check this box to change your password.
					</FormDescription>
					<FormMessage />
				</div>
				<FormControl>
					<Checkbox
					className='size-7 cursor-pointer hover:bg-[#738678] bg-white transition-all duration-300'
					checked={field.value}
					onCheckedChange={field.onChange}
					/>
				</FormControl>
				</FormItem>
			)}
			/>
			<FormField
					control={form.control}
					name="new_password"
					render={({ field }) => (
						<FormItem className={isChecked? 'unhidden' : 'hidden'}>
							<FormLabel>New Password:</FormLabel>
							<FormControl>
								<Input
									type={'password'}
									placeholder="Enter your new password"
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
					name="current_password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Current Password:</FormLabel>
							<FormControl>
								<Input
									type={'password'}
									placeholder="Enter your current password"
									className='border-2 border-zinc-500 bg-white mb-4'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex justify-between w-full">
					<Button type="submit" className="py-6 px-9.5 bg-[#738678] rounded-xl cursor-pointer text-xl font-bold text-white hover:bg-[#7ba686]">
						{isLoading ? 'Loading...' : 'Submit'}</Button>
					<Button asChild className="py-6 px-12.5 bg-zinc-600 rounded-xl cursor-pointer text-xl font-bold text-white hover:bg-zinc-500">
						<Link href="/">Back</Link>
					</Button>
				</div>
				<div className={successful ? "flex justify-center text-xl font-bold text-green-600 mt-2" : "flex justify-center text-xl font-bold text-red-600 mt-2"}>
					{submissionStatus}
				</div>
			</form>
		</Form>
	);
}
