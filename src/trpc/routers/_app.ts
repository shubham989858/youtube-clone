import { createTRPCRouter } from "@/trpc/init"
import { categoriesRouter } from "@/modules/categories/server/procedures"
import { studioRouter } from "@/modules/studio/server/procedures"
import { videosRouter } from "@/modules/videos/server/procedures"

export const appRouter = createTRPCRouter({
    categories: categoriesRouter,
    studio: studioRouter,
    videos: videosRouter,
})

export type AppRouter = typeof appRouter