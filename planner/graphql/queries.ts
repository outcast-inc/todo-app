import gql from "graphql-tag";

// User Query
export const LOGIN_USER = gql`
    query LoginUser($login: LoginInput!) {
        login(login: $login) {
            accessToken
            error
        }
    }
`;

export const GET_IDENTITY = gql`
    query GetIdentity($accessToken: String!) {
        getIdentity(accessToken: $accessToken) {
            id
            email
        }
    }
`;

export const FETCH_ME = gql`
    query Me {
        me {
            name
        }
    }
`;

export const FETCH_USER = gql`
    query User($id: ID!) {
        user(id: $id) {
            name
            email
        }
    }
`;

export const FETCH_LIST = gql`
    query List($id: ID!) {
        list(id: $id) {
            name
            icon
        }
    }
`;

export const FETCH_LISTS = gql`
    query Lists {
        lists {
            nodes {
                id
                name
                icon
            }
            totalCount
        }
    }
`;

export const FETCH_LIST_TODOS = gql`
    query ListTodos {
        listTodos {
            nodes {
                _id
                name
                icon
                todoEntries {
                    _id
                    title
                    start_date
                    end_date
                    status
                }
                count
            }
            totalCount
        }
    }
`;

export const FETCH_SELECTED_LIST_TODOS = gql`
    query SelectedListTodos($listName: String!) {
        selectedListItems(listName: $listName) {
            nodes {
                _id
                name
                icon
                todoEntries {
                    _id
                    title
                    start_date
                    end_date
                    status
                }
                count
            }
            totalCount
        }
    }
`;

export const FETCH_SELECTED_WORKSPACE_TODOS = gql`
    query SelectedWorkspaceTodos($workspaceId: ID!) {
        selectedWorkspaceItems(workspaceId: $workspaceId) {
            nodes {
                _id
                name
                icon
                todoEntries {
                    _id
                    title
                    start_date
                    end_date
                    status
                }
                count
            }
            totalCount
        }
    }
`;

export const FETCH_WORKSPACE = gql`
    query Workspace($id: ID!) {
        workspace(id: $id) {
            name
            icon
        }
    }
`;

export const FETCH_WORKSPACES = gql`
    query Workspace {
        workspaces {
            nodes {
                id
                name
                icon
                color
            }
            totalCount
        }
    }
`;

export const FETCH_TODO = gql`
    query Todo($id: ID!) {
        todo(id: $id) {
            title
            start_date
            end_date
            status
            listId
            workspaceId
        }
    }
`;

export const FETCH_TODOS = gql`
    query Todos {
        todos {
            nodes {
                id
                title
                start_date
                end_date
                status
                listId
                workspaceId
            }
            totalCount
        }
    }
`;

export const FETCH_TODAYS_TODOS = gql`
    query TodaysTodos($current_date: DateTime!) {
        todaysTask(current_date: $current_date) {
            nodes {
                id
                title
                start_date
                end_date
                status
                listId
                workspaceId
            }
            totalCount
        }
    }
`;

export const FETCH_COMPLETED_TODOS = gql`
    query CompletedTodos {
        completedTasks {
            nodes {
                id
                title
                start_date
                end_date
                status
                listId
                workspaceId
            }
            totalCount
        }
    }
`;