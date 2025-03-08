'use client'

import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { LogOut, Pencil, User } from "lucide-react";
import Loading from "../../../loading";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type UserCardProps = {
    user: {
        email: string
        avatarUrl: string | null
    }
}

export default function UserCard({ user }: UserCardProps) {
    const { email, avatarUrl } = user
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    async function handleLogout(){
        setIsLoading(true)
        const res = await fetch('/api/auth/logout', { method: 'POST' })
        if(res.ok){
            toast.success('Logged out successfully.')
            router.push('/')
        } else{
            toast.error('Loogout failed')
        }
        setIsLoading(false)
    }
    
    return (
        <Card>
            <CardHeader className="flex justify-center items-center">
                {avatarUrl ?
                    <Image
                        src={avatarUrl}
                        alt="User Avatar"
                        className="rounded-full"
                    />
                    :
                    <div className="relative rounded-full cursor-pointer">
                        <User className="w-16 h-16 border rounded-full p-3" />
                        <Pencil className="absolute right-1 bottom-0 h-4 w-4" />
                    </div>
                }
            </CardHeader>
            <CardContent>
                <p className="font-semibold">{email}</p>
            </CardContent>
            <CardFooter className="flex justify-center items-center">
                {isLoading ?
                    <Loading />
                    :
                    <LogOut onClick={handleLogout} className="cursor-pointer text-red-700 hover:text-red-600" />
                }
            </CardFooter>
        </Card>
    )
}
