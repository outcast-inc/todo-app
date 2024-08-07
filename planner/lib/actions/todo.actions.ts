"use server"

import { CREATE_TODO, DELETE_TODO, UPDATE_TODO, UPDATE_TODO_STATUS } from "@/graphql/mutations"
import client from "../apolloClient"
import { parseStringify } from "../utils"
import { FETCH_COMPLETED_TODOS, FETCH_TODAYS_TODOS, FETCH_TODOS } from "@/graphql/queries"

const createClient = client()

export const createTodoEntry = async(todoData: any) => {
    try {
        const todoEntry = await createClient.mutate({
            variables: { input: todoData },
            mutation: CREATE_TODO,
        });

        return parseStringify(todoEntry)
    } catch (error) {
        console.log(error)
    }
}

export const getTodoEntries = async() => {
    try {
        const todoEntries = await createClient.query({
            query: FETCH_TODOS,
            fetchPolicy: 'network-only'
        });
        console.log("todos", todoEntries)
        return parseStringify(todoEntries.data.todos)
    } catch (error) {
        console.log(error)
    }
}

export const updateTodoEntries = async(id: any, todoData: any) => {
    try {
        console.log(todoData)
        const todoEntry = await createClient.mutate({
            variables: {
                input: {
                    id,
                    update: {...todoData}
                }
            },
            mutation: UPDATE_TODO,
        });

        return parseStringify(todoEntry);
    } catch (error) {
        console.log(error);
    }
}

export const deleteTodo = async(id: any) => {
    try {
        const todoItem = await createClient.mutate({
            variables: {
                input: {id}
            },
            mutation: DELETE_TODO
        });

        return parseStringify(todoItem)
    } catch (error) {
        console.log(error)
    }
}

export const todaysTasks = async(current_date: Date) => {
    try {
        const todoItems = await createClient.query({
            variables: {
                current_date
            },
            query: FETCH_TODAYS_TODOS
        });

        return parseStringify(todoItems.data.todaysTask)
    } catch(error) {
        console.log(error)
    }
}

export const completedTodos = async () => {
    try {
        const completedItems = await createClient.query({
            query: FETCH_COMPLETED_TODOS,
            fetchPolicy: 'network-only'
        });
        return parseStringify(completedItems.data.completedTasks)
    } catch (error) {
        console.log(error)
    }
}

export const updateTodoStatus = async (id: string, status: string) => {
    try {
        const todoItem = await createClient.mutate({
            variables: {
                    input: {
                    id,
                    status
                }
            },
            mutation: UPDATE_TODO_STATUS,
        })
        return parseStringify(todoItem)
    } catch (error) {
        console.log(error)
    }
}