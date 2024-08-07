import { cn } from "@/lib/utils"
import { GripVertical, Plus } from "lucide-react"
import ProjectDropdown from "./dropdowns/ProjectDropdown"
import ListForm from "./forms/ListForm"
import Link from "next/link"
import WorkspaceForm from "./forms/WorkspaceForm"
import { useEffect, useState } from "react"
import { getWorkspaceEntries } from "@/lib/actions/workspace.actions"

const DropDownList = [
    {
        name: "OkfbBjf",
        color: "#4A249D"
    },
    {
        name: "LkabfbOjbd",
        color: "#009FBD"
    },
    {
        name: "UggalOjn",
        color: "#F9E2AF"
    }
]

const WorkspaceItemComponent = ({modelType, showModal, navName}: {
    modelType: string,
    showModal: string,
    navName?: string
}) => {

    const [workspaceItems, setWorkspaceItems] = useState([]);

    const fetchEntries = async () => {
        const workspaceEntries = await getWorkspaceEntries();
        setWorkspaceItems(workspaceEntries.nodes)
    }

    const refereshHint = () => {
        fetchEntries();
    }

    useEffect(() => {
        fetchEntries();
    }, [])

  return (
    <div className="px-4 py-2 mt-5">
        <h2 className="mb-2 px-2 text-xl font-semibold tracking-tight">
            Workspace
        </h2>
        <ul className="space-y-2 font-medium list-image-none">
            {
                workspaceItems.map((wkspace, index) => {

                    const href = `/?type=workspace&name=${wkspace?.id!}`
                    return (
                    <li key={index}>
                        <Link
                            className={cn(`${navName === wkspace.name ? "active-list" : "inactive-list"}`, "group")}
                            href={href}
                        >
                            <GripVertical 
                                className="flex-shrink w-4 h-4 text-gray-400 group-hover:text-gray-800"
                            />
                            <span 
                                className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white border-2 p-1 rounded-lg"
                                style={{ background: wkspace.color! }}
                            />
                            <span className="flex-1 ms-3 whitespace-nowrap">{wkspace?.name!}</span>
                            <ProjectDropdown id={wkspace?.id!} refreshComponent={refereshHint} componentType="Workspace" content={wkspace}/>
                        </Link>
                    </li>)
                })
            }
            <li>
                {(showModal && modelType === 'workspace') ?  (<WorkspaceForm refreshComponent={refereshHint}/>) : (
                    <Link
                        className="w-full flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                        href="/?show=true&type=workspace"
                    >
                        <Plus 
                            className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                        />
                        <span className="flex-1 ms-3 whitespace-nowrap">Create new workspace</span>
                        <span className="flex items-center justify-center text-sm font-medium text-blue-800 dark:text-blue-300">
                            <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 bg-white rounded-lg dark:bg-blue-900">
                                ⌘
                            </span>
                            <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 bg-white rounded-lg dark:bg-blue-900">W</span>
                        </span>
                    </Link>
                )}
            </li>
        </ul>
    </div>
  )
}

export default WorkspaceItemComponent