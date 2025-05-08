'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';

const logSchema = z.object({
    username: z.string().min(1, { message: 'Username is required' }),
    password: z
        .string()
        .min(8, { message: 'Password must be at least 8 characters' }),
});

const LoginPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof logSchema>>();
    const router = useRouter();

    const onSubmit = async (data: z.infer<typeof logSchema>) => {
        console.log('Form data:', data);
        try {
            const response = await fetch('/login', {  // Changed to '/login' to match your backend route
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded', // Changed to form data
                },
                body: new URLSearchParams({  // Building the form data
                    username: data.username,
                    password: data.password,
                }).toString(),
            });

            if (response.ok) {
                const responseData = await response.json();
                const { access_token, token_type } = responseData;  // Adjusted to match backend response
                console.log('Login successful! Tokens:', { access_token, token_type });
                localStorage.setItem('accessToken', access_token);
                localStorage.setItem('tokenType', token_type); // Store the token type
                router.push('/dashboard');
            } else {
                const errorText = await response.text();
                console.error('Login failed:', errorText);
                alert(`Login Failed: ${errorText}`);
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert(`Error during login: ${error.message}`);
        }
    };

    return (
        <div
            style={{
                background: `url('/images/RoadSurface.jpg') center center / cover no-repeat`,
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px',
            }}
        >
            <div
                style={{
                    backgroundColor: '#ddd',
                    borderRadius: '10px',
                    padding: '30px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    width: '80%',
                    maxWidth: '400px',
                }}
            >
                <h2 style={{ margin: '0 0 20px 0', color: '#333' }}>Login</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <Label htmlFor="username">Username</Label>
                        <Input
                            type="text"
                            placeholder="Username"
                            id="username"
                            {...register('username')}
                            className={errors.username ? 'border-red-500' : ''}
                        />
                        {errors.username && (
                            <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
                        )}
                    </div>
                    <div>
                        <Label htmlFor="password">Password</Label>
                        <Input
                            type="password"
                            placeholder="Password"
                            id="password"
                            {...register('password')}
                            className={errors.password ? 'border-red-500' : ''}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                        )}
                    </div>
                    <Button type="submit" className="w-full">Log in</Button>
                    <div style={{ marginTop: '20px', textAlign: 'center' }}>
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                router.push('/RegisterUserPage');
                            }}
                            style={{ color: '#007bff', textDecoration: 'none' }}
                        >
                            Don't have an account? Register
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
