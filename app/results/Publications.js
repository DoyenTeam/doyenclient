import Link from 'next/link';
import {Document, Page, StyleSheet, Text} from "@react-pdf/renderer";
import React from "react";
import PDFDownloader from "@/app/results/PDFDownloader";


async function getPublications() {
    console.log("publications being fetched...")
    const res = await fetch('https://doyen-api.azurewebsites.net/api/experts/search?keywords=health&limit=50&offset=0')
    const data = await res.json()
    console.log(data)
    return data
}



export default async function Publications() {
    const experts = await getPublications();


    return (

        <div className="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3">
            <PDFDownloader experts={experts}/>
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