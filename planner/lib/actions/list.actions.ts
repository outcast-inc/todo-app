"use server";

import { revalidatePath } from "next/cache";
import client from "../apolloClient";
import { CREATE_LIST, DELETE_LIST, UPDATE_LIST } from "@/graphql/mutations";
import { FETCH_LIST_TODOS, FETCH_LISTS, FETCH_SELECTED_LIST_TODOS, FETCH_SELECTED_WORKSPACE_TODOS } from "@/graphql/queries";
import { parseStringify } from "../utils";

const createClient = client()

export const createListEntry = async(listData: any) => {
  try {
    const listEntry = await createClient.mutate({
      variables: {input: listData},
      mutation: CREATE_LIST,
  });

  revalidatePath("/");
  return parseStringify(listEntry);
  } catch (error) {
    console.log(error)
  }
}

export const getListsEntry = async() => {
  try {
    const listEntries = await createClient.query({
      query: FETCH_LISTS,
      fetchPolicy: 'network-only'
    })
    return parseStringify(listEntries.data.lists);
  } catch (error) {
    console.log(error)
  }
}

export const getListTodoEntries = async () => {
  try {
    const listTodoEntries = await createClient.query({
      query: FETCH_LIST_TODOS,
      fetchPolicy: 'network-only'
    })
    return parseStringify(listTodoEntries.data.listTodos)
  } catch (error) {
    console.log(error);
  }
}

export const getSelectedListEntries = async (listName: string) => {
  try {
    const listEntries = await createClient.query({
      query: FETCH_SELECTED_LIST_TODOS,
      variables: {
        listName
      },
      fetchPolicy: 'network-only'
    })
    return parseStringify(listEntries.data.selectedListItems)
  } catch (error) {
    console.log(error)
  }
}

export const getSelectedWorkspaceEntries = async (workspaceId: string) => {
  try {
    const listEntries = await createClient.query({
      query: FETCH_SELECTED_WORKSPACE_TODOS,
      variables: {
        workspaceId
      },
      fetchPolicy: 'network-only'
    })
    console.log(listEntries)
    return parseStringify(listEntries.data.selectedWorkspaceItems)
  } catch (error) {
    console.log(error)
  }
}

export const updateListItem = async(id: string, name: string, icon: string) => {
  try {
    const updatedEntries = await createClient.mutate({
      mutation: UPDATE_LIST,
      variables: { input: {
          id,
          update: {
            name,
            icon
          }
        }
      }
    });
    return parseStringify(updatedEntries);
  } catch (error) {
    console.log(error);
  }
}

export const deleteList = async(id: any) => {
  try {
      const wkspace = await createClient.mutate({
          variables: {
              input: {id}
          },
          mutation: DELETE_LIST
      });

      return parseStringify(wkspace)
  } catch (error) {
      console.log(error)
  }
}