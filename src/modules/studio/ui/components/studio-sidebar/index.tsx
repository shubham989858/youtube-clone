"use client"

import { StudioSidebarActions } from "@/modules/studio/ui/components/studio-sidebar/studio-sidebar-actions"
import { StudioSidebarHeader } from "@/modules/studio/ui/components/studio-sidebar/studio-sidebar-header"
import { Sidebar, SidebarContent, SidebarGroup, SidebarMenu } from "@/components/ui/sidebar"

export const StudioSidebar = () => {
    return (
        <Sidebar className="pt-16 z-40" collapsible="icon">
            <SidebarContent className="bg-background">
                <SidebarGroup>
                    <SidebarMenu>
                        <StudioSidebarHeader />
                        <StudioSidebarActions />
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
