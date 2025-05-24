import { integer, pgEnum, pgTable, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core"
import { createId } from "@paralleldrive/cuid2"
import { relations } from "drizzle-orm"
import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-zod"

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

export const videoVisibility = pgEnum("video_visibility", [
    "private",
    "public",
])

export const videos = pgTable("videos", {
    id: text("id").primaryKey().$defaultFn(() => createId()),
    title: text("title").notNull(),
    description: text("description"),
    muxStatus: text("mux_status"),
    muxAssetId: text("mux_asset_id").unique(),
    muxUploadId: text("mux_upload_id").unique(),
    muxPlaybackId: text("mux_playback_id").unique(),
    muxTrackId: text("mux_track_id").unique(),
    muxTrackStatus: text("mux_track_status"),
    thumbnailUrl: text("thumbnail_url"),
    thumbnailKey: text("thumbnail_key"),
    previewUrl: text("preview_url"),
    previewKey: text("preview_key"),
    duration: integer("duration").default(0).notNull(),
    visibility: videoVisibility("visibility").default("private").notNull(),
    userId: text("user_id").notNull().references(() => users.id, {
        onDelete: "cascade",
    }),
    categoryId: text("category_id").references(() => categories.id, {
        onDelete: "set null",
    }),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
})

export const videoInsertSchema = createInsertSchema(videos)

export const videoUpdateSchema = createUpdateSchema(videos)

export const videoSelectSchema = createSelectSchema(videos)

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