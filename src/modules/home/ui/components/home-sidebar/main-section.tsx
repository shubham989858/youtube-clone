"use client"

import { FlameIcon, HomeIcon, LucideIcon, PlaySquareIcon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"

const items: {
    title: string,
    url: string,
    icon: LucideIcon,
    auth?: boolean,
}[] = [
        {
            title: "Home",
            url: "/",
            icon: HomeIcon,
        }, {
            title: "Subscriptions",
            url: "/feed/subscriptions",
            icon: PlaySquareIcon,
            auth: true,
        }, {
            title: "Trending",
            url: "/feed/trending",
            icon: FlameIcon,
        },
    ]

export const MainSection = () => {
    const pathname = usePathname()

    return (
        <SidebarGroup>
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
