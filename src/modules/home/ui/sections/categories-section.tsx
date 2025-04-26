"use client"

import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { useRouter } from "next/navigation"

import { trpc } from "@/trpc/client"
import { FilterCarousel } from "@/components/filter-carousel"

interface CategoriesSectionProps {
    categoryId?: string,
}

export const CategoriesSection = ({
    categoryId,
}: CategoriesSectionProps) => {
    return (
        <Suspense fallback={<CategoriesSectionSkeleton />}>
            <ErrorBoundary fallback={<p>Error...</p>}>
                <CategoriesSectionSuspense categoryId={categoryId} />
            </ErrorBoundary>
        </Suspense>
    )
}

const CategoriesSectionSkeleton = () => {
    return (
        <FilterCarousel isLoading />
    )
}

type CategoriesSectionSuspenseProps = CategoriesSectionProps

const CategoriesSectionSuspense = ({
    categoryId,
}: CategoriesSectionSuspenseProps) => {
    const router = useRouter()

    const [categories] = trpc.categories.getMany.useSuspenseQuery()

    const data = categories.map((item) => ({
        value: item.id,
        label: item.name,
    }))

    const onSelect = (value: string | null) => {
        const url = new URL(window.location.href)

        if (!!value) {
            url.searchParams.set("categoryId", value)
        } else {
            url.searchParams.delete("categoryId")
        }

        router.push(url.toString())
    }

    return (
        <FilterCarousel value={categoryId} data={data} onSelect={onSelect} />
    )
}
