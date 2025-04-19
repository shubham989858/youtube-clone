import { UserCircle } from "lucide-react"
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"

import { Button } from "@/components/ui/button"

export const AuthButton = () => {
    return (
        <>
            <SignedIn>
                <UserButton />
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
