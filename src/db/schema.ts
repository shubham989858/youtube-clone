import { pgTable, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core"
import { createId } from "@paralleldrive/cuid2"
import { relations } from "drizzle-orm"

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

export const usersRelations = relations(users, ({
    many,
}) => ({
    videos: many(videos)
}))

export const categories = pgTable("categories", {
    id: text("id").primaryKey().$defaultFn(() => createId()),
    name: text("name").notNull().unique(),
    description: text("description"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
}, (t) => [
    uniqueIndex("name_idx").on(t.name),
])

export const categoriesRelations = relations(categories, ({
    many,
}) => ({
    videos: many(videos)
}))

export const videos = pgTable("videos", {
    id: text("id").primaryKey().$defaultFn(() => createId()),
    title: text("title").notNull(),
    description: text("description"),
    userId: text("user_id").notNull().references(() => users.id, {
        onDelete: "cascade",
    }),
    categoryId: text("category_id").references(() => categories.id, {
        onDelete: "set null",
    }),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
})

export const videosRelations = relations(videos, ({
    one,
}) => ({
    user: one(users, {
        fields: [videos.userId],
        references: [users.id],
    }),
    category: one(categories, {
        fields: [videos.categoryId],
        references: [categories.id],
    }),
}))