import { PlusIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

export const StudioUploadModal = () => {
    return (
        <Button className="text-sm [&_svg]:size-5" variant="secondary">
            <PlusIcon />
            Create
        </Button>
    )
}
