"use client"
import { cn } from "@/lib/utils"
import { userAuthSchema } from "@/lib/validations"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { buttonVariants } from "./ui/button"
import { Loader } from "lucide-react"
import { loginCurrentUser } from "@/lib/actions/auth.actions"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof userAuthSchema>

const UserAuthForm = ({ className, ...props }: UserAuthFormProps) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  });
  const [isLoading, setIsLoading] = useState(false)
  const [loginError, setLoginError] = useState(null);
  const router = useRouter();

  async function onSubmit(data: FormData) {
    setIsLoading(true)

    const signInResult = await loginCurrentUser(
        data.email,
        data.password
    )
    if(signInResult?.error) setLoginError(signInResult.error)
    if(signInResult?.accessToken) {
        localStorage.setItem("accessToken", signInResult.accessToken)
        router.push("/");
    }

    setIsLoading(false)
  }
  return (
    <div className={cn("grid gap-6", className)} {...props}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 text-md">
                <div className="grid gap-2">
                    <Label className="sr-only" htmlFor="email">
                        Email
                    </Label>
                    <Input 
                        id="email"
                        placeholder="name@example.com"
                        type="email"
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect="off"
                        disabled={isLoading}
                        {...register("email")}
                    />
                    {errors?.email && (
                        <p className="px-1 text-xs text-red-600">
                            {errors.email.message}
                        </p>
                    )}
                </div>
                <div className="grid gap-1">
                    <Label className="sr-only" htmlFor="email">
                        Password
                    </Label>
                    <Input 
                        id="password"
                        placeholder="Enter Password"
                        type="password"
                        autoCapitalize="none"
                        autoCorrect="off"
                        disabled={isLoading}
                        {...register("password")}
                    />
                    {errors?.password && (
                        <p className="px-1 text-xs text-red-600">
                            {errors.password.message}
                        </p>
                    )}
                    {loginError && (
                        <p className="px-1 text-xs text-red-600">
                            {loginError}
                        </p>
                    )}
                </div>
                <button className={cn(buttonVariants())} disabled={isLoading}>
                    {isLoading && (
                        <Loader className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Sign In with Email
                </button>
            </div>
        </form>
    </div>
  )
}

export default UserAuthForm