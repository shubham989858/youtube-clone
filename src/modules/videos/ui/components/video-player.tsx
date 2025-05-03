"use client"

import { THUMBNAIL_FALLBACK } from "@/lib/constants"
import MuxPlayer from "@mux/mux-player-react"

interface VideoPlayerProps {
    playbackId?: string | null | undefined,
    thumbnailUrl?: string | null | undefined,
    autoPlay?: boolean,
    onPlay?: () => void,
}

export const VideoPlayer = ({
    playbackId,
    thumbnailUrl,
    autoPlay,
    onPlay,
}: VideoPlayerProps) => {
    return (
        <MuxPlayer className="w-full h-full object-contain" accentColor="#f61c0d" onPlay={onPlay} playbackId={playbackId || ""} poster={thumbnailUrl || THUMBNAIL_FALLBACK} playerInitTime={0} autoPlay={autoPlay} thumbnailTime={0} />
    )
}
