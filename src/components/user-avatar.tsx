import { cva, VariantProps } from "class-variance-authority"

import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

const userAvatarVariants = cva("", {
    variants: {
        size: {
            default: "h-9 w-9",
            xs: "h-4 w-4",
            sm: "h-6 w-6",
            lg: "h-10 w-10",
            xl: "h-[160px] w-[160px]",
        },
        defaultVariants: {
            size: "default",
        },
    },
})

interface UserAvatarProps extends VariantProps<typeof userAvatarVariants> {
    imageUrl: string,
    name: string,
    className?: string,
    onClick?: () => void,
}

export const UserAvatar = ({
    size,
    imageUrl,
    name,
    className,
    onClick,
}: UserAvatarProps) => {
    return (
        <Avatar className={cn(userAvatarVariants({
            size,
            className,
        }))} onClick={onClick}>
            <AvatarImage src={imageUrl} alt={name} />
        </Avatar>
    )
}
