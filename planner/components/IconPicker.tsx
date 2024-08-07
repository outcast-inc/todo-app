"use client"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { ChevronDown, ChevronUp, icons } from "lucide-react"
import { useState } from "react"

const IconPicker = ({iconObject, setIconName}: {
    iconObject: string,
    setIconName: (iconName: string) => void
}) => {

  const [Open, setOpen] = useState(false);

  const DefaultIcon = icons[iconObject];
  return (
    <Popover open={Open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
            <div className="bg-gray-200 p-2 rounded-md flex items-center gap-2">
                <DefaultIcon 
                    className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                />
                { Open ? (
                    <ChevronDown className='h-3 w-3' />
                ) : (
                    <ChevronUp className='h-3 w-3'/>
            )}
                
            </div>
        </PopoverTrigger>
        <PopoverContent className="pr-0">
            <h2 className="font-semibold flex justify-center text-lg">Select Icon</h2>
            <Separator className="my-4"/>
            <div className="flex flex-wrap gap-2 mt-0 h-64 overflow-y-auto">
                {Object.entries(icons).map((key, index) => {
                    const IconName = key[1]
                    return (<div key={index}>
                        <IconName 
                            className="rounded-md h-10 w-10 cursor-pointer active:scale-105 bg-gray-200 p-2 text-gray-900"
                            onClick={() => {
                                setIconName(key[0]);
                                setOpen(false);
                            }}
                        />
                    </div>)
                })}
            </div>
        </PopoverContent>
    </Popover>
  )
}

export default IconPicker