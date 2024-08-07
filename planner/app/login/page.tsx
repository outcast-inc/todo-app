import { buttonVariants } from "@/components/ui/button"
import UserAuthForm from "@/components/UserAuthForm"
import { cn } from "@/lib/utils"
import { Waypoints } from "lucide-react"
import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
}

const Login = () => {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] border-2 rounded-lg p-4">
        <div className="flex flex-col space-y-2 text-center">
          <div className="flex flex-row justify-center items-center space-x-4 mb-6">
            <div className='w-fit bg-black rounded-lg p-2'>
                <Waypoints 
                    className='h-6 w-6 text-white'
                />
            </div>
            <h1 className='font-bold text-2xl'>Planner</h1>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email to sign in to your account
          </p>
        </div>
        <UserAuthForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link
            href="/register"
            className="hover:text-brand underline underline-offset-4"
          >
            Don&apos;t have an account? Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login