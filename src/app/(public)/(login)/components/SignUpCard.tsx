import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
} from "@/components/ui/card"
import SignUpForm from "./SignUpForm"
import { Button } from "@/components/ui/button"

export default function SignUpCard() {
    return (
        <Card>
            <CardHeader>
                <CardDescription>
                    Sign up for free.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <SignUpForm />
            </CardContent>
            <CardFooter>
            <Button variant="default" className="w-full font-bold">
                    Sign Up
            </Button>
            </CardFooter>
        </Card>

    )
}
