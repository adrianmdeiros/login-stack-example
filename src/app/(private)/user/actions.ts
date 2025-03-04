import { users } from "@/db/schema";
import { eq } from 'drizzle-orm'
import { db } from "@/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation"

export async function getUser(id: string) {
    return await db
        .select({ email: users.email, avatarUrl: users.avatarUrl })
        .from(users)
        .where(eq(users.id, id))
}