"use client"

import { ClapperboardIcon, UserCircle } from "lucide-react"
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"

export const AuthButton = () => {
    const pathname = usePathname()

    return (
        <>
            <SignedIn>
                <div className="flex items-center gap-x-4">

                    {!pathname.startsWith("/studio") && (
                        <Button className="text-sm [&_svg]:size-5" variant="secondary" asChild>
                            <Link href="/studio">
                                <ClapperboardIcon />
                                Studio
                            </Link>
                        </Button>
                    )}

                    <UserButton />
                </div>
            </SignedIn>
            <SignedOut>
                <SignInButton>
                    <Button className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-500 border-blue-500/20 rounded-full shadow-none [&_svg]:size-5" variant="outline">
                        <UserCircle />
                        Sign in
                    </Button>
                </SignInButton>
            </SignedOut>
        </>
    )
}
