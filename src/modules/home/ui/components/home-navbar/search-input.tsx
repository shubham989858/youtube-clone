import { SearchIcon } from "lucide-react"

export const SearchInput = () => {
    return (
        <form className="flex w-full max-w-[600px]">
            <div className="relative w-full">
                <input className="w-full pl-4 py-2 pr-12 rounded-l-full border focus:outline-none focus-visible:outline-none focus:border-blue-500" type="text" placeholder="Search" />
            </div>
            <button className="px-5 py-2.5 bg-gray-100 border border-l-0 rounded-r-full hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none transition-colors" type="submit">
                <SearchIcon className="size-5" />
            </button>
        </form>
    )
}
