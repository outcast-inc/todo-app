import { getListsEntry } from '@/lib/actions/list.actions';
import { CreateTodoSchema } from '@/lib/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '../ui/form';
import CustomFormField from '../CustomFormField';
import { FormFieldType } from './ListForm';
import DatePickerDropdown from '../dropdowns/DatePickerDropdown';
import { icons } from 'lucide-react';
import { SelectItem } from '../ui/select';
import { createTodoEntry } from '@/lib/actions/todo.actions';

const NewTaskForm = ({
    refreshComponent
}: {refreshComponent: () => void}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [IconName, setIconName] = useState("House");
    const [dateRange, setDateRange] = useState([null, null])
    const [startDate, endDate] = dateRange;
    const [ListItems, setListItems] = useState([]);

    const fetchListEntries = async () => {
        const listEntries = await getListsEntry();
        setListItems(listEntries.nodes)
    }

    useEffect(() => {
        fetchListEntries();

        const keyDownHandler = (e: any) => console.log(`You pressed ${e.code}.`);
        document.addEventListener("keydown", keyDownHandler);

        // clean up
        return () => {
            document.removeEventListener("keydown", keyDownHandler);
        };
    }, [])

    const form = useForm<z.infer<typeof CreateTodoSchema>>({
        resolver: zodResolver(CreateTodoSchema),
        defaultValues: {
          title: "",
          start_date: new Date(),
          end_date: new Date(),
          status: "pending",
          listType: "Personal"
        },
    })

    async function onSubmit({ title, listType }: z.infer<typeof CreateTodoSchema>) {
        setIsLoading(true);

        try {
            const listItem = ListItems.find((listItem) => listItem?.name! === listType)
            const todoData = {todo : {
                title, 
                start_date: startDate, 
                end_date: endDate,
                status: "pending",
                listId: listItem.id
            }};
            const todoEntry = await createTodoEntry(todoData);
            if(todoEntry) {
                router.push("/")
                refreshComponent();
            }
           
        } catch (error) {
            console.log("error", error);
        }

        setIsLoading(false);
    }
      
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex items-center p-2 text-gray-900 rounded-lg dark:text-white">
                <div className="w-full flex flex-row justify-between">
                    <CustomFormField 
                        fieldType={FormFieldType.TASK}
                        control={form.control}
                        name="title"
                        placeholder="New List"
                        iconObject={IconName}
                        setIconName={setIconName}
                    />
                    <div className='flex items-center space-x-4'>
                        <DatePickerDropdown dateRange={dateRange} setDateRange={setDateRange}/>

                        <CustomFormField 
                            fieldType={FormFieldType.SELECT}
                            control={form.control}
                            name='listType'
                            placeholder='Personal'
                        >
                            {ListItems.map((listItem, i) => {
                                const ListIcon = icons[listItem.icon];
                                return (
                                    <SelectItem key={listItem.name + i} value={listItem.name}>
                                        <div className="flex cursor-pointer items-center gap-2">
                                            <ListIcon />
                                            <span>{listItem.name}</span>
                                        </div>
                                    </SelectItem>)
                            })}
                        </CustomFormField>
                    </div>
                </div>
            </form>
        </Form>
    )
}

export default NewTaskForm