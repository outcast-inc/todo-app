"use client"

import CollapsibleList from "@/components/CollapsibleList";
import NewTaskComponent from "@/components/NewTaskComponent";
import { Sidebar } from "@/components/Sidebar";
import TaskItem from "@/components/TaskItem";
import { getIdentity } from "@/lib/actions/auth.actions";
import { getListTodoEntries, getSelectedListEntries, getSelectedWorkspaceEntries } from "@/lib/actions/list.actions";
import { completedTodos, todaysTasks } from "@/lib/actions/todo.actions";
import { icons, LayoutGrid } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


type SearchParamProps = {
  searchParams: Record<string, string> | null | undefined;
};

export default function Home({ searchParams }: SearchParamProps) {

  const showModal = searchParams?.show || ""
  const modelType = searchParams?.type || ""
  const navName = searchParams?.name || "Home"
  const currentDate = new Date()
  const accessToken = localStorage.getItem("accessToken")

  const [todoItems, setTodoItems] = useState([]);
  const [todoList, setTodoList] = useState([]);

  const router = useRouter();

  const userIdentity = async() => {
    const value = await getIdentity(accessToken!);
    if(value?.data?.getIdentity === null) {
      localStorage.clear();
      router.push("/login")
    }
  }

  if(!accessToken) router.push("/login")
  else userIdentity();

  const getNameSpecificEntries = async () => {
    switch (navName) {
      case 'Personal':
        return await getSelectedListEntries(navName);
      case 'Work':
        return await getSelectedListEntries(navName);
      case 'Home':
        return await getListTodoEntries();
      default:
        return [];
    }
  }

  const getStatusSpecificEntries = async () => {
    switch (navName) {
      case 'Today':
        return await todaysTasks(currentDate);
      case 'Completed':
        return await completedTodos();
      case 'Home':
        return await todaysTasks(currentDate);
      default:
        return [];
    }
  }

  const getWorkspaceSpecificEntries = async () => {
    const workspaceTodos = await getSelectedWorkspaceEntries(navName);
    setTodoItems(workspaceTodos.nodes);
  }

  const fetchTodoEntries = async () => {
    const todoEntries = await getNameSpecificEntries();
    setTodoItems(todoEntries.nodes)

    const todos = await getStatusSpecificEntries();
    setTodoList(todos.nodes)
  }

  const refreshComponent = () => {
    if(modelType === 'workspace')
      getWorkspaceSpecificEntries()
    else
      fetchTodoEntries();
  }

  useEffect(() => {
    if(modelType === 'workspace')
      getWorkspaceSpecificEntries()
    else
      fetchTodoEntries();
  }, [navName])

  const formatter = new Intl.DateTimeFormat('en-GB', {dateStyle: 'full'});
  const TopItemIcon = icons[navName === 'Completed' ? "Check" : "Calendar"]
  
  return (
      <div className="h-screen max-h-screen">
        <Sidebar modelType={modelType} showModal={showModal} navName={navName}/>

        <div className="p-4 sm:ml-96">
          <div className="p-4 space-y-6">
            <section className="ml-6 space-y flex-1 w-full flex items-center p-2 text-gray-900 rounded-lg dark:text-white">
              <div className="flex-1 ms-3 whitespace-nowrap space-y-2">
                <h2 className="text-3xl font-semibold">Good Evening, TestUser</h2>

                <p className="text-muted-foreground text-md">It's {formatter.format(new Date())}</p>
              </div>
              <LayoutGrid className="mr-6 inline-flex items-center justify-center w-6 h-6 font-medium text-gray-800 bg-white rounded-lg dark:bg-blue-900 dark:text-gray-300" />
            </section>

            <NewTaskComponent modelType={modelType} showModal={showModal} refreshComponent={refreshComponent}/>

            {todoList && (<TaskItem key={100}>
              <CollapsibleList 
                key={100}
                id={""}
                title={navName === 'Completed' ? "Completed" : "Today"}
                subtasks={todoList || []}
                count={todoList ? todoList.length : 0}
                iconname={navName === 'Completed' ? "Check" : "Calendar"}
                icon={
                  <TopItemIcon 
                    className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  />
                }
              />
            </TaskItem>)}
            
            {todoItems && todoItems.map((task, index) => {
              const DefaultIcon = icons[task.icon]
              return (
              <TaskItem key={index}>
                <CollapsibleList 
                  key={index}
                  id={task._id}
                  title={task.name}
                  subtasks={task?.todoEntries}
                  count={task.count}
                  iconname={task.icon}
                  icon={
                    <DefaultIcon 
                      className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    />
                  }
                />
              </TaskItem>)
            })
            }
          </div>
        </div>
      </div>
  );
}
