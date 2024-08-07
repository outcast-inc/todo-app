import { GripVertical, icons, Plus } from "lucide-react";
import ListForm from "./forms/ListForm";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getListsEntry } from "@/lib/actions/list.actions";
import { defaultLists } from "@/constants";
import { cn } from "@/lib/utils";

const ListItemComponent = ({modelType, showModal, navName}: {
    modelType: string,
    showModal: string,
    navName?: string,
}) => {

    const [ListItems, setListItems] = useState([]);

    const fetchEntries = async () => {
        const listEntries = await getListsEntry();
        setListItems(listEntries.nodes)
    }

    const refereshHint = () => {
        fetchEntries();
    }

    useEffect(() => {
        fetchEntries();
    }, [])

  return (
    <div className="px-4 py-2">
        <h2 className="mb-2 px-2 text-xl font-semibold tracking-tight">
            Private
        </h2>
        <ul className="space-y-2 font-medium list-image-none">
            {
                defaultLists.map((listItem: any, index: number) => {
                    const ListIcon = icons[listItem?.icon!];
                    const href = listItem.name === 'Home' ? "/" : `/?type=list&name=${listItem.name}`
                    return (
                    <li key={index}>
                        <Link
                            className={cn(`${navName === listItem.name ? "active-list" : "inactive-list"}`, "group")}
                            href={href}
                        >
                            <GripVertical 
                                className={`${navName === listItem.name ? "active-list-grip" : "inactive-list-grip"}`}
                            />
                            <ListIcon 
                                className={`${navName === listItem.name ? "active-list-icon" : "inactive-list-icon"}`}
                            />
                            <span className="flex-1 ms-3 whitespace-nowrap">{listItem?.name}</span>
                            <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-white rounded-lg dark:bg-blue-900 dark:text-blue-300">3</span>
                        </Link>
                    </li>)
                })
            }
            {
                ListItems.map((listItem: any, index: number) => {
                    const ListIcon = icons[listItem?.icon!];
                    const href = `/?type=list&name=${listItem.name}`
                    return (
                    <li key={index}>
                        <Link
                            className={cn(`${navName === listItem.name ? "active-list" : "inactive-list"}`, "group")}
                            href={href}
                        >
                            <GripVertical 
                                className={`${navName === listItem.name ? "active-list-grip" : "inactive-list-grip"}`}
                            />
                            <ListIcon 
                                className={`${navName === listItem.name ? "active-list-icon" : "inactive-list-icon"}`}
                            />
                            <span className="flex-1 ms-3 whitespace-nowrap">{listItem?.name}</span>
                            <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-white rounded-lg dark:bg-blue-900 dark:text-blue-300">3</span>
                        </Link>
                    </li>)
                })
            }
            
            <li>
                {(showModal && modelType === 'list') ?  (<ListForm  refreshComponent={refereshHint} />) : (
                    <Link
                        className="w-full flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                        href="/?show=true&type=list"
                    >
                        <Plus 
                            className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                        />
                        <span className="flex-1 ms-3 whitespace-nowrap">Create new list</span>
                        <span className="flex items-center justify-center text-sm font-medium text-blue-800 dark:text-blue-300">
                            <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 bg-white rounded-lg dark:bg-blue-900">
                                ⌘
                            </span>
                            <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 bg-white rounded-lg dark:bg-blue-900">L</span>
                        </span>
                    </Link>
                )}
            </li>
        </ul>
    </div>
  )
}

export default ListItemComponent