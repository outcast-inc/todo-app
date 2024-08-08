import {
    Drawer,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer"
import { Button } from "../ui/button"
import { ChevronsRight, icons, X } from "lucide-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { CreateTodoSchema } from "@/lib/validations"
import { Form } from "../ui/form"
import { FormFieldType } from "./ListForm"
import CustomFormField from "../CustomFormField"
import { SelectItem } from "../ui/select"
import { getListsEntry } from "@/lib/actions/list.actions"
import DateTimePickerDropdown from "../dropdowns/DateTimePicker"
import { updateTodoEntries } from "@/lib/actions/todo.actions"

const EditTaskForm = ({
    Open,
    content,
    taskname,
    setOpen,
} : {
    Open: boolean,
    content: any,
    taskname: string,
    setOpen: (open: boolean) => void
}) => {

  const [startDate, setStartDate] = useState<any>(content.start_date);
  const [endDate, setEndDate] = useState(content.end_date);
  const [Checked, setChecked] = useState<boolean>(content.status === 'complete')
  const [ListItems, setListItems] = useState([]);
  const [currentList, setCurrentList] = useState(null);

  const fetchListEntries = async () => {
        const listEntries = await getListsEntry();
        setListItems(listEntries.nodes)

        setCurrentList(listEntries.nodes.find((listItem) => listItem.id === content.listId))
  }
    
  useEffect(() => {
    fetchListEntries();
  }, [])

  const form = useForm<z.infer<typeof CreateTodoSchema>>({
    resolver: zodResolver(CreateTodoSchema),
    defaultValues: content,
  })

  async function onSubmit({title, status, reason, listType}: z.infer<typeof CreateTodoSchema>) {
    try {
        let listId = ListItems.find((item) => item.name === listType)
        console.log(listId, listType)
        if(listId === undefined) listId = ListItems.find((item) => item.name === taskname)
        console.log(listId, taskname)
        const updateData = {
            title,
            status,
            reason,
            start_date: startDate,
            end_date: endDate,
            listId: listId?.id,
        }
        const updatedTodo = await updateTodoEntries(content._id, updateData);
        if(updatedTodo)
            setOpen(false)
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <Drawer open={Open} onOpenChange={setOpen} direction="right">
        <DrawerContent className='h-screen top-0 right-0 left-auto mt-0 w-[500px] rounded-none'>
            <DrawerHeader>
                <DrawerTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <ChevronsRight className="text-gray-600"/>
                        {taskname}
                    </div>
                    <X onClick={() => setOpen(false)}/>
                </DrawerTitle>
            </DrawerHeader>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex items-start justify-between p-2 text-gray-900 rounded-lg dark:text-white flex-col h-full">
                    <div className="space-y-4 w-full">
                        <CustomFormField 
                            fieldType={FormFieldType.TASK}
                            control={form.control}
                            name="title"
                            placeholder="New List"
                        />

                        <div className="grid grid-cols-3 gap-4 px-4 items-center text-md">
                            <span className="text-gray-500">List</span>
                            <CustomFormField 
                                fieldType={FormFieldType.SELECT}
                                control={form.control}
                                name='listType'
                                placeholder={currentList ? currentList.name : taskname}
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
                            <span>{""}</span>
                            
                            <span className="text-gray-500">Start date</span>
                            <DateTimePickerDropdown 
                                date={startDate}
                                setDate={setStartDate}
                            />
                            
                            <span className="text-gray-500">Due date</span>
                            <DateTimePickerDropdown 
                                date={endDate}
                                setDate={setEndDate}
                            />
                        </div>

                        <CustomFormField 
                            fieldType={FormFieldType.TEXTAREA}
                            control={form.control}
                            name="reason"
                            placeholder="Write a note"
                            classNames="w-full px-4"
                        />
                    </div>
                    <Button variant={'outline'} type="submit" className="w-full">Update Task</Button>
                </form>
            </Form>

            <DrawerFooter>
                
                <Button className="text-red-500 bg-red-200">Delete</Button>
            </DrawerFooter>
        </DrawerContent>
    </Drawer>
  )
}

export default EditTaskForm