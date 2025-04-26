import { pgTable, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core"
import { createId } from "@paralleldrive/cuid2"

export const users = pgTable("users", {
    id: text("id").primaryKey().$defaultFn(() => createId()),
    clerkId: text("clerk_id").notNull().unique(),
    email: text("email").notNull().unique(),
    name: text("name").notNull(),
    imageUrl: text("image_url").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
}, (t) => [
    uniqueIndex("clerk_id_idx").on(t.clerkId),
])

export const categories = pgTable("categories", {
    id: text("id").primaryKey().$defaultFn(() => createId()),
    name: text("name").notNull().unique(),
    description: text("description"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
}, (t) => [
    uniqueIndex("name_idx").on(t.name),
])