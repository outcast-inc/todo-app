import { getUser } from "./db/user.js";
import { createList, deleteList, getAllLists, getAllListTodos, getList, getSelectedListTodos, getSelectedWorkspaceTodos, updateList } from "./db/list.js"
import { createWorkspace, deleteWorkspace, getAllWorkspaces, getWorkspace, updateWorkspace } from "./db/workspace.js"
import { completedTasks, createTodo, deleteTodo, getAllTodos, getTodo, todaysTask, updateTaskStatus, updateTodo } from "./db/todo.js"
import { checkToken, loginCallback } from "./auth.js";

export const resolvers = {
    Query: {
        login: async(_root, {login: {username, password}}) => {
            const output = await loginCallback(username, password)
            return {...output}
        },
        getIdentity: async(_root, { accessToken }) => {
            const output = await checkToken(accessToken);
            return output;
        },
        me: async(_root, {}, context) => {
            console.log(context)
            const user = context.user;
            return user;
        },
        user: async(_root, { id }, context) => {
            const user = await getUser(id);
            return user;
        },
        list: async(_root, { id }, context) => {
            const listtype = await getList(id);
            return listtype;
        },
        lists: async(_root, {}, context) => {
            const nodes = await getAllLists();
            const totalCount = nodes.length;
            return {nodes, totalCount};
        },
        listTodos: async(_root, {}, context) => {
            const nodes = await getAllListTodos();
            const totalCount = nodes.length;
            return {nodes, totalCount};
        },
        selectedListItems: async(_root, { listName }, context) => {
            const nodes = await getSelectedListTodos(listName);
            const totalCount = nodes.length;
            return { nodes, totalCount };
        },
        selectedWorkspaceItems: async(_root, { workspaceId }, context) => {
            const nodes = await getSelectedWorkspaceTodos(workspaceId);
            const totalCount = nodes.length;
            return { nodes, totalCount };
        },
        workspace: async(_root, { id }, context) => {
            const workspace = await getWorkspace(id);
            return workspace;
        },
        workspaces: async(_root, {}, context) => {
            const nodes = await getAllWorkspaces();
            const totalCount = nodes.length;

            return {nodes, totalCount}
        },
        todo: async(_root, { id }, context) => {
            const todo = await getTodo(id);
            return todo;
        },
        todos: async(_root, {}, context) => {
            const nodes = await getAllTodos();
            const totalCount = nodes.length;
            return {nodes, totalCount}
        },
        todaysTask: async(_root, { current_date }, context) => {
            const nodes = await todaysTask(current_date);
            const totalCount = nodes.length;
            return {nodes, totalCount}
        },
        completedTasks: async (_root, {}, context) => {
            const nodes = await completedTasks();
            const totalCount = nodes.length;
            return {nodes, totalCount}
        }
    },
    Mutation: {
        // createUser: async(_root, { input: { user: { name, email, password } } }) => {
        //     const user = await registerUser(name, email, password);
        //     return user;
        // },
        
        createList: async(_root, {input: {list: { name, icon }}}) => {
            const list = await createList(name, icon);
            return list;
        },
        updateList: async(_root, { input: { id, update: { name, icon } } }) => {
            const list = await updateList( id, name, icon );
            return list;
        },
        deleteList: async(_root, { input: { id } } ) => {
            const list = await deleteList(id);
            return list;
        },

        createWorkspace: async(_root, {input: {workspace: { name, icon, color }}}) => {
            const workspace = await createWorkspace(name, icon, color);
            return workspace;
        },
        updateWorkspace: async(_root, { input: { id, update: { name, icon, color } } }) => {
            const workspace = await updateWorkspace( id, name, icon, color );
            return workspace;
        },
        deleteWorkspace: async(_root, { input: { id } } ) => {
            const workspace = await deleteWorkspace(id);
            return workspace;
        },

        createTodo: async(_root, {input: {todo: { title, start_date, end_date, status, listId, workspaceId }}}) => {
            const todo = await createTodo(title, start_date, end_date, status, listId, workspaceId);
            return todo;
        },
        updateTodo: async(_root, { input: { id, update: { title, start_date, end_date, status, listId, workspaceId, reason } } }) => {
            const todo = await updateTodo(id, title, start_date, end_date, status, listId, workspaceId, reason);
            return todo;
        },
        updateTaskStatus: async (_root, {input: { id, status }}, context) => {
            const todo = await updateTaskStatus(id, status);
            return todo;
        },
        deleteTodo: async(_root, { input: { id } } ) => {
            const todo = await deleteTodo(id);
            return todo;
        },
    }
}