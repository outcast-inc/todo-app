import { Workspace } from '../schema/workspaceSchema.js'


export async function countWorkspaces() {
    return await Workspace.countDocuments();
}

export async function getWorkspace(id) {
    return await Workspace.findById(id);
}

export async function getAllWorkspaces() {
    return await Workspace.find();
}

export async function createWorkspace(name, icon, color) {
    return await Workspace.create({ name, icon, color })
}

export async function updateWorkspace(id, name, icon, color) {
    return await Workspace.findByIdAndUpdate(id, { name, icon, color });
}

export async function deleteWorkspace(id) {
    return await Workspace.findByIdAndDelete(id);
}