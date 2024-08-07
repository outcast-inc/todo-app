import gql from "graphql-tag";

export const CREATE_LIST = gql`
    mutation CreateList($input: ListCreate!) {
        createList(input: $input) {
            id
            name
            icon
        }
    }
`;

export const UPDATE_LIST = gql`
    mutation UpdateList($input: ListUpdate!) {
        updateList(input: $input) {
            id
            name
            icon
        }
    }
`;

export const DELETE_LIST = gql`
    mutation DeleteList($input: DeleteInput!) {
        deleteList(input: $input) {
            id
            name
            icon
        }
    }
`;

// Workspace
export const CREATE_WORKSPACE = gql`
    mutation CreateWorkspace($input: WorkspaceCreate!) {
        createWorkspace(input: $input) {
            id
            name
            icon
            color
        }
    }
`;

export const UPDATE_WORKSPACE = gql`
    mutation UpdateWorkspace($input: WorkspaceUpdate!) {
        updateWorkspace(input: $input) {
            id
            name
            icon
            color
        }
    }
`;

export const DELETE_WORKSPACE = gql`
    mutation DeleteWorkspace($input: DeleteInput!) {
        deleteWorkspace(input: $input) {
            id
            name
            icon
            color
        }
    }
`;

// TODOS
export const CREATE_TODO = gql`
    mutation CreateWorkspace($input: TodoCreate!) {
        createTodo(input: $input) {
            id
            title
            start_date
            end_date
            status
            listId
            workspaceId
        }
    }
`;

export const UPDATE_TODO = gql`
    mutation UpdateTodo($input: TodoUpdate!) {
        updateTodo(input: $input) {
            id
            title
            start_date
            end_date
            status
            listId
            workspaceId
        }
    }
`;

export const UPDATE_TODO_STATUS = gql`
    mutation UpdateTodoStatus($input: TodoStatusUpdate!) {
        updateTaskStatus(input: $input) {
            id
            title
            start_date
            end_date
            status
            listId
            workspaceId
        }
    }
`;

export const DELETE_TODO = gql`
    mutation DeleteTodo($input: DeleteInput!) {
        deleteTodo(input: $input) {
            id
            title
            start_date
            end_date
            status
            listId
            workspaceId
        }
    }
`;