'use client'

import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function EditCarButton() {
    const params = useSearchParams();
    const carId = params.get('carid');

    return (
        <Button asChild className="px-4 bg-[#738678] cursor-pointer text-lg font-bold hover:bg-[#7ba686]">
            <Link href={`/carupdate?carid=${carId}`}>Edit</Link>
        </Button>
    )
}