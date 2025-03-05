import { getUser } from "@/app/(private)/user/actions"
import { jwtVerify } from "jose"
import { NextRequest } from "next/server"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> },) {
    const { id } = await params

    // Buscar uma solucao melhor
    const token = request.headers.get('Authorization')?.replace('Bearer', '').trim()
    const JWT_SECRET = process.env.JWT_SECRET
    const secret = new TextEncoder().encode(JWT_SECRET)
    const { payload } = await jwtVerify(token!, secret) as { payload: { user: { id: string } } }
    const { user } = payload;
    const userAuthId = user.id

    try {
        const [foundUser] = await getUser(id)

        if (!foundUser) {
            return Response.json({ message: 'User not found.' }, { status: 404 })
        }

        if (id !== userAuthId) {
            return Response.json({ message: 'Denied access.' }, { status: 403 })
        }

        return Response.json({ user: foundUser, message: 'User found.' }, { status: 200 })
    } catch (error) {
        return Response.json({ message: 'Something went wrong.' }, { status: 500 })
    }

}