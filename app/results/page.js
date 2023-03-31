import Results from "@/app/results/Results";
import Publications from "@/app/results/Publications";
import {useSearchParams} from "next/navigation";
import {console} from "next/dist/compiled/@edge-runtime/primitives/console";

export default function resultsPage({searchParams}){
    console.log("PARAMS")
    console.log(searchParams['q'])
    return(
        <Results>
            <Publications searchTerm={searchParams['q']}/>
        </Results>
    )
}