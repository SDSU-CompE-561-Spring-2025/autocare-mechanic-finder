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

const UserSchema = z.object({
    username: z.string()
        .min(5, { message: 'Username must be at least 5 characters' }),
    email:z.string().email({message: "Email Invalid"}),
    password: z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 
            {message: "Password must contain: 1 lowercase letter, 1 uppercase letter, 1 number, 1 of the following symbols: #?!@$%^&*- and have a minimum of 8 characters"}),
    confirmPass: z.string().min(1, {message: "Required"}),
}).refine((data) => data.password === data.confirmPass, {path: ['confirmPass'], message: 'Passwords do not match'});

export default function RegisterForm(){
    const [submissionStatus, setStatus] = useState('');
    const [submitting, setIsSubmitting] = useState(false);

    const form = useForm<z.infer<typeof UserSchema>>({
        resolver: zodResolver(UserSchema),
        defaultValues: {
            username: '',
            password: '',
        },
    });

    async function onSubmit(values: z.infer<typeof UserSchema>) {
        delete values['confirmPass'];
        const data = JSON.stringify(values);
        setIsSubmitting(true)

		const response = await fetch(`${API_HOST_URL}/users/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: data,
		});

		if (response.ok) {
			const result = await response.json();
			setIsSubmitting(false);
			setStatus('Success');
			setTimeout(() => {
				window.location.href = '/login';
			}, 1000);
			return true;
		}
		else{
			setStatus('Email or Username are already taken')
			setIsSubmitting(false)
		}	
    }


    return(
        <Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
			>
                <FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem className='py-1'>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									className='bg-white border-zinc-400 border-2'
									placeholder="Enter Email"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
                <FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem className='py-1'>
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input
									className='bg-white border-zinc-400 border-2'
									placeholder="Enter Username"
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
						<FormItem className='py-1'>
							<FormLabel>Password</FormLabel>
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
                <FormField
					control={form.control}
					name="confirmPass"
					render={({ field }) => (
						<FormItem className='py-1'>
							<FormLabel>Password Confirmation</FormLabel>
							<FormControl>
								<Input
									type={'password'}
									className='bg-white border-zinc-400 border-2'
									placeholder="Re-enter Password"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
                />
				<div className="w-full flex flex-col 2xl:flex-row justify-evenly mt-5 mb-5">
                    <Button type="submit" className="px-2 py-6 mt-1 mx-1 bg-[#738678] cursor-pointer text-lg font-bold hover:bg-[#7ba686]">
                        {submitting? "Submitting..." : "Create Account"}
					</Button>
                    <Button aschild className="px-8 py-6 bg-[#738678] cursor-pointer text-lg font-bold hover:bg-[#7ba686] mt-1 mx-1">
                        <Link href="/login">Sign In</Link>
					</Button>
				</div>
				<p className={submissionStatus == 'Success'? 'flex justify-center text-green-500 font-semibold unhidden' : 'flex justify-center text-red-500 font-semibold unhidden'}>{submissionStatus}</p>
            </form>
        </Form>

    );
}