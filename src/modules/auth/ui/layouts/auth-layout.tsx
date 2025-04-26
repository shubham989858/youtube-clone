import { Logo } from "@/components/logo"

interface AuthLayoutProps {
    children: React.ReactNode
}

export const AuthLayout = ({
    children,
}: AuthLayoutProps) => {
    return (
        <main className="min-h-screen overflow-y-auto flex items-center justify-center flex-col gap-6">
            <Logo />
            <div>{children}</div>
        </main>
    )
}
