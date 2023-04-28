import Link from 'next/link';
import React from "react";
import PDFDownloader from "@/app/results/PDFDownloader";
import {Document, Page, pdf, StyleSheet, Text} from "@react-pdf/renderer";
import {saveAs} from "file-saver"
import Table from "./Table";


/**
 * This async function fetches the data from doyen's API and returns it as a json
 */
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


/**
 * A server-side component that calls the doyen API for data.
 * @param {object} searchTerm - a mechanism from next.js that allows to easily get the query string from the page's URL
 */
export default async function Publications({searchTerm}) {
    const experts = await getPublications(searchTerm);

    return (
        <div className="py-2 lg:col-span-2 lg:mt-0 xl:col-span-3">
            <PDFDownloader experts={experts}></PDFDownloader>
            <Table experts={experts} searchTerm={searchTerm} />
        </div>
    );
}