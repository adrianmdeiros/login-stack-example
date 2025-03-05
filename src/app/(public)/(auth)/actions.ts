'use server'
import { db } from '@/db'
import { users } from '@/db/schema'
import { DatabaseError } from 'pg'
import { eq } from 'drizzle-orm'
import { compare, hash } from 'bcryptjs'
import { SignInFormSchema, SignUpFormSchema } from '@/lib/definitions'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { verifyEnvJwtSecret } from '@/lib/utils'

export async function signUp(_: unknown, formData: FormData) {
    const validatedFields = SignUpFormSchema.safeParse(Object.fromEntries(formData))

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            fieldData: {
                email: formData.get('email') as string,
                password: formData.get('password') as string,
                confirmPassword: formData.get('confirmPassword') as string
            }
        }
    }

    try {
        const user = await db
            .select()
            .from(users)
            .where(eq(
                users.email,
                validatedFields.data.email
            ))

        if (user.length > 0) {
            return {
                success: false,
                message: 'User already exists.',
                fieldData: {
                    email: formData.get('email') as string
                }
            }
        }

        const hashedPassword = await hash(validatedFields.data.password, 10)

        const newUser = await db.insert(users).values({
            email: validatedFields.data.email,
            password: hashedPassword,
        }).returning({ id: users.id, email: users.email })

        await authenticateUser(newUser[0])

        return {
            success: true,
            message: 'Account created successfully.',
            redirect: `/user/${newUser[0].id}`,
        }
    } catch (error) {
        if (error instanceof DatabaseError) {
            return {
                success: false,
                message: error.message
            }
        }
    }

}

export async function signIn(_: unknown, formData: FormData) {
    const validatedFields = SignInFormSchema.safeParse(Object.fromEntries(formData))

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            fieldData: {
                email: formData.get('email') as string,
                password: formData.get('password') as string
            }
        }
    }

    try {
        const user = await db
            .select({
                id: users.id,
                email: users.email,
                password: users.password
            })
            .from(users)
            .where(eq(
                users.email,
                validatedFields.data.email
            ))

        if (user.length === 0) {
            return {
                success: false,
                message: 'User not found.',
                fieldData: {
                    email: formData.get('email') as string,
                    password: formData.get('password') as string
                }
            }
        }

        const checkPassword = await compare(validatedFields.data.password, user[0].password)

        if (!checkPassword) {
            return {
                success: false,
                message: 'Incorrect password.',
                fieldData: {
                    email: formData.get('email') as string,
                }
            }
        }

        const { token } = await authenticateUser(user[0])

        return {
            success: true,
            message: 'User logged in successfully.',
            redirect: `/user/${user[0].id}`,
            token
        }

    } catch (error) {
        if (error instanceof DatabaseError) {
            return {
                success: false,
                message: error.message
            }
        }
    }
}

type SignUpUser = {
    id: string
    email: string
}

type SignInUser = {
    id: string
    email: string
    password: string
}

export async function authenticateUser(user: SignUpUser | SignInUser) {
    const tokenPayload = await createTokenPayload(user)
    const secret = verifyEnvJwtSecret()

    const token = jwt.sign(tokenPayload, secret, { expiresIn: '1d' })
    await saveTokenInCookies(token)

    return { token }
}

export async function createTokenPayload(user: SignUpUser | SignInUser) {
    const { id, email } = user
    const tokenPayload = {
        user: {
            id,
            email
        }
    }
    return tokenPayload
}

export async function saveTokenInCookies(token: string) {
    const authCookies = await cookies()

    authCookies.set('token', token, {
        httpOnly: true,
        secure: true
    })
}