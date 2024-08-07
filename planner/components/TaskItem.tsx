"use client"
import { GripVertical, Plus } from 'lucide-react'

const TaskItem = ({ children }: {children: React.ReactNode}) => {
  return (
    <div className="flex flex-row">
        <Plus className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>
        <GripVertical className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>
        {children}
    </div>
  )
}

export default TaskItem