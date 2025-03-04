import { cookies } from "next/headers";

export async function POST() {
    const _cookies = await cookies()
    _cookies.delete('token')
    return Response.json({ message: 'Logout successful.' }, { status: 200 })
}