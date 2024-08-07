import mongoose from "mongoose";
import { ListType } from '../schema/listSchema.js'

ListType.createCollection();

export async function countLists() {
    return await ListType.countDocuments();
}

export async function getList(id) {
    return await ListType.findById(id);
}

export async function getAllLists() {
    return await ListType.find();
}

export async function getAllListTodos() {
    return await ListType.aggregate([
        { $match: { name : { $nin: ["Home", "Completed", "Today"] }} },
        { $sort: {_id: 1} },
        {
            $lookup: {
                from: "todos",
                localField: "_id",
                foreignField: "listId",
                as: "todoEntries",
                pipeline: [{
                    $sort: {start_date : 1}
                }]
            }
        }, {
            $project: {
                _id: 1,
                name: 1,
                icon: 1,
                todoEntries: 1,
                count: { $size: "$todoEntries" }
            }
        }
    ]);
}

export async function getSelectedListTodos(listName) {
    return await ListType.aggregate([
        { $match: { name : listName} },
        { $sort: {_id: 1} },
        {
            $lookup: {
                from: "todos",
                localField: "_id",
                foreignField: "listId",
                as: "todoEntries",
                pipeline: [{
                    $sort: {start_date : 1}
                }]
            }
        }, {
            $project: {
                _id: 1,
                name: 1,
                icon: 1,
                todoEntries: 1,
                count: { $size: "$todoEntries" }
            }
        }
    ]);
}

export async function getSelectedWorkspaceTodos(workspaceId) {
    return await ListType.aggregate([
        {$sort : {_id: 1}},
        {
            $lookup: {
                from: "todos",
                localField: "_id",
                foreignField: "listId",
                as: "todoEntries",
                pipeline: [
                    {$match: {"workspaceId": new mongoose.Types.ObjectId(workspaceId)}},
                    {$sort: {start_date : 1}}
                ]
            }
        }, {
            $project: {
                _id: 1,
                name: 1,
                icon: 1,
                todoEntries: 1,
                count: { $size: "$todoEntries" }
            }
        }
    ]);
}

export async function createList(name, icon) {
    return await ListType.create({ name, icon })
}

export async function updateList(id, name, icon) {
    return await ListType.findByIdAndUpdate(id, { name, icon });
}

export async function deleteList(id) {
    return await ListType.findByIdAndDelete(id);
}