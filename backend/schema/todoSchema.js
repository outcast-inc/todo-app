import mongoose from "mongoose";

export const ToDoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            required: true,
        },
        start_date: {
            type: Date,
            default: Date.now(),
        },
        end_date: {
            type: Date,
            default: Date.now(),
        },
        status: {
            type: String,
            enum: ['complete', 'pending'],
            default: 'pending',
        },
        listId: {
            type: mongoose.Schema.ObjectId,
            ref: 'List'
        },
        workspaceId: {
            type: mongoose.Schema.ObjectId,
            ref: 'Workspace'
        },
        reason: {
            type: String,
            trim: true,
        }
    },
    {
        collection: 'todos'
    }
);

export const ToDo = mongoose.model('Todo', ToDoSchema);