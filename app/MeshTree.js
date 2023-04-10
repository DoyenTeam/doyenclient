"use client"

import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem"
import {useState} from "react";
import {meshTreeData} from "@/app/MeshTreeData";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

/**
 * The Mesh Tree currently shows data from MeshTreeData.js in a tree format
 */
export default function MeshTree() {
    const [meshTerms, setMeshTerms] = useState(meshTreeData)

    const readTerms = () => {
        console.log("Open Tree")
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
                                            </div>
                                        ))}
                                    </TreeItem>
                                </div>
                            ))}
                        </TreeItem>
                    </div>
                ))}
            </TreeView>

        </div>
    )
}