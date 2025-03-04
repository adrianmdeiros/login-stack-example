'use client'

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUp } from "../actions";
import { useActionState, useEffect } from "react";
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { toast } from "sonner";
import { useRouter } from "next/navigation";


export default function SignUpForm() {
  const [state, handleSignUp, pending] = useActionState(signUp, undefined)
  const router = useRouter()

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message)
      router.push(state.redirect!)
    }
  }, [state?.success, router])


  const fieldErrorBorderColor = {
    'email': state?.errors?.email || state?.success === false && 'border-yellow-500',
    'password': state?.errors?.password && 'border-yellow-500',
    'confirmPassword': state?.errors?.confirmPassword && 'border-yellow-500',
  }

  return (
    <form action={handleSignUp} className="flex flex-col gap-4">
      {state?.success === false &&
        <p className="text-yellow-500 font-semibold text-sm">
          {state.message}
        </p>
      }
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          autoComplete="email"
          defaultValue={state?.fieldData?.email}
          className={`text-sm placeholder:text-neutral-500 ${fieldErrorBorderColor['email']}`}
        />
        {state?.errors?.email && <p className="text-yellow-500 font-semibold text-sm">{state.errors.email[0]}</p>}
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          name="password"
          autoComplete="current-password"
          placeholder="Enter your password"
          defaultValue={state?.fieldData?.password}
          className={`text-sm placeholder:text-neutral-500 ${fieldErrorBorderColor['password']}`}
        />
        {state?.errors?.password && <p className="text-yellow-500 font-semibold text-sm">{state.errors.password[0]}</p>}
      </div>

      <div>
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          autoComplete="current-password"
          placeholder="Confirm your password"
          defaultValue={state?.fieldData?.confirmPassword}
          className={`text-sm placeholder:text-neutral-500 ${fieldErrorBorderColor['confirmPassword']}`}
        />
        {state?.errors?.confirmPassword && <p className="text-yellow-500 font-semibold text-sm">{state.errors.confirmPassword[0]}</p>}
      </div>

      <Button type="submit" disabled={pending} variant="default" className="w-full font-bold">
        {pending ? <Loader2 className="animate-spin" /> : "Sign Up"}
      </Button>
    </form>
  )
}
