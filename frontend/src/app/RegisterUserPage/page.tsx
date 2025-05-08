'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

// Define the schema for user registration
const userSchema = z.object({
    username: z.string().min(3, { message: "Username must be at least 3 characters." }).max(30),
    email: z.string().email({ message: "Invalid email address." }),
    password: z.string().min(8, { message: "Password must be at least 8 characters." }),
    state: z.string().min(2, { message: "Please select a state" }),
    cars: z.string().optional(), // Or adjust as necessary.
});

// Component for the user registration page
const RegisterUserPage = () => {
    const [registrationError, setRegistrationError] = useState<string | null>(null);
    const [registrationSuccess, setRegistrationSuccess] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm<z.infer<typeof userSchema>>({
        resolver: zodResolver(userSchema),
    });

    // Function to handle form submission
    const onSubmit = async (data: z.infer<typeof userSchema>) => {
        setRegistrationError(null); // Reset error state
        setRegistrationSuccess(false);

        try {
            // Send registration data to your backend API endpoint
            const response = await fetch('/users/register', { //  Endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                // Handle successful registration
                console.log('User registered successfully');
                setRegistrationSuccess(true);
                reset(); // Clear the form
            } else {
                // Handle registration error
                const errorData = await response.json();
                const errorMessage = errorData.detail || 'Failed to register user';
                setRegistrationError(errorMessage);
                console.error('Registration error:', errorMessage);
            }
        } catch (error: any) {
            // Handle network or other errors
            const errorMessage = error.message || 'An error occurred during registration';
            setRegistrationError(errorMessage);
            console.error('Error during registration:', error);
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
                    maxWidth: '600px',
                }}
            >
                <h2 style={{ margin: '0 0 20px 0', color: '#333', textAlign: 'center' }}>Register User</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <Label htmlFor="username">Username</Label>
                        <Input
                            type="text"
                            placeholder="Username"
                            id="username"
                            {...register('username')}
                            className={cn(
                                errors.username ? 'border-red-500' : '',
                                "w-full"
                            )}
                        />
                        {errors.username && (
                            <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
                        )}
                    </div>
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            type="email"
                            placeholder="Email"
                            id="email"
                            {...register('email')}
                            className={cn(
                                errors.email ? 'border-red-500' : '',
                                "w-full"
                            )}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}
                    </div>
                    <div>
                        <Label htmlFor="password">Password</Label>
                        <Input
                            type="password"
                            placeholder="Password"
                            id="password"
                            {...register('password')}
                            className={cn(
                                errors.password ? 'border-red-500' : '',
                                "w-full"
                            )}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                        )}
                    </div>
                    <div>
                        <Label htmlFor="state">State</Label>
                        <Select>
                            <SelectTrigger id="state" className={cn(
                                errors.state ? 'border-red-500' : '',
                                "w-full"
                            )}>
                                <SelectValue placeholder="Select a state" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="AL">Alabama</SelectItem>
                                <SelectItem value="AK">Alaska</SelectItem>
                                <SelectItem value="AZ">Arizona</SelectItem>
                                <SelectItem value="AR">Arkansas</SelectItem>
                                <SelectItem value="CA">California</SelectItem>
                                <SelectItem value="CO">Colorado</SelectItem>
                                <SelectItem value="CT">Connecticut</SelectItem>
                                <SelectItem value="DE">Delaware</SelectItem>
                                <SelectItem value="DC">District Of Columbia</SelectItem>
                                <SelectItem value="FL">Florida</SelectItem>
                                <SelectItem value="GA">Georgia</SelectItem>
                                <SelectItem value="HI">Hawaii</SelectItem>
                                <SelectItem value="ID">Idaho</SelectItem>
                                <SelectItem value="IL">Illinois</SelectItem>
                                <SelectItem value="IN">Indiana</SelectItem>
                                <SelectItem value="IA">Iowa</SelectItem>
                                <SelectItem value="KS">Kansas</SelectItem>
                                <SelectItem value="KY">Kentucky</SelectItem>
                                <SelectItem value="LA">Louisiana</SelectItem>
                                <SelectItem value="ME">Maine</SelectItem>
                                <SelectItem value="MD">Maryland</SelectItem>
                                <SelectItem value="MA">Massachusetts</SelectItem>
                                <SelectItem value="MI">Michigan</SelectItem>
                                <SelectItem value="MN">Minnesota</SelectItem>
                                <SelectItem value="MS">Mississippi</SelectItem>
                                <SelectItem value="MO">Missouri</SelectItem>
                                <SelectItem value="MT">Montana</SelectItem>
                                <SelectItem value="NE">Nebraska</SelectItem>
                                <SelectItem value="NV">Nevada</SelectItem>
                                <SelectItem value="NH">New Hampshire</SelectItem>
                                <SelectItem value="NJ">New Jersey</SelectItem>
                                <SelectItem value="NM">New Mexico</SelectItem>
                                <SelectItem value="NY">New York</SelectItem>
                                <SelectItem value="NC">North Carolina</SelectItem>
                                <SelectItem value="ND">North Dakota</SelectItem>
                                <SelectItem value="OH">Ohio</SelectItem>
                                <SelectItem value="OK">Oklahoma</SelectItem>
                                <SelectItem value="OR">Oregon</SelectItem>
                                <SelectItem value="PA">Pennsylvania</SelectItem>
                                <SelectItem value="RI">Rhode Island</SelectItem>
                                <SelectItem value="SC">South Carolina</SelectItem>
                                <SelectItem value="SD">South Dakota</SelectItem>
                                <SelectItem value="TN">Tennessee</SelectItem>
                                <SelectItem value="TX">Texas</SelectItem>
                                <SelectItem value="UT">Utah</SelectItem>
                                <SelectItem value="VT">Vermont</SelectItem>
                                <SelectItem value="VA">Virginia</SelectItem>
                                <SelectItem value="WA">Washington</SelectItem>
                                <SelectItem value="WV">West Virginia</SelectItem>
                                <SelectItem value="WI">Wisconsin</SelectItem>
                                <SelectItem value="WY">Wyoming</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.state && (
                            <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="cars">Cars (Optional)</Label>
                        <Textarea
                            placeholder="Enter car details here..."
                            id="cars"
                            {...register('cars')}
                            className="w-full"
                        />
                    </div>

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? 'Registering...' : 'Register'}
                    </Button>

                    {registrationSuccess && (
                        <p className="text-green-500 text-center mt-4">User registered successfully!</p>
                    )}
                    {registrationError && (
                        <p className="text-red-500 text-center mt-4">{registrationError}</p>
                    )}

                    <div style={{ marginTop: '20px', textAlign: 'center' }}>
                        <a href="/LoginPage" style={{ color: '#007bff', textDecoration: 'none' }}>
                            Already have an account? Login
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterUserPage;
