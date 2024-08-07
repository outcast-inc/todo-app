import mongoose from "mongoose";

export const WorkspaceSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            unique: true,
        },
        icon: {
            type: String,
            trim: true,
        },
        color: {
            type: String,
            trim: true,
        }
    },
    {
        collection: 'workspaces'
    }
);

export const Workspace = mongoose.model('Workspace', WorkspaceSchema);