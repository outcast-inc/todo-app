"use client"
import { GripVertical, icons, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import ProjectDropdown from "./dropdowns/ProjectDropdown";
import Link from "next/link";
import ListForm from "./forms/ListForm";
import { useEffect, useState } from "react";
import { getListsEntry } from "@/lib/actions/list.actions";
import ListItemComponent from "./ListItemComponent";
import WorkspaceItemComponent from "./WorkspaceItemComponent";
import HeaderIcon from "./Icon";

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

export function Sidebar({modelType, showModal, navName}: {
    modelType: string,
    showModal: string,
    navName?: string,
}) {

    const [ListItems, setListItems] = useState([]);

    const fetchEntries = async () => {
        const listEntries = await getListsEntry();
        setListItems(listEntries.nodes)
    }

    const refereshHint = () => {
        console.log("refresh hit")
    }

    useEffect(() => {
        fetchEntries();
    }, [])

    return (
        <aside id="default-sidebar" className="fixed top-0 left-0 w-96 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
            <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">

                <HeaderIcon />

                <ListItemComponent modelType={modelType} showModal={showModal} navName={navName}/>

                <WorkspaceItemComponent modelType={modelType} showModal={showModal} navName={navName}/>

            </div>
        </aside>
    )
}