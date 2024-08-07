"use client"

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useEffect, useState } from "react";
import SubTaskItem from "./SubTaskItem";
import ProjectDropdown from "./dropdowns/ProjectDropdown";

const CollapsibleList = ({
    id,
    title,
    subtasks,
    count,
    iconname,
    icon,
}: {
    id?: string,
    title: string,
    subtasks: any[] | [],
    count: number,
    iconname?: string,
    icon: React.ReactNode
}) => {

  const [listItem, setListItem] = useState({
    id: id,
    name: title,
    icon: iconname
  })
  const [Open, setOpen] = useState(true);

  const updateTaskContent = (listData: any) => {
    setListItem(listData)
  }

  useEffect(() => {
    setListItem({
        id: id,
        name: title,
        icon: iconname
    })
  }, [title])

  return (
    <Collapsible open={Open} onOpenChange={setOpen} className="w-full space-y-6"> 
        <CollapsibleTrigger>
            <div className="w-full flex items-center text-gray-900 rounded-lg dark:text-white space-x-2">
                {Open ? (
                    <ChevronDown className="flex-shrink-0 w-5 h-5 text-black transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>
                ): (
                    <ChevronUp className="flex-shrink-0 w-5 h-5 text-black transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>
                )
                }
                {icon}
                <span className="font-semibold flex-1 ms-3 whitespace-nowrap">{listItem.name}</span>
                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-gray-600 bg-gray-200 rounded-lg dark:bg-gray-50 dark:text-gray-400">{count}</span>
                <ProjectDropdown orientation="vertical" id={id!} refreshComponent={()=>{}} componentType="List" content={listItem} updateComponent={updateTaskContent}/>
            </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
            <ul className="space-y-2 font-medium list-image-none">
                {subtasks.map((subtask, i) => (
                    <SubTaskItem 
                        key={i}
                        taskname={title}
                        subtask={subtask}
                    />
                ))}
            </ul>
        </CollapsibleContent>
    </Collapsible>
  )
}

export default CollapsibleList