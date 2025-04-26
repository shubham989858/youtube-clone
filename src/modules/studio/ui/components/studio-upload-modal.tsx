"use client"

import { Loader2Icon, PlusIcon } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { trpc } from "@/trpc/client"

export const StudioUploadModal = () => {
    const utils = trpc.useUtils()

    const create = trpc.videos.create.useMutation({
        onSuccess: () => {
            toast.success("New video added")

            utils.studio.getMany.invalidate()
        },
        onError: (error) => toast.error(error.message),
    })

    return (
        <Button className="text-sm [&_svg]:size-5" variant="secondary" disabled={create.isPending} onClick={() => create.mutate()}>

            {create.isPending ? (
                <Loader2Icon className="animate-spin transition-transform" />
            ) : (
                <PlusIcon />
            )}

            Create
        </Button>
    )
}
