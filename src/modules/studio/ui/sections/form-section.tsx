"use client"

import { Suspense, useState } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { CopyCheckIcon, CopyIcon, Globe2Icon, ImagePlusIcon, LockIcon, MoreVerticalIcon, RotateCcwIcon, SparklesIcon, TrashIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"

import { videoUpdateSchema } from "@/db/schema"
import { trpc } from "@/trpc/client"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormMessage, FormItem, FormLabel } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { VideoPlayer } from "@/modules/videos/ui/components/video-player"
import { APP_URL, THUMBNAIL_FALLBACK } from "@/lib/constants"
import { snakeCaseToTitle } from "@/lib/utils"
import { ThumbnailUploadModal } from "@/modules/studio/ui/components/thumbnail-upload-modal"

interface FormSectionProps {
    videoId: string,
}

export const FormSection = ({
    videoId,
}: FormSectionProps) => {
    return (
        <Suspense fallback={<FormSectionSkeleton />}>
            <ErrorBoundary fallback={<p>Error...</p>}>
                <FormSectionSuspense videoId={videoId} />
            </ErrorBoundary>
        </Suspense>
    )
}

export const FormSectionSkeleton = () => {
    return (
        <div>FormSectionSkeleton</div>
    )
}

type FormSectionSuspenseProps = FormSectionProps

const FormSectionSuspense = ({
    videoId,
}: FormSectionSuspenseProps) => {
    const [thumbnailUploadModalOpen, setThumbnailUploadModalOpen] = useState(false)

    const router = useRouter()

    const [isCopied, setIsCopied] = useState(false)

    const utils = trpc.useUtils()

    const remove = trpc.videos.remove.useMutation({
        onSuccess: () => {
            utils.studio.getMany.invalidate()

            toast.success("Video removed successfully.")

            router.push("/studio")
        },
        onError: (error) => toast.error(error.message),
    })

    const update = trpc.videos.update.useMutation({
        onSuccess: () => {
            utils.studio.getMany.invalidate()

            utils.studio.getOne.invalidate({
                id: videoId
            })

            toast.success("Video updated successfully.")
        },
        onError: (error) => toast.error(error.message),
    })

    const [video] = trpc.studio.getOne.useSuspenseQuery({
        id: videoId,
    })

    const fullUrl = `${APP_URL}/videos/${video.id}`

    const onCopy = async () => {
        await navigator.clipboard.writeText(fullUrl)

        setIsCopied(true)

        setTimeout(() => {
            setIsCopied(false)
        }, 2000)
    }

    const [categories] = trpc.categories.getMany.useSuspenseQuery()

    const form = useForm<z.infer<typeof videoUpdateSchema>>({
        defaultValues: video,
        resolver: zodResolver(videoUpdateSchema),
    })

    const onSubmit = (data: z.infer<typeof videoUpdateSchema>) => {
        update.mutate(data)
    }

    return (
        <>
            <ThumbnailUploadModal open={thumbnailUploadModalOpen} onOpenChange={setThumbnailUploadModalOpen} videoId={videoId} />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-2xl font-bold">Edit Video</h1>
                            <p className="text-xs text-muted-foreground">Modify your video details</p>
                        </div>
                        <div className="flex items-center gap-x-2">
                            <Button type="submit" disabled={update.isPending}>Save</Button>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button className="[&_svg]:size-5" variant="ghost" size="icon">
                                        <MoreVerticalIcon />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => remove.mutate({
                                        id: video.id,
                                    })} disabled={remove.isPending}>
                                        <TrashIcon className="size-4 mr-2" />
                                        Remove
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                        <div className="space-y-8 lg:col-span-3">
                            <FormField control={form.control} name="title" render={({
                                field,
                            }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Add title for your video" disabled={update.isPending} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="description" render={({
                                field,
                            }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea className="resize-none pr-10" rows={10} placeholder="Add description for your video" disabled={update.isPending} {...field} value={field.value || ""} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="thumbnailUrl" render={() => (
                                <FormItem>
                                    <FormLabel>Thumbnail</FormLabel>
                                    <FormControl>
                                        <div className="p-0.5 border border-dashed border-neutral-400 relative h-[84px] w-[153px] aspect-video group">
                                            <Image className="object-cover" src={video.thumbnailUrl || THUMBNAIL_FALLBACK} fill alt="Thumbnail" quality={100} priority loading="eager" />
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button className="bg-black/50 hover:bg-black/50 absolute top-1 right-1 rounded-full opacity-100 md:opacity-0 group-hover:opacity-100 duration-300 size-7" type="button" size="icon">
                                                        <MoreVerticalIcon className="text-white" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="start" side="right">
                                                    <DropdownMenuItem onClick={() => setThumbnailUploadModalOpen(true)}>
                                                        <ImagePlusIcon className="size-4 mr-1" />
                                                        Change
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <SparklesIcon className="size-4 mr-1" />
                                                        AI Generated
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <RotateCcwIcon className="size-4 mr-1" />
                                                        Restore
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </FormControl>
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="categoryId" render={({
                                field,
                            }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value || undefined} disabled={update.isPending}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select category for your video" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>

                                            {categories.map((item, index) => (
                                                <SelectItem key={index} value={item.id}>{item.name}</SelectItem>
                                            ))}

                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="visibility" render={({
                                field,
                            }) => (
                                <FormItem>
                                    <FormLabel>Visibility</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value || undefined} disabled={update.isPending}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Set visibility for your video" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="public">
                                                <div className="flex items-center">
                                                    <Globe2Icon className="size-4 mr-2" />
                                                    Public
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="private">
                                                <div className="flex items-center">
                                                    <LockIcon className="size-4 mr-2" />
                                                    Private
                                                </div>
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        </div>
                        <div className="flex flex-col gap-y-8 lg:col-span-2">
                            <div className="flex flex-col gap-4 bg-[#f9f9f9] rounded-xl overflow-hidden h-fit">
                                <div className="aspect-video overflow-hidden relative">
                                    <VideoPlayer playbackId={video.muxPlaybackId} thumbnailUrl={video.thumbnailUrl} />
                                </div>
                                <div className="p-4 flex flex-col gap-y-6">
                                    <div className="flex justify-between items-center gap-x-2">
                                        <div className="flex flex-col gap-y-1">
                                            <p className="text-muted-foreground text-xs">Link</p>
                                            <div className="flex items-center gap-x-2">
                                                <Link href={`/videos/${video.id}`}>
                                                    <p className="line-clamp-1 text-sm text-blue-500 break-all">{fullUrl}</p>
                                                </Link>
                                                <Button className="shrink-0" disabled={isCopied} type="button" variant="ghost" size="icon" onClick={onCopy}>

                                                    {isCopied ? (
                                                        <CopyCheckIcon className="size-5" />
                                                    ) : (
                                                        <CopyIcon className="size-5" />
                                                    )}

                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="flex flex-col gap-y-1">
                                            <p className="text-muted-foreground text-xs">Status</p>
                                            <p className="text-sm">{snakeCaseToTitle(video.muxStatus || "preparing")}</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="flex flex-col gap-y-1">
                                            <p className="text-muted-foreground text-xs">Captions Status</p>
                                            <p className="text-sm">{snakeCaseToTitle(video.muxTrackStatus || "no_captions")}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </Form>
        </>
    )
}
