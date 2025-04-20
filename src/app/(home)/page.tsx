import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"

import { HydrateClient, trpc } from "@/trpc/server"
import { HomeView } from "@/modules/home/ui/views/home-view"
import { PageClient } from "./page-client"

const Page = async () => {
  void trpc.hello.prefetch({
    text: "Shubham",
  })

  return (
    <HydrateClient>
      <Suspense fallback={<p>Loading...</p>}>
        <ErrorBoundary fallback={<p>Error...</p>}>
          <PageClient />
        </ErrorBoundary>
      </Suspense>
    </HydrateClient>
  )
}

export default Page