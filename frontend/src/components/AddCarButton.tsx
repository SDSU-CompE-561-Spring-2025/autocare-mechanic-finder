'use client'
import { Button } from "@/components/ui/button"
import Link from 'next/link';


export default function AddCarButton() {
  return <Button asChild className="p-2 bg-[#738678] cursor-pointer text-lg font-bold hover:bg-[#7ba686]">
    <Link href="/addcar">Add Vehicle</Link>
  </Button>
}
