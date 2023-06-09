import { useState } from "react";
import { useArticles } from "@/contexts/ArticlesContext";

{ }

const Search = () => {

    const { setQuery } = useArticles()
    const [value, setValue] = useState("");



    let timer: ReturnType<typeof setTimeout>;
    const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
        clearTimeout(timer);
        var ms = 300;
        var val = e.currentTarget.value;

        setValue(val)
        timer = setTimeout(function () {
            setQuery(val)
        }, ms);
    }

    return (
        <div className="flex justify-center flex-grow h-full">
            <label htmlFor="simple-search" className="sr-only">Search</label>
            <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor"
                        viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clipRule="evenodd">
                        </path>
                    </svg>
                </div>
                <input onChange={handleSearch}
                    value={value}
                    type="text" id="simple-search"
                    className="bg-gray-50  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-none focus:border-blue-500 block w-full pl-10 h-full  "
                    placeholder="Search" required />
            </div>
        </div>
    )
}

export default Search