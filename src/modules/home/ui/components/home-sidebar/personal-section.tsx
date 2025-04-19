"use client"

import { HistoryIcon, ListVideoIcon, LucideIcon, ThumbsUpIcon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"

const items: {
    title: string,
    url: string,
    icon: LucideIcon,
    auth?: boolean,
}[] = [
        {
            title: "History",
            url: "/playlists/history",
            icon: HistoryIcon,
            auth: true,
        }, {
            title: "Liked Videos",
            url: "/playlists/liked",
            icon: ThumbsUpIcon,
            auth: true,
        }, {
            title: "All Playlists",
            url: "/playlists",
            icon: ListVideoIcon,
            auth: true,
        },
    ]

export const PersonalSection = () => {
    const pathname = usePathname()

    return (
        <SidebarGroup>
            <SidebarGroupLabel>You</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>

                    {items.map((item, index) => (
                        <SidebarMenuItem key={index}>
                            <SidebarMenuButton tooltip={item.title} asChild isActive={pathname === item.url}>
                                <Link className="flex items-center gap-4" href={item.url}>
                                    <item.icon />
                                    <span className="text-sm">{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}

                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}
