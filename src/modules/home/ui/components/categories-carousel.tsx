"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

interface CategoriesCarouselProps {
    value?: string | null,
    isLoading?: boolean,
    data?: {
        value: string,
        label: string,
    }[],
}

export const CategoriesCarousel = ({
    value,
    isLoading,
    data,
}: CategoriesCarouselProps) => {
    const [api, setApi] = useState<CarouselApi>()

    const [current, setCurrent] = useState(0)

    const [count, setCount] = useState(0)

    useEffect(() => {
        if (!!api) {
            setCount(api.scrollSnapList().length)

            setCurrent(api.selectedScrollSnap() + 1)

            api.on("select", () => setCurrent(api.selectedScrollSnap() + 1))
        }
    }, [api])

    return (
        <div className="relative w-full">
            <div className={cn("absolute left-12 top-0 bottom-0 w-12 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none", current === 1 && "hidden")} />
            <Carousel className="w-full px-12" setApi={setApi} opts={{
                align: "start",
                dragFree: true,
            }}>
                <CarouselContent className="-ml-3">

                    {!isLoading ? (
                        <>
                            <CarouselItem className="pl-3 basis-auto">
                                <Link href="/">
                                    <Badge className="rounded-lg px-3 py-1 cursor-pointer whitespace-nowrap text-xs" variant={!value ? "default" : "secondary"}>All</Badge>
                                </Link>
                            </CarouselItem>

                            {data?.map((item, index) => (
                                <CarouselItem className="pl-3 basis-auto" key={index}>
                                    <Link href={`/?categoryId=${item.value}`}>
                                        <Badge className="rounded-lg px-3 py-1 cursor-pointer whitespace-nowrap text-xs" variant={value === item.value ? "default" : "secondary"}>{item.label}</Badge>
                                    </Link>
                                </CarouselItem>
                            ))}

                        </>
                    ) : (
                        <>

                            {Array.from({
                                length: 20,
                            }).map((_, index) => (
                                <CarouselItem className="pl-3 basis-auto" key={index}>
                                    <Skeleton className="rounded-lg px-3 py-1 h-full text-[12.5px] w-[100px] font-semibold">&nbsp;</Skeleton>
                                </CarouselItem>
                            ))}

                        </>
                    )}

                </CarouselContent>
                <CarouselPrevious className="left-0 z-20" />
                <CarouselNext className="right-0 z-20" />
            </Carousel>
            <div className={cn("absolute right-12 top-0 bottom-0 w-12 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none", current === count && "hidden")} />
        </div >
    )
}
