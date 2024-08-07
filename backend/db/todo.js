import { ToDo } from '../schema/todoSchema.js'


export async function countTodos() {
    return await ToDo.countDocuments();
}

export async function getTodo(id) {
    return await ToDo.findById(id);
}

export async function getAllTodos() {
    return await ToDo.find();
}

export async function createTodo(title, start_data, end_date, status, listId, workspaceId) {
    return await ToDo.create({ title, start_data, end_date, status, listId, workspaceId })
}

export async function updateTodo(id, title, start_date, end_date, status, listId, workspaceId, reason) {
    return await ToDo.findByIdAndUpdate(id, { title, start_date, end_date, status, listId, workspaceId, reason });
}

export async function deleteTodo(id) {
    return await ToDo.findByIdAndDelete(id);
}

export async function todaysTask(current_date) {
    const start = new Date(current_date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(current_date);
    end.setHours(23, 59, 59, 999);
    return await ToDo.find({
        start_date: {
            $gte: start,
            $lte: end
        }
    }).sort('start_date');
}

export async function completedTasks() {
    return await ToDo.find({status: 'complete'}).sort('start_date')
}

export async function updateTaskStatus(id, status) {
    return ToDo.findByIdAndUpdate(id, {status})
}