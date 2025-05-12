'use client';

//inspired by ugur dogan's lectures and notes
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { API_HOST_URL } from '@/lib/constants';



const logSchema = z.object({
	username: z
		.string()
		.min(5, { message: 'Username must be at least 5 characters' }),
	password: z
		.string()
		.min(8, { message: 'Password must be at least 8 characters' }),
});


export default function Login() {
	const [submissionStatus, setStatus] = useState('');
	const [submitting, setIsSubmitting] = useState(false);

	const form = useForm<z.infer<typeof logSchema>>({
		resolver: zodResolver(logSchema),
		defaultValues: {
			username: '',
			password: '',
		},
	});

    async function onSubmit(values: z.infer<typeof logSchema>) {
		//console.log(values);
		const data = values;
		setIsSubmitting(true)

		const response = await fetch(`${API_HOST_URL}/users/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: new URLSearchParams(data).toString(),
		});

		if (response.ok) {
			const result = await response.json();
			localStorage.setItem('accesstoken', result.access_token);
			setIsSubmitting(false);
			setStatus('Success');
			setTimeout(() => {
				window.location.href = '/dashboard';
			}, 500);
			return true;
		}
		else{
			setStatus('Invalid Credentials')
			setIsSubmitting(false)
		}		
	}

	return (
        <Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem>
							<FormLabel className='py-1'>Username or Email</FormLabel>
							<FormControl>
								<Input
									className='bg-white border-zinc-400 border-2'
									placeholder="Enter Username or Email"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel className='pt-4 pb-1'>Password</FormLabel>
							<FormControl>
								<Input
									type={'password'}
									className='bg-white border-zinc-400 border-2'
									placeholder="Enter Password"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="w-full flex flex-col 2xl:flex-row justify-evenly mt-5 mb-5">
					<Button type="submit" className={submitting? "px-2 py-6 bg-[#738678] cursor-pointer text-lg font-bold hover:bg-[#7ba686] mt-1 mx-1" : "px-8 py-6 bg-[#738678] cursor-pointer text-lg font-bold hover:bg-[#7ba686] mt-1 mx-1"}>
						{submitting? "Submitting..." : "Sign In"}
					</Button>
					<Button asChild className="px-2 py-6 mt-1 mx-1 bg-[#738678] cursor-pointer text-lg font-bold hover:bg-[#7ba686]">
						<Link href="/register">Create Account</Link>
					</Button>
				</div>
				<p className={submissionStatus == 'Success'? 'flex justify-center text-green-500 font-semibold unhidden' : 'flex justify-center text-red-500 font-semibold unhidden'}>{submissionStatus}</p>
			</form>
		</Form>
	)
}