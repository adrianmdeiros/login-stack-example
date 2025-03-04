import { Suspense } from "react";
import Loading from "../loading";
import UserCard from "../components/UserCard";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function UserPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const _cookies = await cookies()
  const token = _cookies.get('token')?.value

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    next: {
      tags: ['user']
    }
  })

  if(!res.ok){
    const errorData = await res.json()

    if(res.status === 401 || res.status === 403) {
      return (
        <div className="flex flex-col items-center justify-center h-screen w-full">
          Not authorized. Please go back.
          <Link href='/' className="text-blue-600 hover:text-blue-500 font-semibold">
            Back
          </Link>
        </div>
      )
    }

    return <div>Something went wrong: {errorData.message}</div>
  }

  const { user } = await res.json()

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Suspense fallback={<Loading />}>
        <UserCard email={user.email} avatarUrl={user.avatarUrl} />
      </Suspense>
    </div>
  )
}
