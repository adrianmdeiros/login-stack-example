import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FormErrorAlert from "./FormErrorAlert";

export default async function SignUpForm() {
  return (
    <form action="" className="flex flex-col gap-2">
      <div>
        {/* <FormErrorAlert /> */}
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          placeholder="Enter your email"
          className="text-sm placeholder:text-neutral-500"
        />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          placeholder="Enter your password"
          className="text-sm placeholder:text-neutral-500"
        />
      </div>
      <div>
        <Label htmlFor="confirm-password">Confirm Password</Label>
        <Input
          type="password"
          id="confirm-password"
          placeholder="Confirm your password"
          className="text-sm placeholder:text-neutral-500"
        />
      </div>
    </form>
  )
}
