import { Metadata } from "next"
import { Inter } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs"

import { cn } from "@/lib/utils"
import "@/app/globals.css"
import { TRPCProvider } from "@/trpc/client"

const inter = Inter({
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "PlayTube",
}

interface RootLayoutProps {
  children: React.ReactNode,
}

const RootLayout = ({
  children,
}: RootLayoutProps) => {
  return (
    <ClerkProvider afterSignOutUrl="/">
      <html className="h-full antialiased" lang="en" suppressHydrationWarning>
        <body className={cn("h-full min-w-[360px] antialiased", inter.className)}>
          <TRPCProvider>{children}</TRPCProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}

export default RootLayout