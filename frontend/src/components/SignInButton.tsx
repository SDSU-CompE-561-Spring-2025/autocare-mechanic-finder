'use client'
import { Button } from "@/components/ui/button"
import Link from 'next/link';


export default function SignInButton() {
  return <Button asChild className=" mr-5 p-2 rounded bg-[#738678] text-white font-bold hover:bg-[#7ba686]">
    <Link href="/login">Sign In</Link>
  </Button>
}
