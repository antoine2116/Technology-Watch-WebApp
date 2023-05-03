import {useArticles} from "@/contexts/ArticlesContext";
import {TextFilter} from "@/components/Filters/TextFilter";
import {useEffect} from "react";

const Filters = () => {

    const {authors, sources, setActiveAuthors, setActiveSources} = useArticles()


    const authorChangeHandler = (authorsSelected: string[]) => {
        console.log("Selected authors", authorsSelected)
        setActiveAuthors([...authorsSelected])
    }
    const sourceChangeHandler = (sourcesSelected: string[]) => {
        setActiveSources([...sourcesSelected])
    }

    return (
        <div className={"grid grid-cols-1 gap-2"}>
            <TextFilter name={"Author"} options={authors} selectHandler={authorChangeHandler}/>
            <TextFilter name={"Source"} options={sources} selectHandler={sourceChangeHandler}/>

        </div>
    )


}

export default Filters;