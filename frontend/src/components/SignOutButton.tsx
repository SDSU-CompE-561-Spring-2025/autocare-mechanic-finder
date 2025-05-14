'use client'
import { Button } from "@/components/ui/button"
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


export default function AddCarButton() {
    async function SignOut(){
        localStorage.removeItem('accesstoken');
        setTimeout(() => {
            window.location.href = '/';
        }, 500);
    }

    return(
        <form action={SignOut}>
                <Button type="submit" className="mr-5 p-2 rounded bg-red-600 text-white hover:bg-[#5a6d5c]">
                Sign Out
                </Button>
        </form>
    )
}
