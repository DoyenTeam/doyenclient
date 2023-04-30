"use client"

import React, { useState, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGraduate, faExternalLinkAlt, faFaceFrown } from "@fortawesome/free-solid-svg-icons";

// Function to sort 'Relevancy Score' & '# of Relevant Publications' columns by ascending or descending order 
function useSortableData(items, config = null) {
    const [sortConfig, setSortConfig] = useState(config);

    const sortedItems = useMemo(() => {
        let sortableItems = [...items];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'ascending' ? -1 : 1;
                if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'ascending' ? 1 : -1;
                return 0;
            });
        }
        return sortableItems;
    }, [items, sortConfig]);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') direction = 'descending';
        setSortConfig({ key, direction });
    };

    return { items: sortedItems, requestSort, sortConfig };
}

// Builds and displays a table of the JSON data received from the API
export default function Table({experts, searchTerm}) {
    const { items, requestSort, sortConfig } = useSortableData(experts, {
        key: "RelevancySum",
        direction: "descending",
    });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalPages = Math.ceil(items.length / itemsPerPage);
    const currentItems = items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleClickPubMed = (url) => {
        window.open(url, "_blank");
    };

    const Arrow = ({ active, direction }) => (
        <span className={`${active ? "text-indigo-600" : "text-gray-300"} inline-block`}>
          {direction === "ascending" ? "▲" : "▼"}
        </span>
    );

    const renderEmptyMessage = () => (
        <div className="flex flex-col items-center justify-center mt-10 pt-40">
            <FontAwesomeIcon icon={faFaceFrown} className="text-8xl text-indigo-500 mb-10" />
            <p className="text-4xl text-gray-600">
                Sorry, it seems experts have yet to publish work exploring these connections
            </p>
        </div>
    );

    return (
        <div className="py-2 lg:col-span-2 lg:mt-0 xl:col-span-3">
            <h2 className="text-2xl mb-4">Showing experts in: " {searchTerm}"</h2>
            {items.length > 0 ? (
                <>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="pl-14 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expert Name</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => requestSort("RelevancySum")}>
                                    <span>Expert Score</span>
                                    <span className="ml-2">
                                        <Arrow active={sortConfig && sortConfig.key === "RelevancySum" && sortConfig.direction === "ascending"} direction="ascending" />
                                        <Arrow active={sortConfig && sortConfig.key === "RelevancySum" && sortConfig.direction === "descending"} direction="descending" />
                                    </span>
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => requestSort("PublicationsCount")}>
                                    <span># of Relevant Publications</span>
                                    <span className="ml-2">
                                        <Arrow active={sortConfig && sortConfig.key === "PublicationsCount" && sortConfig.direction === "ascending"} direction="ascending" />
                                        <Arrow active={sortConfig && sortConfig.key === "PublicationsCount" && sortConfig.direction === "descending"} direction="descending" />
                                    </span>
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">View on PubMed</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {currentItems.map((expert, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 bg-gray-300 rounded-full mr-4 flex items-center justify-center">
                                                <FontAwesomeIcon icon={faUserGraduate} className="text-white" />
                                            </div>
                                            <span className="font-bold">{expert.Name}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-center">{expert.RelevancySum}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-center">{expert.PublicationsCount}</td>
                                    <td className="px-4 py-2 whitespace-nowrap text-center">
                                        <button
                                            className="text-indigo-600 hover:text-indigo-900"
                                            onClick={() =>
                                                handleClickPubMed(
                                                `https://pubmed.ncbi.nlm.nih.gov/?term=${expert.Name.split(" ").join("+")}+${searchTerm.split(" ").join("+")}`
                                                )
                                            }
                                        >
                                            <FontAwesomeIcon icon={faExternalLinkAlt} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="mt-4">
                        <nav className="flex justify-between">
                            <div className="hidden sm:block">
                                <p className="text-sm text-gray-700">
                                    Showing{" "}
                                    <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span>{" "}
                                    to{" "}
                                    <span className="font-medium">
                                        {currentPage * itemsPerPage < items.length ? currentPage * itemsPerPage : items.length}
                                    </span>{" "}
                                    of <span className="font-medium">{items.length}</span> results
                                </p>
                            </div>
                            <div className="flex-1 flex justify-between sm:justify-end">
                                <button
                                    className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                                    disabled={currentPage === 1}
                                    onClick={() => handleClick(currentPage - 1)}
                                >
                                    Previous
                                </button>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                                    (pageNumber) => (
                                    <button
                                        key={pageNumber}
                                        onClick={() => handleClick(pageNumber)}
                                        className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 hover:text-gray-700 ${
                                        pageNumber === currentPage ? "border-indigo-600 border-2 text-indigo-600 font-extrabold" : ""
                                        }`}
                                    >
                                        {pageNumber}
                                    </button>
                                    )
                                )}
                                <button
                                    className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
                                    disabled={currentPage === totalPages}
                                    onClick={() => handleClick(currentPage + 1)}
                                >
                                    Next
                                </button>
                            </div>
                        </nav>
                    </div>
                </>
            ) : (
                renderEmptyMessage()
            )}
        </div>
    );
}