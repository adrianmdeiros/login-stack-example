import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
} from "@/components/ui/card"
import SigInForm from "./SigInForm"
import { Button } from "@/components/ui/button"

export default function SignInCard() {
    return (
        <Card>
            <CardHeader>
                <CardDescription>Enter if you already have an account.</CardDescription>
            </CardHeader>
            <CardContent>
                <SigInForm />
            </CardContent>
            <CardFooter className="flex flex-col">
                <Button variant="default" className="w-full font-bold">
                    Sign In
                </Button>
                <span className="text-neutral-400 flex items-center gap-2 justify-center mt-2 mx-auto">
                    or
                </span>
                //
            </CardFooter>
        </Card>

    )
}
