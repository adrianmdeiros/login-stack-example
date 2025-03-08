import { users } from "@/db/schema";
import { eq } from 'drizzle-orm'
import { db } from "@/db";
import { verifySession } from "@/lib/session";
import { cache } from "react";
import { User } from "@/lib/definitions";

export const getUserByEmail = cache(async (email: string) => {
    return await db
        .select()
        .from(users)
        .where(eq(users.email, email))
})

export const saveUser = async (user: User) => {
    return await db.insert(users).values({
        email: user.email,
        password: user.password!,
        avatarUrl: user.avatarUrl
    }).returning({ id: users.id })
}

export const getUserById = cache(async (id: string) => {
    await verifySession()
    return await db
        .select({ email: users.email, avatarUrl: users.avatarUrl })
        .from(users)
        .where(eq(users.id, id))
})
