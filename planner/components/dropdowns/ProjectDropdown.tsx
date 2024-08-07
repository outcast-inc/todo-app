"use client"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { deleteWorkspace } from "@/lib/actions/workspace.actions"
import { Delete, Edit, Ellipsis, EllipsisVertical, Trash } from "lucide-react"
import { useState } from "react"
import EditTaskForm from "../forms/EditTaskForm"
import EditorModal from "../modals/EditorModal"
import { deleteList } from "@/lib/actions/list.actions"
import { deleteTodo } from "@/lib/actions/todo.actions"

type ProjectProps = {
  id: string
  orientation?: string
  componentType?: string
  content?: any
  taskname?: string
  taskicon?: string
  refreshComponent: () => void
  updateComponent?: (c: any) => void
}

const ProjectDropdown = ({
  id, 
  orientation="horizontal",
  componentType,
  content,
  taskname,
  taskicon,
  refreshComponent,
  updateComponent
}: ProjectProps) => {

  const [OpenComponent, setOpenComponent] = useState(false);
  const [OpenEditor, setOpenEditor] = useState(false);

  const deleteComponent = async () => {
    switch (componentType) {
      case 'List':
        return await deleteList(id)
      case 'Workspace':
        return await deleteWorkspace(id);
      case 'UserTask':
        return await deleteTodo(id);
      default:
        return {};
    }
  }

  const handleDelete = async() => {
    const deleteItem = await deleteComponent();
    if(deleteItem) refreshComponent();
  }

  const handleEditor = () => {
    setOpenComponent(!OpenComponent)
    setOpenEditor(!OpenEditor)
  }

  const closeEditor = () => {
    refreshComponent();
    setOpenEditor(false);
  }
  
  return (
    <>
      {((componentType === 'List' || componentType === 'Workspace') && OpenEditor) && <EditorModal componentType={componentType!} content={content} updateComponent={updateComponent} refreshComponent={closeEditor}/>}
      {componentType === 'UserTask' && <EditTaskForm Open={OpenComponent}  setOpen={setOpenComponent} content={content} taskname={taskname!} />}
      <DropdownMenu>
          <DropdownMenuTrigger className="!outline-none">
              {orientation === 'horizontal' ? (
                <Ellipsis 
                    className="flex items-center justify-center w-5 h-5 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                />
              ): (
                <EllipsisVertical 
                  className="flex items-center justify-center w-5 h-5 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                />
              )
              }
          </DropdownMenuTrigger>
          <DropdownMenuContent>
              <DropdownMenuItem className="gap-2 font-medium" onClick={handleEditor}>
                  <Edit className="flex items-center justify-center w-4 h-4 text-sm font-medium"/>
                  <span className="flex-1 ms-3 whitespace-nowrap">Edit</span>
              </DropdownMenuItem>
              {componentType === 'List' && (
                <DropdownMenuItem className="gap-2 font-medium disabled:text-gray-500" disabled>
                  <Delete className="flex items-center justify-center w-4 h-4 text-sm font-medium"/>
                  <span className="flex-1 ms-3 whitespace-nowrap">Remove All Task</span>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem className="text-red-500 gap-2 font-medium bg-white focus:bg-red-200 group" onClick={handleDelete}>
                  <Trash className="flex items-center justify-center w-4 h-4 text-sm font-medium text-red-500 group-hover:text-red-500 hover:text-red-500"/>
                  <span className="flex-1 ms-3 whitespace-nowrap text-red-500 group-hover:text-red-500 hover:text-red-500">Delete</span>
              </DropdownMenuItem>
          </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default ProjectDropdown