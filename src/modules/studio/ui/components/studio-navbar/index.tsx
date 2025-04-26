import { Logo } from "@/components/logo"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { AuthButton } from "@/modules/auth/ui/components/auth-button"
import { StudioUploadModal } from "@/modules/studio/ui/components/studio-upload-modal"

export const StudioNavbar = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 h-16 bg-white flex items-center px-2 pr-5 z-50 border-b">
            <div className="flex items-center gap-4 w-full">
                <div className="flex items-center flex-shrink-0">
                    <SidebarTrigger />
                    <Logo label="PlayStudio" href="/studio" />
                </div>
                <div className="flex-1" />
                <div className="flex-shrink-0 items-center flex gap-4">
                    <StudioUploadModal />
                    <AuthButton />
                </div>
            </div>
        </nav>
    )
}
