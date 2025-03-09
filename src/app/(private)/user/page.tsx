import Loading from "../../loading";
import UserCard from "./components/UserCard";
import { Suspense } from "react";
import { getUserById } from "@/data/user";
import Link from "next/link";
import { verifySession } from "@/lib/session";

export default async function UserPage() {
  const session = await verifySession()

  const [ user ] = await getUserById(session.userId)

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
