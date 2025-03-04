import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
} from "@/components/ui/card"
import SigInForm from "./SigInForm"

export default function SignInCard() {
    return (
        <Card>
            <CardHeader>
                <CardDescription>Enter if you already have an account.</CardDescription>
            </CardHeader>
            <CardContent>
                <SigInForm />
            </CardContent>
        </Card>

    )
}
