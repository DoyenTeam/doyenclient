import Link from 'next/link';
import React from "react";
import PDFDownloader from "@/app/results/PDFDownloader";
import {Document, Page, pdf, StyleSheet, Text} from "@react-pdf/renderer";
import {saveAs} from "file-saver"


async function getPublications(keyWords) {
    console.log("publications being fetched...")
    const res = await fetch(
        `https://doyen-api.azurewebsites.net/api/experts/search?keywords=${keyWords}&limit=50&offset=0`,
        {
            next : {revalidate: 20}
        })
    const data = await res.json()
    console.log(data)
    return data
}

export default async function Publications({searchTerm}) {
    console.log("THESE ARE THE SEARCH TERMS")
    console.log(searchTerm)
    const experts = await getPublications(searchTerm);



    return (

        <div className="mt-6 py-2 lg:col-span-2 lg:mt-0 xl:col-span-3">
            <div className="min-w-0 flex-1">
                <h2 className="text-2xl py-2 font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                    {/*Current Query: {searchTerm}*/}
                </h2>
            </div>
            <PDFDownloader experts={experts}></PDFDownloader>
            <ul
                role="list"
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-12"
            >
                {experts.map((person) => (

                    <li
                        key={person.Name}
                        className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
                    >
                        <Link href={`/profile`}>
                            <div className="flex flex-1 flex-col p-8">
                                <img
                                    className="mx-auto h-32 w-32 flex-shrink-0 rounded-full"
                                    src={'https://xsgames.co/randomusers/avatar.php?g=pixel'}
                                    alt=""
                                />
                                <h3 className="mt-6 text-sm font-medium text-gray-900">
                                    {person.Name}
                                </h3>
                                <dl className="mt-1 flex flex-grow flex-col justify-between">
                                    <dt className="sr-only">Title</dt>
                                    <dd className="text-sm text-gray-500">Professor</dd>
                                    <dt className="sr-only">Role</dt>
                                    <dd className="mt-3">
                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                      {person.Identifier}
                    </span>
                                    </dd>
                                </dl>
                            </div>
                        </Link>
                    </li>

                ))}
            </ul>
        </div>

    );
}