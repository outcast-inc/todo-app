import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
        },
        email: {
            type: String,
            lowercase: true,
            trim: true,
            unique: true,
            required: true
        },
        password: {
            type: String,
            trim: true,
            required: true
        }
    },
    {
        collection: 'users',
    }
);

export const User = mongoose.model('User', UserSchema);
// export const UserTC = 