import { z } from "zod";

export const CreateListSchema = z.object({
    name: z
        .string()
        .min(2, "List name must be at least 2 characters")
        .max(500, "List name must be at most 500 characters"),
    icon: z.string().optional(),
});

export const CreateWorkspaceSchema = z.object({
    name: z
        .string()
        .min(2, "List name must be at least 2 characters")
        .max(500, "List name must be at most 500 characters"),
    icon: z.string().optional(),
});

export const CreateTodoSchema = z.object({
    title: z
        .string()
        .min(2, "Title must be at least 2 characters")
        .max(500, "Title must be at most 500 characters"),
    start_date: z.coerce.date(),
    end_date: z.coerce.date(),
    status: z.string().default("pending"),
    listType: z.string().default("Today"),
    reason: z.string().optional(),
});

export const userAuthSchema = z.object({
    email: z.string().min(1, { message: "Email is required" })
    .email({
        message: "Email is invalid"
    }),
    password: z.string().min(1, { message: "Password is required" }),
});