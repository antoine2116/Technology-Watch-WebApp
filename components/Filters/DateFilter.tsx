import { useEffect, useState } from "react";
import { useArticles } from "@/contexts/ArticlesContext";
import Datepicker from "react-tailwindcss-datepicker";


interface DateFilterProps {
    name: string,
    selectHandler: (...args: any) => void
}


export const DateFilter = ({ name, selectHandler }: DateFilterProps) => {

    const { activeFromDate, activeToDate, setActiveFromDate, setActiveToDate } = useArticles()


    const [startDate, setStartDate] = useState<any>(activeFromDate);
    const [endDate, setEndDate] = useState<any>(activeToDate);

    useEffect(() => {

        let end = null;
        if (endDate?.startDate != null) {
            end = new Date(endDate.startDate)
        }

        let start = null;
        if (startDate?.startDate != null) {
            start = new Date(startDate.startDate)
        }



        selectHandler(start, end)
    }, [startDate, endDate]);


    const handleFromDateChange = (date: any) => {
        if (date == null || date?.startDate == null) {
            setStartDate(null)
        }
        setStartDate(date)
    }

    const handleToDateChange = (date: any) => {
        if (date == null || date?.startDate == null) {
            setEndDate(null)
        }
        setEndDate(date)
    }



    return (
        <div date-rangepicker={"true"} className="grid w-full flex-wrap grid-cols-1 gap-5 text-gray-700">
            <label className="block text-white font-bold">{name}</label>
            <div className=" col-span-1">
                <Datepicker
                    primaryColor={"blue"}
                    value={startDate}
                    placeholder={"From"}
                    onChange={handleFromDateChange}
                    asSingle={true}
                    useRange={false}
                    popoverDirection={"up"}
                    displayFormat={"DD/MM/YYYY"}
                    startWeekOn={'mon'}


                />
            </div>

            <div className=" col-span-1">
                <Datepicker
                    primaryColor={"blue"}
                    placeholder={"To"}
                    value={endDate}
                    onChange={handleToDateChange}
                    asSingle={true}
                    useRange={false}
                    popoverDirection={"up"}
                    displayFormat={"DD/MM/YYYY"}
                    startWeekOn={'mon'}

                />
            </div>
        </div>
    )
}