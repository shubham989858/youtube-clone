"use client"

import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"
import Link from "next/link"
import { format } from "date-fns"
import { Globe2Icon, LockIcon } from "lucide-react"

import { DEFAULT_LIMIT } from "@/lib/constants"
import { trpc } from "@/trpc/client"
import { InfiniteScroll } from "@/components/infinite-scroll"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { VideoThumbnail } from "@/modules/videos/ui/components/video-thumbnail"
import { snakeCaseToTitle } from "@/lib/utils"

export const VideosSection = () => {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <ErrorBoundary fallback={<p>Error...</p>}>
                <VideosSectionSuspense />
            </ErrorBoundary>
        </Suspense>
    )
}

const VideosSectionSuspense = () => {
    const [videos, query] = trpc.studio.getMany.useSuspenseInfiniteQuery({
        limit: DEFAULT_LIMIT,
    }, {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
    })

    return (
        <div>
            <div className="border-y">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="pl-6 w-[510px]">Video</TableHead>
                            <TableHead>Visibility</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">Views</TableHead>
                            <TableHead className="text-right">Comments</TableHead>
                            <TableHead className="text-right pr-6">Likes</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>

                        {videos.pages.flatMap((page) => page.items).map((item, index) => (
                            <Link key={index} href={`/studio/videos/${item.id}`} legacyBehavior>
                                <TableRow className="cursor-pointer">
                                    <TableCell>
                                        <div className="flex items-center gap-4">
                                            <div className="relative aspect-video w-36 shrink-0">
                                                <VideoThumbnail imageUrl={item.thumbnailUrl} previewUrl={item.previewUrl} title={item.title} duration={item.duration || 0} />
                                            </div>
                                            <div className="flex flex-col overflow-hidden gap-y-1">
                                                <span className="text-sm line-clamp-1">{item.title}</span>
                                                <span className="text-xs text-muted-foreground line-clamp-1">{item.description || "Description not set"}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center">

                                            {item.visibility === "private" ? (
                                                <LockIcon className="size-4 mr-2" />
                                            ) : (
                                                <Globe2Icon className="size-4 mr-2" />
                                            )}

                                            {snakeCaseToTitle(item.visibility)}

                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center">{snakeCaseToTitle(item.muxStatus || "error")}</div>
                                    </TableCell>
                                    <TableCell className="text-sm truncate">{format(new Date(item.createdAt), "d MMM yyyy")}</TableCell>
                                    <TableCell className="text-right">Views</TableCell>
                                    <TableCell className="text-right">Comments</TableCell>
                                    <TableCell className="text-right pr-6">Likes</TableCell>
                                </TableRow>
                            </Link>
                        ))}

                    </TableBody>
                </Table>
            </div>
            <InfiniteScroll hasNextPage={query.hasNextPage} isFetchingNextPage={query.isFetchingNextPage} fetchNextPage={query.fetchNextPage} isManual={false} />
        </div>
    )
}
