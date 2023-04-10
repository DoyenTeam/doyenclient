import Results from "@/app/results/Results";
import Publications from "@/app/results/Publications";
import {useSearchParams} from "next/navigation";
import {console} from "next/dist/compiled/@edge-runtime/primitives/console";

/**
 * The resultsPage is a sever component that wraps the Results component. Since publications is a client
 * and Results is a server component, next.js doesn't allow them a client component to be called directly in a
 * server component. To get around this issue, vercel/next.js recommend this wrapper.
 */
export default function resultsPage({searchParams}){
    console.log("PARAMS")
    console.log(searchParams['q'])
    return(
        <Results>
            <Publications searchTerm={searchParams['q']}/>
        </Results>
    )
}