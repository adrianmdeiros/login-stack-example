import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
} from "@/components/ui/card"
import SignUpForm from "./SignUpForm"


export default function SignUpCard() {
    return (
        <Card >
            <CardHeader>
                <CardDescription>
                    Sign up for free.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <SignUpForm />
            </CardContent>
        </Card>
    )
}
