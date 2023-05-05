import {Simulate} from "react-dom/test-utils";
import select = Simulate.select;
import {MouseEventHandler, useEffect, useReducer, useState} from "react";

interface FilterProps {
    name: string,
    options: string[],
    selectHandler : (...args:any) => void

}
export const TextFilter = ({name, options, selectHandler} : FilterProps) => {

    const [selected, setSelected] = useState<Set<string>>(new Set())

    const selectOption = (e) => {
        console.log(e)
        const option = e.target.dataset.option

        e.target.classList.toggle("bg-lime-500")

        let s = selected
        if(s.has(option)){
            s.delete(option)
        } else {
            s.add(option)
        }

        console.log("S", s)

        setSelected(s)
        selectHandler(Array.from(s.values()))
    }



    return (
        <div className="flex flex-col">
            <label htmlFor={name} className={"font-bold"}>{name}</label>
            <div className="grid grid-cols-3 gap-2">
                {options.map((option, index) =>
                        <button key={index} onClick={selectOption} data-option={option} className={"p-2 text-xs rounded-md border-lime-500 border-2  ring-0"}>
                            {option.toUpperCase()}
                        </button>
                )}
            </div>
        </div>
    )
}