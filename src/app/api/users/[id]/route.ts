import { getUser } from "@/app/(private)/user/actions"
import { jwtVerify } from "jose"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> },) {
    const { id } = await params
    const headers = new Headers(request.headers)

    if (!headers.has('Authorization')) {
        return Response.json({ message: 'Authorization is required.' }, { status: 401 })
    }

    const token = headers.get('Authorization')?.replace('Bearer', '').trim()

    if (!token) {
        return Response.json({ message: 'Token is required.' }, { status: 401 })
    }

    if (!process.env.JWT_SECRET) {
        return Response.json({ message: 'JWT_SECRET is not defined in the environment variables.' }, { status: 401 })
    }

    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET)
        const { payload } = await jwtVerify(token, secret) as { payload: { user: { id: string }, exp: number } }
        const { user, exp } = payload;

        if (user.id !== id) {
            return Response.json({ message: 'Denied access.' }, { status: 403 })
        }

        const currentTime = Date.now() / 1000

        if (exp && exp < currentTime) {
            return Response.json({ message: 'Token expired.' }, { status: 401 })
        }

        const [foundUser] = await getUser(id)

        if (!foundUser) {
            return Response.json({ message: 'User not found.' }, { status: 404 })
        }
        
        return Response.json({ user: foundUser, message: 'User found.' }, { status: 200 })

    } catch (error) {
        return Response.json({ message: 'Invalid token.' }, { status: 401 })
    }

}