'use client'

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useActionState } from "react";
import { signIn as signInAction, GoogleSignIn } from "../actions";
import Image from "next/image";

export default function SigInForm() {
  const [state, handleSignIn, pending] = useActionState(signInAction, undefined)
  const [_, handleGoogleSignIn, googlePending] = useActionState(GoogleSignIn, undefined)

  const fieldErrorBorderColor = {
    'email': state?.errors?.email && 'border-yellow-500',
    'password': state?.errors?.password && 'border-yellow-500'
  }

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
      <form action={handleGoogleSignIn} >
        <Button disabled={googlePending} type="submit" variant='secondary' className='w-full flex gap-3 items-center h-10'>
          {googlePending ?
            <Loader2 className="animate-spin" />
            :
            <>
              <Image
                src="/google-icon.svg"
                alt="Google Icon"
                width={20}
                height={20}
              />
              <span>Sign In with Google</span>
            </>
          }
        </Button>
      </form>
    </div>
  )
}
