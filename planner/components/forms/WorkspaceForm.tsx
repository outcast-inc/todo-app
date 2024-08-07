"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../ui/form";
import { CreateWorkspaceSchema } from "@/lib/validations";
import CustomFormField from "../CustomFormField";
import { useState } from "react";
import SubmitButton from "../SubmitButton";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { FormFieldType } from "./ListForm";
import { createWorkspaceEntry, updateWorkspaceEntries } from "@/lib/actions/workspace.actions";
import { cn } from "@/lib/utils";

export default function WorkspaceForm({ 
    content,
    doEdit=false,
    refreshComponent 
}: {
    content?: any,
    doEdit?: boolean
    refreshComponent: () => void
}) {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [color, setColor] = useState(content ? content.color : "#B4D455");

    const form = useForm<z.infer<typeof CreateWorkspaceSchema>>({
        resolver: zodResolver(CreateWorkspaceSchema),
        defaultValues: content,
    })

    async function onSubmit({ name }: z.infer<typeof CreateWorkspaceSchema>) {
        setIsLoading(true);

        try {
            if(doEdit) {
                const wkspaceEntry = await updateWorkspaceEntries(
                    content.id,
                    name,
                    color
                );

                if (wkspaceEntry) refreshComponent();
            } else {
                const workspaceData = {workspace : {name, color, icon: "none"}};
                const workspaceEntry = await createWorkspaceEntry(workspaceData);
                if(workspaceEntry) {
                    router.push("/")
                    refreshComponent();
                }
            }
        } catch (error) {
            console.log("error", error);
        }

        setIsLoading(false);
    }
      
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex items-center p-2 text-gray-900 rounded-lg dark:text-white">
                <div className={cn("flex", `${doEdit ? "flex-col space-y-4 w-full": "flex-row"}`
                )}>
                    <CustomFormField 
                        fieldType={FormFieldType.WORKSPACE}
                        control={form.control}
                        name="name"
                        placeholder="New List"
                        color={color}
                        setColor={setColor}
                    />
                    <SubmitButton isLoading={isLoading}>
                        {doEdit ? "Update" : "Add"}
                    </SubmitButton>
                    {!doEdit && (
                        <div className="flex items-center cursor-pointer">
                            <X onClick={() => router.push("/")}/>
                        </div>
                    )}
                </div>
            </form>
        </Form>
    )
}