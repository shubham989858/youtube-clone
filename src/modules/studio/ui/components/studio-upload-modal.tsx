"use client"

import { Loader2Icon, PlusIcon } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { trpc } from "@/trpc/client"
import { ResponsiveModal } from "@/components/responsive-modal"
import { StudioUploader } from "@/modules/studio/ui/components/studio-uploader"

export const StudioUploadModal = () => {
    const router = useRouter()

    const utils = trpc.useUtils()

    const create = trpc.videos.create.useMutation({
        onSuccess: () => {
            toast.success("New video added")

            utils.studio.getMany.invalidate()
        },
        onError: (error) => toast.error(error.message),
    })

    const onSuccess = () => {
        if (!!create.data?.video.id) {
            create.reset()

            router.push(`/studio/videos/${create.data.video.id}`)
        }
    }

    return (
        <>
            <ResponsiveModal title="Upload Video" open={!!create.data?.url} onOpenChange={() => create.reset()}>

                {!!create.data?.url ? (
                    <StudioUploader endpoint={create.data.url} onSuccess={onSuccess} />
                ) : (
                    <Loader2Icon className="size-5 animate-spin transition-transform" />
                )}

            </ResponsiveModal>
            <Button className="text-sm [&_svg]:size-5" variant="secondary" disabled={create.isPending} onClick={() => create.mutate()}>

                {create.isPending ? (
                    <Loader2Icon className="animate-spin transition-transform" />
                ) : (
                    <PlusIcon />
                )}

                Create
            </Button>
        </>
    )
}
