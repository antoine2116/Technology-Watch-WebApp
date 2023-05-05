import {useArticles} from "@/contexts/ArticlesContext";
import {TextFilter} from "@/components/Filters/TextFilter";
import {DateFilter} from "@/components/Filters/DateFilter";
import {useEffect} from "react";
import OutsideClickHandler from "react-outside-click-handler";


interface FilterProps {
    showFilters: boolean
    setShowFilters: (show: boolean) => void
}
const Filters = ({showFilters, setShowFilters} : FilterProps) => {

    const {authors, sources, setActiveAuthors, setActiveSources, setActiveFromDate, setActiveToDate } = useArticles()


    const authorChangeHandler = (authorsSelected: string[]) => {
        console.log("Selected authors", authorsSelected)
        setActiveAuthors([...authorsSelected])
    }
    const sourceChangeHandler = (sourcesSelected: string[]) => {
        setActiveSources([...sourcesSelected])
    }

    const datesChangeHandler = (from : Date, to: Date) => {
        console.log("Dates changed", from, to)

        setActiveFromDate(from)
        setActiveToDate(to)
    }

    return (
        <OutsideClickHandler onOutsideClick={() => setShowFilters(false)}>
            <div className={`w-screen md:w-full bg-gray-600 rounded-t-3xl md:rounded-none py-2 px-4 absolute h-3/5 ${showFilters ? 'bottom-0' :  "bottom-[-100%]"} shadow-xl text-white transition-all ease-in-out duration-300`}>
                <div className={"w-full flex justify-center mb-2"}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M0 12h48" />
                    </svg>
                </div>
                <div className={"w-full flex mb-2"}>
                    <h1 className={"text-2xl"}>Filters</h1>
                </div>
                <div className={"grid grid-cols-1 gap-8"}>
                    <TextFilter name={"Author"} options={authors} selectHandler={authorChangeHandler}/>
                    <TextFilter name={"Source"} options={sources} selectHandler={sourceChangeHandler}/>
                    <DateFilter name={"Dates"} selectHandler={datesChangeHandler}/>
                </div>

            </div>
        </OutsideClickHandler>


    )


}

export default Filters;