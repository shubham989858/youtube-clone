"use client"

import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"

import { trpc } from "@/trpc/client"
import { CategoriesCarousel } from "@/modules/home/ui/components/categories-carousel"

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
        <CategoriesCarousel isLoading />
    )
}

type CategoriesSectionSuspenseProps = CategoriesSectionProps

const CategoriesSectionSuspense = ({
    categoryId,
}: CategoriesSectionSuspenseProps) => {
    const [categories] = trpc.categories.getMany.useSuspenseQuery()

    const data = categories.map((item) => ({
        value: item.id,
        label: item.name,
    }))

    return (
        <CategoriesCarousel value={categoryId} data={data} />
    )
}
