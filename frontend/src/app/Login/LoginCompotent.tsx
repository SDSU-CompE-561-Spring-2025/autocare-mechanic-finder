'use client';

//inspired by ugur dogan's lectures and notes
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { button } from "/frontend/src/components/ui/button";
import { Input } from 'frontend/src/components/ui/input';
import { Label } from 'frontend/src/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { API_HOST_BASE_URL } from '@/lib/constants';



const logSchema = z.object({
	username: z
		.string()
		.min(8, { message: 'Username must be at least 8 characters' }),
	password: z
		.string()
		.min(8, { message: 'Password must be at least 8 characters' }),
});
type LoginForm = z.infer<typeof logSchema>;


async function loginUser(data: LoginForm) {
	const response = await fetch(`${API_HOST_BASE_URL}/users/token`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: new URLSearchParams(data).toString(),
	});

	if (response.ok) {
		const result = await response.json();
		console.log(result);
		return { success: true, token: result.access_token };
	}

	throw new Error('Invalid credentials');
}

export function Login() {
	const [isLoading, setIsLoading] = useState(false);
	const { toast } = useToast();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginForm>({
		resolver: zodResolver(logSchema),
	});

    const onSubmit = async (data: LoginForm) => {
		setIsLoading(true);
		try {
			const result = await loginUser(data);
			if (result.success) {
				localStorage.setItem('accessToken', result.token);
				toast({
					title: 'Login Successful',
					description: 'You have been successfully logged in.',
				});
				window.location.href = '/';
			}
		} catch (error) {
			toast({
				title: 'Login Failed',
				description: 'Invalid username or password.',
				variant: 'destructive',
			});
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="background">
        <div className="logo"></div>
    </div>
    <form>
        <h3>Login</h3>

        <label for="username"> Username</label>
        <input type="text" placeholder="Email" id="username" />

        <label for="password"> Password</label>
        <input type="password" placeholder="Password" id="password" />
        <button>Log in</button>
        <h4>Register</h4>
    </form>
    </div>
	);
}