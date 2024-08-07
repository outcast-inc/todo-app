"use client"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Lightbulb, X } from "lucide-react"
import { useState } from "react";

const AlertComponent = () => {
  const [Close, setClose] = useState(false);
  return (
    <>
    {!Close ? (
      <Alert className="bg-gray-100 border-none text-gray-500 text-md w-full">
        <div className="flex flex-row gap-4">
          <Lightbulb className="h-6 w-6" />
          <AlertDescription className="w-[1/4]">
            Are you tired of juggling multiple tasks and deadlines? Our To-Do List app is here to simplify your life antialiased
            boost your productivity. Whether it's work-related projects, household chores, or personal goals, we've got you covered.
          </AlertDescription>
          <X className="h-6 w-6 text-black" onClick={() => setClose(true)}/>
        </div>
      </Alert>
    ): null}
    </>
  )
}

export default AlertComponent