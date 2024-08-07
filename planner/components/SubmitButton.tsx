import Image from "next/image"
import { Button } from "./ui/button"
import { Loader } from "lucide-react"

interface ButtonProps {
    isLoading: boolean,
    className?: string,
    children: React.ReactNode
}

const SubmitButton = ({ isLoading, className, children }: ButtonProps) => {
  return (
    <Button type="submit" disabled={isLoading} className={className ?? ""}>
        {isLoading ? (
            <div className="flex items-center gap-4">
                <Loader 
                    className="animate-spin h-4 w-4"
                />
                {/* <Image 
                    src="/assets/icons/loader.svg"
                    alt="loader"
                    width={24}
                    height={24}
                    className="animate-spin"
                /> */}
                Loading...
            </div>
        ) : (children)}
    </Button>
  )
}

export default SubmitButton