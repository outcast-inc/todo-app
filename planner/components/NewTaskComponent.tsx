import { Plus } from "lucide-react"
import AlertComponent from "./AlertComponent"
import TaskItem from "./TaskItem"
import Link from "next/link"
import NewTaskForm from "./forms/NewTaskForm"

const NewTaskComponent = ({modelType, showModal, refreshComponent}: {
    modelType: string,
    showModal: string,
    refreshComponent: () => void
}) => {
  return (
    <TaskItem key={100}>
        <div className="space-y-4 w-full">
            <AlertComponent/>
            <div className="flex-grow bg-gray-100 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                {showModal && modelType === 'task' ? (
                    <NewTaskForm refreshComponent={refreshComponent}/>
                ) : (
                    <Link
                        className="w-full flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                        href="/?show=true&type=task"
                    >
                        <Plus 
                            className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                        />
                        <span className="flex-1 ms-3 whitespace-nowrap">New Task</span>
                        <span className="flex items-center justify-center text-sm font-medium text-blue-800 dark:text-blue-300">
                            <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 bg-white rounded-lg dark:bg-blue-900">
                                ⌘
                            </span>
                            <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 bg-white rounded-lg dark:bg-blue-900">T</span>
                        </span>
                    </Link>
                )}
            </div>
        </div>
    </TaskItem>
  )
}

export default NewTaskComponent