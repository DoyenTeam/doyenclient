"use client"

import {Document, Page, StyleSheet, Text, pdf} from "@react-pdf/renderer";
import React from "react";
import {saveAs} from 'file-saver';
import {use} from 'react';

/**
 * This is the basic styling provided by react-pdf. TODO: change it according to the client's needs
 */
const styles = StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        fontFamily: 'Times-Roman'
    },
    author: {
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 40,
    },
    subtitle: {
        fontSize: 18,
        margin: 12,
        fontFamily: 'Times-Roman'
    },
    text: {
        margin: 12,
        fontSize: 14,
        textAlign: 'justify',
        fontFamily: 'Times-Roman'
    },
    image: {
        marginVertical: 15,
        marginHorizontal: 100,
    },
    header: {
        fontSize: 12,
        marginBottom: 20,
        textAlign: 'center',
        color: 'grey',
    },
    pageNumber: {
        position: 'absolute',
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'grey',
    },
});

/**
 * Create a PDF document that is then rendered when the download button is clicked by the user.
 */
function pdfExportDoc(experts) {
    return (
        <Document>
            <Page>
                <Text style={styles.title}>
                    Experts Found
                </Text>
                <Text style={styles.subtitle}>
                    Query:
                </Text>
                {experts.map((expert) => (
                    <Text style={styles.text}>
                        {expert.Name}
                    </Text>
                ))}
            </Page>
        </Document>
    )
}

const generatePdfDocument = async (experts) => {
    const blob = pdf((
        pdfExportDoc(experts)
    )).toBlob();
    return blob;
};

const saveStuff = (blob) => {
    saveAs(blob, "doyen-expert.pdf")
}

/**
 * The downloader allows the user to obtain a pdf with all the results from the query to the doyen API. This
 * component is used in the Publications component. Because of its interactivity it is a client component, however,
 * it uses async functions since pdf's can take some time to create.
 */
export default function PDFDownloader({experts}) {
    // For PDF Creation
    const bl = use(generatePdfDocument(experts))

    return (
        <div>
            <div className={"py-2"}>
                <button onClick={() => saveStuff(bl)}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                    <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 20 20">
                        <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/>
                    </svg>
                    <span>Export List</span>
                </button>
            </div>
        </div>
    )
}