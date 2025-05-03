import { and, eq } from "drizzle-orm"
import { z } from "zod"

import { createTRPCRouter, protectedProcedure } from "@/trpc/init"
import { db } from "@/db"
import { videos, videoUpdateSchema } from "@/db/schema"
import { mux } from "@/lib/mux"
import { TRPCError } from "@trpc/server"
import { MUX_IMAGE_URL } from "@/lib/constants"

export const videosRouter = createTRPCRouter({
    create: protectedProcedure.mutation(async ({
        ctx,
    }) => {
        const { id: userId } = ctx.user

        const upload = await mux.video.uploads.create({
            new_asset_settings: {
                passthrough: userId,
                playback_policy: ["public"],
                input: [
                    {
                        generated_subtitles: [
                            {
                                language_code: "en",
                                name: "English",
                            },
                        ],
                    },
                ],
            },
            cors_origin: "*",
        })

        const [video] = await db.insert(videos).values({
            title: "Untitled",
            muxStatus: "waiting",
            muxUploadId: upload.id,
            userId,
        }).returning()

        return {
            video,
            url: upload.url,
        }
    }),
    update: protectedProcedure.input(videoUpdateSchema).mutation(async ({
        ctx,
        input,
    }) => {
        const { id: userId } = ctx.user

        const { id, title, description, categoryId, visibility } = input

        if (!id) {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: "Video not found.",
            })
        }

        const [updatedVideo] = await db.update(videos).set({
            title,
            description,
            categoryId,
            visibility,
        }).where(and(
            eq(videos.userId, userId),
            eq(videos.id, id),
        )).returning()

        if (!updatedVideo) {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: "Video not found",
            })
        }

        return updatedVideo
    }),
    remove: protectedProcedure.input(z.object({
        id: z.string(),
    })).mutation(async ({
        ctx,
        input,
    }) => {
        const { id: userId } = ctx.user

        const [removedVideo] = await db.delete(videos).where(and(
            eq(videos.userId, userId),
            eq(videos.id, input.id),
        )).returning()

        if (!removedVideo) {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: "Video not found",
            })
        }

        return removedVideo
    }),
    restoreThumbnail: protectedProcedure.input(z.object({
        id: z.string(),
    })).mutation(async ({
        ctx,
        input,
    }) => {
        const { id: userId } = ctx.user

        const [existingVideo] = await db.select().from(videos).where(and(
            eq(videos.id, input.id),
            eq(videos.userId, userId),
        ))

        if (!existingVideo) {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: "Video not found.",
            })
        }

        if (!existingVideo.muxPlaybackId) {
            throw new TRPCError({
                code: "BAD_REQUEST",
                message: "Video Playback ID is missing.",
            })
        }

        const thumbnailUrl = `${MUX_IMAGE_URL}/${existingVideo.muxPlaybackId}/thumbnail.jpg`

        const [updatedVideo] = await db.update(videos).set({
            thumbnailUrl,
        }).where(and(
            eq(videos.id, input.id),
            eq(videos.userId, userId),
        )).returning()

        return updatedVideo
    }),
})