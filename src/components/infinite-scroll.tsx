"use client"

import { useEffect } from "react"

import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import { INTERSECTION_OBSERVER_ROOT_MARGIN, INTERSECTION_OBSERVER_THRESHOLD } from "@/lib/constants"
import { Button } from "@/components/ui/button"

interface InfiniteScrollProps {
    isManual?: boolean,
    hasNextPage: boolean,
    isFetchingNextPage: boolean,
    fetchNextPage: () => void,
}

export const InfiniteScroll = ({
    isManual,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
}: InfiniteScrollProps) => {
    const { targetRef, isIntersecting } = useIntersectionObserver({
        threshold: INTERSECTION_OBSERVER_THRESHOLD,
        rootMargin: INTERSECTION_OBSERVER_ROOT_MARGIN,
    })

    useEffect(() => {
        if (isIntersecting && hasNextPage && !isFetchingNextPage && !isManual) {
            fetchNextPage()
        }
    }, [isIntersecting, hasNextPage, isFetchingNextPage, isManual, fetchNextPage])

    return (
        <div className="flex flex-col items-center gap-4 p-4">
            <div className="h-1" ref={targetRef} />

            {hasNextPage ? (
                <Button variant="secondary" disabled={isFetchingNextPage || !hasNextPage} onClick={() => fetchNextPage()}>

                    {isFetchingNextPage ? "Loading..." : "Load more"}

                </Button>
            ) : (
                <p className="text-xs text-muted-foreground">You've reached the end.</p>
            )}

        </div>
    )
}
