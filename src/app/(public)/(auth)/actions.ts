'use server'

import { compare, hash } from 'bcryptjs'
import { SignInFormSchema, SignUpFormSchema } from '@/lib/definitions'
import { signIn as OAuthSignIn } from '@/auth'
import { createSession } from '@/lib/session'
import { getUserByEmail, saveUser } from '@/data/user'


export async function GoogleSignIn() {
    return await OAuthSignIn('google', { redirectTo: '/user' })
}

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

    const user = await getUserByEmail(validatedFields.data.email)

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

    const newUser = await saveUser({
        email: validatedFields.data.email,
        password: hashedPassword,
        avatarUrl: null
    })

    await createSession(newUser[0].id)

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

    const user = await getUserByEmail(validatedFields.data.email)

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

    if(!user[0].password) {
        return {
            success: false,
            message: 'User already exists. Maybe you already signed up with Google.',
            fieldData: {
                email: formData.get('email') as string,
            }
        }
    }

    const checkPassword = await compare(validatedFields.data.password, user[0].password!)

    if (!checkPassword) {
        return {
            success: false,
            message: 'Incorrect password.',
            fieldData: {
                email: formData.get('email') as string,
            }
        }
    }

    await createSession(user[0].id)

}

