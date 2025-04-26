"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { VideoIcon, LogOutIcon } from "lucide-react"

import { Separator } from "@/components/ui/separator"
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"

export const StudioSidebarActions = () => {
    const pathname = usePathname()

    return (
        <>
            <SidebarMenuItem>
                <SidebarMenuButton tooltip="Content" asChild isActive={pathname === "/studio"}>
                    <Link className="flex items-center gap-4" href="/studio">
                        <VideoIcon className="size-5" />
                        <span className="text-sm">Content</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <Separator />
            <SidebarMenuItem>
                <SidebarMenuButton tooltip="Exit Studio" asChild>
                    <Link className="flex items-center gap-4" href="/">
                        <LogOutIcon className="size-5" />
                        <span className="text-sm">Exit Studio</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </>
    )
}
