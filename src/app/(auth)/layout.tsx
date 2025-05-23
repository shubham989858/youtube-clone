import { AuthLayout } from "@/modules/auth/ui/layouts/auth-layout"

interface LayoutProps {
    children: React.ReactNode,
}

const Layout = ({
    children,
}: LayoutProps) => {
    return (
        <AuthLayout>{children}</AuthLayout>
    )
}

export default Layout