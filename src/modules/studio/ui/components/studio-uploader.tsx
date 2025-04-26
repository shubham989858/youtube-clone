import MuxUploader, { MuxUploaderDrop, MuxUploaderFileSelect, MuxUploaderProgress, MuxUploaderStatus } from "@mux/mux-uploader-react"
import { UploadIcon } from "lucide-react"

import { MUX_UPLOADER_ID } from "@/lib/constants"
import { Button } from "@/components/ui/button"

interface StudioUploaderProps {
    endpoint?: string | null,
    onSuccess: () => void,
}

export const StudioUploader = ({
    endpoint,
    onSuccess,
}: StudioUploaderProps) => {
    return (
        <div>
            <MuxUploader className="hidden group/uploader" id={MUX_UPLOADER_ID} endpoint={endpoint} onSuccess={onSuccess} />
            <MuxUploaderDrop className="group/drop" muxUploader={MUX_UPLOADER_ID}>
                <div className="flex flex-col items-center gap-6" slot="heading">
                    <div className="flex items-center justify-center gap-2 rounded-full bg-muted h-32 w-32">
                        <UploadIcon className="size-10 text-muted-foreground group/drop-[&[active]]:animate-bounce transition-all duration-300" />
                    </div>
                    <div className="flex flex-col gap-2 text-center">
                        <p className="text-sm">Upload Video Files</p>
                        <p className="text-xs text-muted-foreground">Drag & drop video files to upload</p>
                    </div>
                    <MuxUploaderFileSelect muxUploader={MUX_UPLOADER_ID}>
                        <Button className="rounded-full" type="button">Select Files</Button>
                    </MuxUploaderFileSelect>
                </div>
                <span className="hidden" slot="separator" />
                <MuxUploaderStatus className="text-sm" muxUploader={MUX_UPLOADER_ID} />
                <MuxUploaderProgress className="text-xs" type="percentage" muxUploader={MUX_UPLOADER_ID} />
                <MuxUploaderProgress type="bar" muxUploader={MUX_UPLOADER_ID} />
            </MuxUploaderDrop>
        </div>
    )
}
