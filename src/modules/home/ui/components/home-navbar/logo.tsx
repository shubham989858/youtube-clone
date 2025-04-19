import Image from "next/image"
import Link from "next/link"

interface LogoProps {
    label?: string,
}

export const Logo = ({
    label = "PlayTube",
}: LogoProps) => {
    return (
        <Link href="/">
            <div className="p-4 flex items-center gap-1">
                <Image className="size-8" src="/images/logo.svg" alt="Logo" width={32} height={32} quality={100} loading="eager" priority />
                <p className="text-xl font-semibold tracking-tight">{label}</p>
            </div>
        </Link>
    )
}
