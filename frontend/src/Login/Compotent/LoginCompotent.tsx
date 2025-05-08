'use client';

//inspired by ugur dogan's lectures and notes
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { button } from "/frontend/src/components/ui/button";
import { Input } from 'frontend/src/components/ui/input';
import { Label } from 'frontend/src/components/ui/label';



const logSchema = z.object({
	username: z
		.string()
		.min(8, { message: 'Username must be at least 8 characters' }),
	password: z
		.string()
		.min(8, { message: 'Password must be at least 8 characters' }),
});


export function Login() {
	
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