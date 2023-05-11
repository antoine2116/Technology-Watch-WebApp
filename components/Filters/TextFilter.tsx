import { Simulate } from "react-dom/test-utils";
import select = Simulate.select;
import { MouseEventHandler, useEffect, useReducer, useState } from "react";

interface FilterProps {
    name: string,
    options: string[],
    selectHandler: (...args: any) => void
}

interface SelectedOption {
    name: string,
    index: number
}
export const TextFilter = ({ name, options, selectHandler }: FilterProps) => {

    const [selected, setSelected] = useState<Set<SelectedOption>>(new Set())
    const [initialOptions, setInitialOptions] = useState<string[]>(options)

    useEffect(() => {
        setInitialOptions(options)
    }, [options]);



    const selectOption = (e: any) => {
        const option = e.target.dataset.option
        let values = Array.from(selected.values())
        let opt = values.find((v) => {

            if (v.name == option) {
                return v
            }
        })
        //e.target.classList.toggle("bg-lime-500")

        if (opt != undefined) {
            removeFromSelection(option)
        } else {
            addToSelection(option)
        }
    }

    const addToSelection = (option: string) => {

        let index = initialOptions.indexOf(option)
        if (index == -1) {
            return
        }
        initialOptions[index] = null

        let opt = {
            name: option,
            index
        } as SelectedOption

        let s = selected
        s.add(opt)
        setSelected(s)
        selectHandler(Array.from(s.values()).map((v) => v.name))


    }

    const removeFromSelection = (option: string) => {

        let values = Array.from(selected.values())
        let opt = values.find((v) => v.name == option)

        if (opt == undefined) {
            return
        }

        initialOptions[opt.index] = option

        let s = selected
        s.delete(opt)
        setSelected(s)
        selectHandler(Array.from(s.values()).map((v) => v.name))
    }


    return (
        <div className="flex flex-col">
            <label htmlFor={name} className={"font-bold"}>{name}</label>

            <div className="flex overflow-y-auto py-2">
                {initialOptions.map((option, index) =>

                    option != undefined && (
                        <div className={'p-1 w-fit'} key={index}>
                            <button onClick={selectOption}
                                data-option={option}
                                className={"p-2 text-xs whitespace-nowrap rounded-md border-lime-500 border-2  ring-0 flex text-wrap w-25"}>
                                {option}
                            </button>
                        </div>
                    )

                )}
            </div>
            <div className="flex overflow-y-auto py-2">
                {Array.from(selected.values()).map((option, index) =>
                    <div className={'p-1 w-fit'} key={index}>
                        <div className={"items-center py-1 px-2 text-xs whitespace-nowrap rounded-full bg-lime-500 ring-0 flex text-wrap w-25"}>
                            {option.name}
                            <button
                                onClick={selectOption}
                                data-option={option.name}
                                className={'ml-2'} >
                                <svg data-option={option.name} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path data-option={option.name} strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>

                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}