import Image from "next/image"

import { formatDuration } from "@/lib/utils"
import { THUMBNAIL_FALLBACK } from "@/lib/constants"

interface VideoThumbnailProps {
    imageUrl?: string | null,
    previewUrl?: string | null,
    title: string,
    duration: number,
}

export const VideoThumbnail = ({
    imageUrl,
    previewUrl,
    title,
    duration,
}: VideoThumbnailProps) => {
    return (
        <div className="relative group">
            <div className="relative w-full overflow-hidden rounded-xl aspect-video">
                <Image className="size-full object-cover group-hover:opacity-0" src={imageUrl || THUMBNAIL_FALLBACK} alt={title} fill quality={100} priority loading="eager" />
                <Image className="size-full object-cover opacity-0 group-hover:opacity-100" src={previewUrl || THUMBNAIL_FALLBACK} alt={title} fill quality={100} priority loading="eager" unoptimized={!!previewUrl} />
            </div>
            <div className="absolute bottom-2 right-2 px-1 py-0.5 rounded bg-black/80 text-white text-xs font-medium">{formatDuration(duration)}</div>
        </div>
    )
}
