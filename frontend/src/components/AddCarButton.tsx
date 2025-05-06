'use client'
import { Button } from "@/components/ui/button"
import Link from 'next/link';


export default function AddCarButton() {
  return <Button asChild className="p-2">
    <Link href="/addcar">Register Car</Link>
  </Button>
}
