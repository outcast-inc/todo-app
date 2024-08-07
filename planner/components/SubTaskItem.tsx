import { EllipsisVertical, GripVertical } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import ProjectDropdown from "./dropdowns/ProjectDropdown"
import { updateTodoStatus } from "@/lib/actions/todo.actions"

const SubTaskItem = ({
    taskname,
    subtask
}: {
    taskname: string,
    subtask: any
}) => {

  const [Checked, setChecked] = useState<boolean>(subtask.status === 'complete')

  const isToday = new Date().toDateString() === new Date(subtask.start_date).toDateString()

  const handleCheckEvent = async(e: any) => {
    const updateTodo = await updateTodoStatus(
        subtask._id,
        !Checked ? "complete" : "pending"
    )
    console.log("task staus updated", updateTodo)
    setChecked(!Checked)
  }


  return (
    <li>
        <a
            className={cn("w-full flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group", 
                `${Checked ? "bg-gray-100 dark:bg-gray-700 group" : ""}`)}
        >
            <GripVertical className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>
            <div className="flex-1 ms-3 whitespace-nowrap flex items-center space-x-4">
                <Checkbox className="h-5 w-5" checked={Checked} onCheckedChange={handleCheckEvent}/>
                <span className={cn("font-normal", `${Checked ? "line-through text-gray-500" : ""}`)}>
                    {subtask.title}
                </span>
            </div>
            <span className="flex items-center justify-center text-sm font-medium text-blue-800 dark:text-blue-300 space-x-2">
                <div className="w-[200px]">
                    <div className="relative flex items-center justify-end">
                        {/* <Avatar className="absolute w-7 h-7 z-20 border-2">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <Avatar className="absolute w-7 h-7 z-10 border-2 mr-4">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <Avatar className="absolute w-7 h-7 z-0 border-2 mr-8">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar> */}
                    </div>
                </div>

                <span className="inline-flex items-center justify-center text-red-500 bg-red-100 px-2 py-1 rounded-lg">
                    {isToday ? "Today" : taskname}
                </span>
                <ProjectDropdown refreshComponent={() => {}} id="" orientation="vertical" componentType="UserTask" content={subtask} taskname={taskname} />
            </span>
        </a>
    </li>
  )
}

export default SubTaskItem