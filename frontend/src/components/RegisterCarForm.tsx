'use client';

import { zodResolver } from '@hookform/resolvers/zod';
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

export default function ProfileForm() {
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

	// 2. Define a submit handler.
	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-8"
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
            <FormItem className="flex space-x-1">
              <div>
                <FormLabel>Change Password:</FormLabel>
                <FormDescription>
                  Check this box to change your password.
                </FormDescription>
                <FormMessage />
              </div>
              <FormControl>
                <Checkbox
                  className='peer size-7 cursor-pointer hover:bg-white bg-red-500'
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
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex justify-between w-full">
					<Button type="submit" className="py-6 px-10 bg-red-500 rounded-xl cursor-pointer text-xl font-bold text-white hover:bg-red-400">Submit</Button>
					<Button asChild className="py-6 px-10 bg-slate-500 rounded-xl cursor-pointer text-xl font-bold text-white hover:bg-slate-400">
						<Link href="/">Cancel</Link>
					</Button>
				</div>
			</form>
		</Form>
	);
}