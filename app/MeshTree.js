"use client"


// import {parseString, parseStringPromise} from 'xml2js'
import useSwR from "swr";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem"
import {useState} from "react";
import {PlusIcon} from "@heroicons/react/20/solid";
import {stuff} from "@/app/terms";
import {meshTreeData} from "@/app/meshTreeData";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}



async function getmesh() {

    const terms = await fetch("https://meshb.nlm.nih.gov/api/tree/A01.236", {
        method: 'GET',
        headers: new Headers({
            'Accept': 'application/xml',
            'content-type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT',
            'Access-Control-Allow-Headers': 'Content-Type',
        }),
        mode: 'no-cors'
    })
        .then(response => {
            return response.text()
        })
        .then(xml => {
            // console.log("xml", xml)
            return xml
        })

    return terms
}

// async function getStringFromXLM(string) {
//
//     const stuff = await parseStringPromise(string).then(result => {
//         // console.log(result)
//         return JSON.stringify(result)
//     })
//
//     return stuff
// }

const fetcher = (...args) => fetch(...args).then(res => res.json())


export default function MeshTree() {
    const [meshTerms, setMeshTerms] = useState(meshTreeData)

    // const { data, error, isLoading } = useSwR('./terms.js', fetcher)
    //
    // if (error) return <div>failed to load</div>
    // if (isLoading) return <div>loading...</div>

    const readTerms = () => {
        // fetch(rawtext).then(r => r.text()).then(text => {
        //     console.log(text);
        // })
        console.log("ehllo")
    }

    const addToTerms = () => {
        // meshTerms[0].subterms.push({
        //     id: '',
        //     term: 'edwin',
        //     subterms: []
        // })
        //
        // setMeshTerms([...meshTerms, {
        //     id: '[B]',
        //     term: 'Organisms [B]',
        //     subterms: []
        // }])
    }

    return (
        <div className="bg-white">
            <TreeView
                aria-label="file system navigator"
                defaultCollapseIcon={<ExpandMoreIcon/>}
                defaultExpandIcon={<ChevronRightIcon/>}
                sx={{height: 1000, flexGrow: 1, maxWidth: 600, overflowY: 'auto'}}
            >
                {meshTerms.map((section) => (
                    <div className={"flex"}>
                        <TreeItem onClick={readTerms} nodeId={section.id} label={section.term}>
                            {section.subterms.map((sub) => (

                                <div className={"flex"}>
                                    <TreeItem nodeId={sub.id} label={sub.term}>
                                        {sub.subterms.map((subsub) => (
                                            <div className={"flex"}>
                                            <TreeItem nodeId={subsub.id} label={subsub.term}> {[]} </TreeItem>
                                            <PlusIcon className="flex-none h-5 w-5" aria-hidden="true"/>
                                            </div>
                                        ))}
                                    </TreeItem>
                                    <PlusIcon className="flex-none h-5 w-5" aria-hidden="true"/>
                                </div>
                            ))}

                        </TreeItem> <PlusIcon className="flex-none h-5 w-5" aria-hidden="true"/>
                    </div>
                ))}
            </TreeView>

        </div>
    )
}


{/*{filters.map((section) => (*/
}
{/*    <Disclosure as="div" key={section.id}*/
}
{/*                className="border-t border-gray-200 px-4 py-6">*/
}
{/*        {({open}) => (*/
}
{/*            <>*/
}
{/*            <h3 className="-mx-2 -my-3 flow-root">*/
}
{/*                <Disclosure.Button*/
}
{/*                    className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">*/
}
{/*                                        <span*/
}
{/*                                            className="font-medium text-gray-900">{section.name}</span>*/
}
{/*                    <span className="ml-6 flex items-center">*/
}
{/*          {open ? (*/
}
{/*              <MinusIcon className="h-5 w-5" aria-hidden="true"/>*/
}
{/*          ) : (*/
}
{/*              <PlusIcon className="h-5 w-5" aria-hidden="true"/>*/
}
{/*          )}*/
}