"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../ui/form";
import { CreateListSchema } from "@/lib/validations";
import CustomFormField from "../CustomFormField";
import { useState } from "react";
import SubmitButton from "../SubmitButton";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { createListEntry, updateListItem } from "@/lib/actions/list.actions";
import { cn } from "@/lib/utils";
// import action from "@/lib/actions";

export enum FormFieldType {
    INPUT = "input",
    LIST = "list",
    TEXTAREA = "textarea",
    PHONE_INPUT = "phoneInput",
    CHECKBOX = "checkbox",
    DATE_PICKER = "datePicker",
    SELECT = "select",
    SKELETON = "skeleton",
    TASK = "task",
    WORKSPACE = "workspace"
}

export default function ListForm({ 
    doEdit=false,
    listData,
    refreshComponent,
    updateComponent,
 }: {
    doEdit?: boolean,
    listData?: any,
    refreshComponent: () => void
    updateComponent?: (c: any) => void
}) {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [IconName, setIconName] = useState(listData ? listData.icon : "House");

    const form = useForm<z.infer<typeof CreateListSchema>>({
        resolver: zodResolver(CreateListSchema),
        defaultValues: {
          name: listData ? listData.name : "",
          icon: listData ? listData.icon : "",
        },
    })

    async function onSubmit({ name }: z.infer<typeof CreateListSchema>) {
        setIsLoading(true);

        try {
            if(doEdit) {
                const listEntry = await updateListItem(
                    listData.id,
                    name,
                    IconName
                );
                
                if(listEntry) {
                    updateComponent && updateComponent({
                        id: listData.id,
                        name,
                        icon: IconName
                    });
                    refreshComponent();
                }
            } else {
                const listData = {list : {name: name, icon: IconName}};
                const listEntry = await createListEntry(listData);
                if(listEntry) {
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
                        fieldType={FormFieldType.LIST}
                        control={form.control}
                        name="name"
                        placeholder="New List"
                        iconObject={IconName}
                        setIconName={setIconName}
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