import { eq } from "drizzle-orm"
import { VideoAssetDeletedWebhookEvent, VideoAssetCreatedWebhookEvent, VideoAssetErroredWebhookEvent, VideoAssetReadyWebhookEvent, VideoAssetTrackReadyWebhookEvent } from "@mux/mux-node/resources/webhooks"
import { headers } from "next/headers"
import { UTApi } from "uploadthing/server"

import { mux } from "@/lib/mux"
import { db } from "@/db"
import { videos } from "@/db/schema"
import { MUX_IMAGE_URL } from "@/lib/constants"

type WebhookEvent = VideoAssetCreatedWebhookEvent | VideoAssetErroredWebhookEvent | VideoAssetReadyWebhookEvent | VideoAssetTrackReadyWebhookEvent | VideoAssetDeletedWebhookEvent

const SIGNING_SECRET = process.env.MUX_WEBHOOK_SECRET

export const POST = async (request: Request) => {
    if (!SIGNING_SECRET) {
        throw new Error("MUX_WEBHOOK_SECRET not set")
    }

    const headersPayload = await headers()

    const muxSignature = headersPayload.get("mux-signature")

    if (!muxSignature) {
        return new Response("Mux signature not found.", {
            status: 400,
        })
    }

    const payload = await request.json()

    const body = JSON.stringify(payload)

    mux.webhooks.verifySignature(body, {
        "mux-signature": muxSignature,
    }, SIGNING_SECRET)

    switch (payload.type as WebhookEvent["type"]) {
        case "video.asset.created": {
            const data = payload.data as VideoAssetCreatedWebhookEvent["data"]

            if (!data.upload_id) {
                return new Response("Upload ID not found.", {
                    status: 400,
                })
            }

            await db.update(videos).set({
                muxAssetId: data.id,
                muxStatus: data.status,
            }).where(eq(videos.muxUploadId, data.upload_id))

            break
        }

        case "video.asset.ready": {
            const data = payload.data as VideoAssetReadyWebhookEvent["data"]

            const playbackId = data.playback_ids?.[0].id

            if (!data.upload_id) {
                return new Response("Upload ID not found.", {
                    status: 400,
                })
            }

            if (!playbackId) {
                return new Response("Missing Playback ID.", {
                    status: 400,
                })
            }

            const tempThumbnailUrl = `${MUX_IMAGE_URL}/${playbackId}/thumbnail.jpg`

            const tempPreviewUrl = `${MUX_IMAGE_URL}/${playbackId}/animated.gif`

            const duration = data.duration ? Math.round(data.duration) : 0

            const utApi = new UTApi()

            const [uploadedThumbnail, uploadedPreview] = await utApi.uploadFilesFromUrl([
                tempThumbnailUrl,
                tempPreviewUrl,
            ])

            if (!uploadedThumbnail.data) {
                return new Response("Failed to upload thumbnail image", {
                    status: 500,
                })
            }

            if (!uploadedPreview.data) {
                return new Response("Failed to upload preview image", {
                    status: 500,
                })
            }

            const { key: thumbnailKey, url: thumbnailUrl } = uploadedThumbnail.data

            const { key: previewKey, url: previewUrl } = uploadedPreview.data

            await db.update(videos).set({
                muxStatus: data.status,
                muxPlaybackId: playbackId,
                muxAssetId: data.id,
                thumbnailUrl,
                thumbnailKey,
                previewUrl,
                previewKey,
                duration,
            }).where(eq(videos.muxUploadId, data.upload_id))

            break
        }

        case "video.asset.errored": {
            const data = payload.data as VideoAssetErroredWebhookEvent["data"]

            if (!data.upload_id) {
                return new Response("Upload ID not found.", {
                    status: 400,
                })
            }

            await db.update(videos).set({
                muxStatus: data.status,
            }).where(eq(videos.muxUploadId, data.upload_id))

            break
        }

        case "video.asset.deleted": {
            const data = payload.data as VideoAssetDeletedWebhookEvent["data"]

            if (!data.upload_id) {
                return new Response("Upload ID not found.", {
                    status: 400,
                })
            }

            await db.delete(videos).where(eq(videos.muxUploadId, data.upload_id))

            break
        }

        case "video.asset.track.ready": {
            const data = payload.data as VideoAssetTrackReadyWebhookEvent["data"] & {
                asset_id: string,
            }

            const assetId = data.asset_id

            const trackId = data.id

            const status = data.status

            if (!assetId) {
                return new Response("Asset ID not found.", {
                    status: 400,
                })
            }

            await db.update(videos).set({
                muxTrackId: trackId,
                muxTrackStatus: status,
            }).where(eq(videos.muxAssetId, assetId))

            break
        }
    }

    return new Response("Webhook received", {
        status: 200,
    })
}