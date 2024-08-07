"use client"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { ChevronDown, ChevronUp, Link, Paintbrush } from "lucide-react"
import { useMemo, useState } from "react"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"
import { Input } from "./ui/input"
import { gradients, solids } from "@/constants"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"

const ColorPicker = ({color, setColor}: {
    color: string,
    setColor: (color: string) => void
}) => {

  const [Open, setOpen] = useState(false);

  const defaultTab = useMemo(() => {
    if(color.includes('gradient')) return 'gradient';
    return 'solid';
  }, [color])

//   const DefaultIcon = icons[iconObject];
  return (
    <Popover open={Open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
            <div className="flex items-center gap-2">
                {color ? (
                    <div
                        className="h-6 w-6 rounded-lg !bg-center !bg-cover transition-all"
                        style={{background: color}}
                    />
                    ) : (
                    <Paintbrush className="h-4 w-4" />
                )}
            </div>
        </PopoverTrigger>
        <PopoverContent>
            <h2 className="font-semibold flex justify-center text-lg">Select Color</h2>
            <Separator className="my-4"/>
            <Tabs defaultValue={defaultTab} className="w-full">
                <TabsList className="w-full mb-4">
                    <TabsTrigger className="flex-1" value="solid">
                        Solid
                    </TabsTrigger>
                    <TabsTrigger className="flex-1" value="gradient">
                        Gradient
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="solid" className="flex flex-wrap gap-1 mt-0">
                    {solids.map((s) => (
                        <div
                            key={s}
                            style={{ background: s }}
                            className="rounded-lg h-6 w-6 cursor-pointer active:scale-105"
                            onClick={() => setColor(s)}
                        />
                    ))}
                </TabsContent>

                <TabsContent value="gradient" className="mt-0">
                    <div className="flex flex-wrap gap-1 mb-2">
                    {gradients.map((s) => (
                        <div
                        key={s}
                        style={{ background: s }}
                        className="rounded-lg h-6 w-6 cursor-pointer active:scale-105"
                        onClick={() => setColor(s)}
                        />
                    ))}
                    </div>

                </TabsContent>

                </Tabs>

                <Input
                    id="custom"
                    value={color}
                    className="col-span-2 h-8 mt-4"
                    onChange={(e) => setColor(e.currentTarget.value)}
                />
        </PopoverContent>
    </Popover>
  )
}

export default ColorPicker