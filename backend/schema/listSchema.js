import mongoose from "mongoose";

export const ListSchema = new mongoose.Schema(
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
            required: true,
        }
    },
    {
        collection: 'lists'
    }
);

export const ListType = mongoose.model('List', ListSchema);
