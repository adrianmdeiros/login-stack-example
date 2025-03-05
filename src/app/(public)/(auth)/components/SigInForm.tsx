'use client'

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useActionState, useEffect } from "react";
import { signIn as signInAction } from "../actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";
import { SignIn } from "@/lib/auth-action";

export default function SigInForm() {
  const [state, handleSignIn, pending] = useActionState(signInAction, undefined)
  const router = useRouter()

  const fieldErrorBorderColor = {
    'email': state?.errors?.email && 'border-yellow-500',
    'password': state?.errors?.password && 'border-yellow-500'
  }

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message)
      router.push(state.redirect!)
    }
  }, [state?.success, router])

  if (pending) return (
    <div className="flex items-center justify-center h-full w-full">
      <Loading />
    </div>
  )

  return (
    <div className="flex flex-col gap-4">
      <form action={handleSignIn} className="flex flex-col gap-4">
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
            placeholder="Enter your email"
            name="email"
            autoComplete="email"
            defaultValue={state?.fieldData?.email}
            className={`text-sm placeholder:text-neutral-500 ${fieldErrorBorderColor['email']}`}
          />
          {state?.errors?.email &&
            <p className="text-yellow-500 font-semibold text-sm">
              {state.errors.email[0]}
            </p>
          }
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <Label htmlFor="password">Password</Label>
            <Link href="#" className="text-cyan-500 text-xs font-semibold">
              Forgot password?
            </Link>
          </div>
          <Input
            type="password"
            id="password"
            autoComplete="current-password"
            name="password"
            defaultValue={state?.fieldData?.password}
            placeholder="Enter your password"
            className={`text-sm placeholder:text-neutral-500 ${fieldErrorBorderColor['password']}`}
          />
          {state?.errors?.password &&
            <p className="text-yellow-500 font-semibold text-sm">
              {state.errors.password[0]}
            </p>
          }
        </div>
        <Button disabled={pending} type="submit" variant="default" className="w-full font-bold">
          {pending ? <Loader2 className="animate-spin" /> : "Sign In"}
        </Button>
      </form>
      <span className="text-center">or</span>
      <form action={() => SignIn()}>
        <Button type="submit" variant='outline' className='w-full'>
          Sign In With Google
        </Button>
      </form>
    </div>
  )
}
