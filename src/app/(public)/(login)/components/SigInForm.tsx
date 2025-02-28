import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default async function SigInForm() {
  return (
    <form action="" className="flex flex-col gap-2">
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
    </form>
  )
}
