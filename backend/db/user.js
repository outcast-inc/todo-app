import DataLoader from 'dataloader';
import {User} from '../schema/userSchema.js';

export async function countUsers() {
    return await User.countDocuments();
}

export function createUserLoader() {
    return new DataLoader(async (ids) => {
        const users = await User.find();
        return ids.map((id) => users.find((user) => user.id === id));
    });
};

export async function getUser(id) {
    return await User.findById(id);
}

export async function getUserByEmail(email) {
    return await User.where({ email }).findOne();
}

export async function registerUser(name, email, password) {
    return await User.create({ name, email, password })
}