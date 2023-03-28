"use client"


// import {parseString, parseStringPromise} from 'xml2js'
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem"
import {useState} from "react";
import {PlusIcon} from "@heroicons/react/20/solid";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const initialMeshTerms = [
    {
        id: '[A]',
        term: 'Anatomy [A]',
        subterms: [
            {
                id: '[A01]',
                term: 'Body Regions [A01]',
                subterms: []
            },
            {
                id: '[A02]',
                term: 'Musculoskeletal System [A02]',
                subterms: []
            }
        ]
    },
    {
        id: '[B]',
        term: 'Organisms [B]',
        subterms: [
            {
                id: '[B01]',
                term: 'Eukaryota [B01]',
                subterms: []
            },
            {
                id: '[B02]',
                term: 'Archaea [B02]',
                subterms: []
            }
        ]
    },
    {
        id: '[C]',
        term: 'Diseases [C]',
        subterms: [
            {
                id: '[C01]',
                term: 'Infections [C01]',
                subterms: []
            },
            {
                id: '[C02]',
                term: 'Neoplasms [C02]',
                subterms: []
            }
        ]
    },
    {
        id: '[D]',
        term: 'Chemicals and Drugs [D]',
        subterms: [
            {
                id: '[D01]',
                term: 'Inorganic Chemicals [D01]',
                subterms: []
            },
            {
                id: '[D02]',
                term: 'Organic Chemicals [D02]',
                subterms: []
            }
        ]
    },
    {
        id: '[E]',
        term: 'Analytical, Diagnostic and Therapeutic Techniques, and Equipment [E]',
        subterms: [
            {
                id: '[E01]',
                term: 'Diagnosis [E01]',
                subterms: []
            },
            {
                id: '[E02]',
                term: 'Therapeutics [E02]',
                subterms: []
            }
        ]
    },
    {
        id: '[F]',
        term: 'Psychiatry and Psychology [F]',
        subterms: [
            {
                id: '[F01]',
                term: 'Behavior and Behavior Mechanisms [F01]',
                subterms: []
            },
            {
                id: '[F02]',
                term: 'Psychological Phenomena [F02]',
                subterms: []
            }
        ]
    },
    {
        id: '[G]',
        term: 'Phenomena and Processes [G]',
        subterms: [
            {
                id: '[G01]',
                term: 'Physical Phenomena [G01]',
                subterms: []
            },
            {
                id: '[G02]',
                term: 'Chemical Phenomena [G02]',
                subterms: []
            }
        ]
    },
    {
        id: '[H]',
        term: 'Disciplines and Occupations [H]',
        subterms: [
            {
                id: '[H01]',
                term: 'Natural Science Disciplines [H01]',
                subterms: []
            },
            {
                id: '[H02]',
                term: 'Health Occupations [H02]',
                subterms: []
            }
        ]
    },
    {
        id: '[I]',
        term: 'Anthropology, Education, Sociology, and Social Phenomena [I]',
        subterms: [
            {
                id: '[I01]',
                term: 'Social Sciences [I01]',
                subterms: []
            },
            {
                id: '[I02]',
                term: 'Education [I02] ',
                subterms: []
            }
        ]
    },
    {
        id: '[J]',
        term: 'Technology, Industry, and Agriculture [J] ',
        subterms: [
            {
                id: '[J01]',
                term: 'Technology, Industry, and Agriculture [J01]',
                subterms: []
            },
            {
                id: '[J02]',
                term: 'Food and Beverages [J02]',
                subterms: []
            }
        ]
    },
    {
        id: '[K]',
        term: 'Humanities [K]',
        subterms: [
            {
                id: '[K01]',
                term: 'Humanities [K01]',
                subterms: []
            }
        ]
    },
    {
        id: '[L]',
        term: 'Information Science [L]',
        subterms: [
            {
                id: '[L01]',
                term: 'Information Science [L01]',
                subterms: []
            }
        ]
    },
    {
        id: '[M]',
        term: 'Named Groups [M]',
        subterms: [
            {
                id: '[M01]',
                term: 'Persons [M01] ',
                subterms: []
            }
        ]
    },
    {
        id: '[N]',
        term: 'Health Care [N]',
        subterms: [
            {
                id: '[N01]',
                term: 'Population Characteristics [N01] ',
                subterms: []
            },
            {
                id: '[N02]',
                term: 'Health Care Facilities, Manpower, and Services [N02] ',
                subterms: []
            }
        ]
    },
    {
        id: '[V]',
        term: 'Publication Characteristics [V]',
        subterms: [
            {
                id: '[V01]',
                term: 'Publication Components [V01]',
                subterms: []
            },
            {
                id: '[V02]',
                term: 'Publication Formats [V02]',
                subterms: []
            }
        ]
    },
    {
        id: '[Z]',
        term: 'Geographicals [Z]',
        subterms: [
            {
                id: '[Z01]',
                term: 'Geographic Locations [Z01]',
                subterms: []
            }
        ]
    },
]

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


export default function MeshTree() {
    const [meshTerms, setMeshTerms] = useState(initialMeshTerms)

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

    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)


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
                        <TreeItem onClick={addToTerms} nodeId={section.id} label={section.term}>
                            {section.subterms.map((sub) => (
                                <div className={"flex"}>
                                    <TreeItem nodeId={sub.id} label={sub.term}> {sub.id} </TreeItem>
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