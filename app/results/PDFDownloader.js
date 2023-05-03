"use client"

import {Document, Page, StyleSheet, View, Text, pdf} from "@react-pdf/renderer";
import React from "react";
import {saveAs} from 'file-saver';
import {use, Fragment} from 'react';

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
        margin: 8,
        fontSize: 8,
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
    rowView: {
        display: 'flex', flexDirection: 'row', borderTop: '1px solid #EEE', paddingTop: 8, paddingBottom: 8, textAlign: "center"
    }
});

const tableHeaders = { "headers" : ["Name", "Identifier", "Relevancy Score", "Publication Count"]};
const tableHeadersJSON = { "headers" : ["Name", "Identifier", "RelevancySum", "PublicationsCount"]}

/**
 * Create a PDF document that is then rendered when the download button is clicked by the user.
 */
function pdfExportDoc(experts, searchTerm) {
    return (
        <Document>
            <Page>
                <Text style={styles.title}>
                    Experts Found
                </Text>
                <Text style={styles.subtitle}>
                    Query: {searchTerm}
                </Text>

                <Fragment>
                    <View style={styles.rowView}>
                        {tableHeaders["headers"].map((c) => <Text style={{
                            width: `${200 / tableHeaders["headers"].length}%`
                        }}>{c}</Text>)}
                    </View>
                    {experts.map((rowData) => <>
                        <View style={styles.rowView}>
                            {tableHeadersJSON["headers"].map((c) =>
                                <Text style={{ width: `${200 / tableHeadersJSON["headers"].length}%` }}>{rowData[c]}</Text>
                            )}
                        </View>
                    </>)}
                </Fragment>
            </Page>
        </Document>
    )
}

// used to create the pdf document from expert the information given
const generatePdfDocument = async (experts, searchTerm) => {
    const blob = pdf((
        pdfExportDoc(experts, searchTerm)
    )).toBlob();
    return blob;
};

// creates a pdf file and saves it locally for the user
const saveStuff = (blob, seachTerm) => {
    saveAs(blob, `doyen-expert-${seachTerm}.pdf`)
}


/**
 * The downloader allows the user to obtain a pdf with all the results from the query to the doyen API. This
 * component is used in the Publications component. Because of its interactivity it is a client component, however,
 * it uses async functions since pdf's can take some time to create.
 */
export default function PDFDownloader({experts, searchTerm}) {
    // For PDF Creation
    const bl = use(generatePdfDocument(experts, searchTerm))

    return (
        <div>
                <button onClick={() => saveStuff(bl, searchTerm)}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                    <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 20 20">
                        <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/>
                    </svg>
                    <span>Export List</span>
                </button>
        </div>
    )
}