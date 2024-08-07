"use server"

import { CREATE_WORKSPACE, DELETE_WORKSPACE, UPDATE_WORKSPACE } from "@/graphql/mutations"
import client from "../apolloClient"
import { parseStringify } from "../utils"
import { FETCH_WORKSPACES } from "@/graphql/queries"

const createClient = client()

export const createWorkspaceEntry = async(workspaceData: any) => {
    try {
        const workspaceEntry = await createClient.mutate({
            variables: { input: workspaceData },
            mutation: CREATE_WORKSPACE,
        });

        return parseStringify(workspaceEntry)
    } catch (error) {
        console.log(error)
    }
}

export const getWorkspaceEntries = async() => {
    try {
        const workspaceEntries = await createClient.query({
            query: FETCH_WORKSPACES,
            fetchPolicy: 'network-only'
        });
        return parseStringify(workspaceEntries.data.workspaces)
    } catch (error) {
        console.log(error)
    }
}

export const updateWorkspaceEntries = async(id: string, name: string, color: string) => {
    try {
        const workspaceEntry = await createClient.mutate({
            variables: {
                input: {
                    id,
                    update: {
                        name,
                        color,
                        icon: "none"
                    }
                }
            },
            mutation: UPDATE_WORKSPACE,
        });

        return parseStringify(workspaceEntry);
    } catch (error) {
        console.log(error);
    }
}

export const deleteWorkspace = async(id: any) => {
    try {
        const wkspace = await createClient.mutate({
            variables: {
                input: {id}
            },
            mutation: DELETE_WORKSPACE
        });

        return parseStringify(wkspace)
    } catch (error) {
        console.log(error)
    }
}