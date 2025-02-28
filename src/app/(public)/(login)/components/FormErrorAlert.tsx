import { AlertCircle } from "lucide-react"

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"

export default function AlertDestructive() {
    return (
        <Alert variant="destructive" >
            <AlertCircle className="w-5" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
                Deu ruim.
            </AlertDescription>
        </Alert>
    )
}
