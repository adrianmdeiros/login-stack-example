import 'server-only'

import { JWTPayload, jwtVerify, SignJWT } from "jose"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const secret = new TextEncoder().encode(process.env.JWT_SECRET)

export async function encrypt(payload: JWTPayload) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('1d')
        .sign(secret)
}

export async function decrypt(token: string) {
    try {
        const { payload } = await jwtVerify(token, secret, {
            algorithms: ['HS256']
        })
        return payload
    } catch (error) {
        console.error('Failed to verify token.', error)
    }
}

export async function createSession(userId: string) {
    const expiresIn = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours in milliseconds
    const token = await encrypt({ userId, expiresIn })
    const cookiesStore = await cookies()

    cookiesStore.set('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        expires: expiresIn,
        path: '/'
    })

    redirect(`/user/${userId}`)
}

export async function verifySession() {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value

    if (!token) {
        redirect('/')
    }

    const session = await decrypt(token)

    if (!session) {
        redirect('/')
    }

    if(session.exp && session.exp < Date.now() / 1000) {
        redirect('/')
    }

    return session
}

export async function deleteSession() {
    const cookieStore = await cookies()
    cookieStore.delete('token')
}
