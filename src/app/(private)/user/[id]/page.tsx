import Loading from "../../../loading";
import UserCard from "../components/UserCard";
import { Suspense } from "react";
import { getUserById } from "@/data/user";
import Link from "next/link";

export default async function UserPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const [ user ] = await getUserById(id)

  if(!user){
    return (
      <div className="h-screen w-full flex flex-col justify-center items-center">
        User not found
        <Link href='/' className="text-blue-500 font-semibold">
          Go back
        </Link>
      </div>
    )
  }


  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Suspense fallback={<Loading />}>
        <UserCard user={user} />
      </Suspense>
    </div>
  )
}
