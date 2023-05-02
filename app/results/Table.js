/**
 * This component displays a table of expert information based on the JSON data received from the API. The component takes two props: `experts` (an array of expert objects) and `searchTerm` (the term used to search for experts). The table provides pagination, sortable columns, filter options, and links to view relevant publications on PubMed.
 */

"use client"

import React, { useState, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGraduate, faExternalLinkAlt, faUsers, faCaretRight, faCaretDown, faFaceFrown } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';

// function to sort data based on `config` object, currently sorts 'Relevancy Score' & '# of Relevant Publications' columns by ascending or descending order.
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

// main component builds and displays a table of the JSON data received from the API
export default function Table({experts, searchTerm}) {
    // hook to manage sorting the `experts` array.
    const { items, requestSort, sortConfig } = useSortableData(experts, {
        key: "RelevancySum",
        direction: "descending",
    });
    // state to manage pagination
    const [currentPage, setCurrentPage] = useState(1);
    // state to manage accordion
    const [accordionOpen, setAccordionOpen] = useState(null);
    // state to manage collaborators data
    const [collaboratorsData, setCollaboratorsData] = useState({});
    // state to manage filters
    const [filters, setFilters] = useState({ expertScore: null, publicationsCount: null });
    const [showFilters, setShowFilters] = useState(false);
    const [filtersVisible, setFiltersVisible] = useState(false);
    // items per page
    const itemsPerPage = 10;
    const filteredItems = items.filter((expert) => applyFilters(filters, expert));
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    const currentItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    // function to update `currentPage` state
    const handleClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // function to open a new tab with PubMed URL for the expert's publications
    const handleClickPubMed = (url) => {
        window.open(url, "_blank");
    };

    // component to render sorting arrows for each sortable column in the table
    const Arrow = ({ active, direction }) => (
        <span className={`${active ? "text-indigo-600" : "text-gray-300"} inline-block`}>
          {direction === "ascending" ? "▲" : "▼"}
        </span>
    );

    // function to handle when a user clicks on an accordion caret
    const handleClickRow = (index, expert) => {
        if (accordionOpen === index) {
            setAccordionOpen(null);
        } else {
            setAccordionOpen(index);

            // fetch collaborators data if not already fetched
            const expert = currentItems[index];
            if (expert && expert.Identifier && !collaboratorsData.hasOwnProperty(expert.Identifier.slice(-19))) {
                fetchCollaborators(expert.Identifier.slice(-19));
            }
        }
    };

    // function to display message to user if there are no search results to display in the table
    const renderEmptyMessage = () => (
        <div className="flex flex-col items-center justify-center mt-10 pt-40">
            <FontAwesomeIcon icon={faFaceFrown} className="text-8xl text-indigo-500 mb-10" />
            <p className="text-4xl text-gray-600">
                Sorry, it seems experts have yet to publish work exploring these connections
            </p>
        </div>
    );

    // function to fetch collaborators data
    const fetchCollaborators = async (identifier) => {
        try {
            const response = await axios.get(
                `https://doyen-api.azurewebsites.net/api/experts/${identifier}/collaborators`
            );
            setCollaboratorsData((prevState) => ({
                ...prevState,
                [identifier]: response.data,
            }));
        } catch (error) {
            console.error('Error fetching collaborators data:', error);
        }
    };

    // function to display collaborators
    const renderCollaborators = (identifier) => {
        if (!collaboratorsData.hasOwnProperty(identifier)) {
            return <div>Loading...</div>;
        }
    
        const collaborators = collaboratorsData[identifier];
        const expertName = experts.find(expert => expert.Identifier === identifier)?.Name;
        const uniqueCollaborators = Array.from(
            new Set(collaborators.map((collaborator) => collaborator.Name))
        ).filter(name => name !== expertName);

        const columns = [];
        let currentColumn = [];
    
        uniqueCollaborators.forEach((name, index) => {
            currentColumn.push(name);

            if ((index + 1) % 5 === 0 || index === uniqueCollaborators.length - 1) {
                columns.push(currentColumn);
                currentColumn = [];
            }
        });
    
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {columns.map((column, index) => (
                    <div key={index} className="flex flex-col" data-testid="collaborators-list">
                        {column.map((name) => (
                            <div key={name}>{name}</div>
                        ))}
                    </div>
                ))}
            </div>
        );
    };

    // function to apply filters to the table
    function applyFilters(filters, expert) {
        const { expertScore, publicationsCount } = filters;
      
        if (expertScore && expert.RelevancySum <= expertScore) return false;
        if (publicationsCount && expert.PublicationsCount <= publicationsCount) return false;
      
        return true;
    }
    
    // component function to handle and render filter options for the table
    function Filter({ title, options, selectedValue, onChange }) {
        return (
            <div className="inline-block mr-4">
                <div className="flex ml-2">
                    <span className="text-md font-semibold inline-flex items-center text-gray-700">{title}:</span>
                    {options.map((option, index) => (
                        <div key={index}>
                            <input
                                type="radio"
                                data-testid={`expert-score-${option.value}`}
                                className="peer hidden"
                                name={title}
                                value={option.value}
                                id={`${title}-${index}`}
                                onChange={() => onChange(option.value)}
                                checked={selectedValue === option.value}
                            />
                            <label
                                htmlFor={`${title}-${index}`}
                                className={`ml-2 relative inline-flex items-center px-1 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 hover:text-gray-700 ${
                                    index !== 0 ? "ml-1" : ""
                                } ${selectedValue === option.value ? "border-indigo-600 border-2 text-indigo-600 font-extrabold" : ""}`}
                            >
                            {option.label}
                            </label>
                        </div>
                    ))}
                </div>
            </div> 
        );
    }

    // displays sortable, paginated table of experts, allows users to sort & filter table by expert score & relevant publications, and provides link to view publications on PubMed
    return (
        <div className="py-2 lg:col-span-2 lg:mt-0 xl:col-span-3">
            <h2 className="text-2xl mb-4">Showing experts in: " {searchTerm}"</h2>
            <div className="flex flex-wrap items-center mb-1 bg-gray-50 p-2">
                <button
                    onClick={() => setFiltersVisible(!filtersVisible)}
                    className="text-md font-semibold bg-indigo-500 text-white rounded-md px-3 py-1"
                >
                Filters
                </button>
                {filtersVisible && (
                    <>
                        <div className="ml-6">
                            <Filter
                                title="Expert Score"
                                options={[
                                    { label: "All", value: null },
                                    { label: "5+", value: 5 },
                                    { label: "10+", value: 10, },
                                    { label: "20+", value: 20 },
                                ]}
                                selectedValue={filters.expertScore}
                                onChange={(value) =>
                                    setFilters((prevFilters) => ({
                                        ...prevFilters,
                                        expertScore: value,
                                    }))
                                }
                            />
                            <Filter
                                title="Publications"
                                options={[
                                    { label: "All", value: null },
                                    { label: "2+", value: 1 },
                                    { label: "3+", value: 3 },
                                    { label: "5+", value: 5 },
                                ]}
                                selectedValue={filters.publicationsCount}
                                onChange={(value) =>
                                    setFilters((prevFilters) => ({
                                        ...prevFilters,
                                        publicationsCount: value,
                                    }))
                                }
                            />
                        </div>
                    </>
                )}
            </div>
            {items.length > 0 ? (
                <div className="w-full">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="pl-14 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expert Name</th>
                                <th data-testid="expert-score-header" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => requestSort("RelevancySum")}>
                                    <span data-testid="expert-score-header">Expert Score</span>
                                    <span className="ml-2">
                                    <Arrow active={sortConfig && sortConfig.key === "RelevancySum" && sortConfig.direction === "ascending"} direction="ascending" />
                                        <Arrow active={sortConfig && sortConfig.key === "RelevancySum" && sortConfig.direction === "descending"} direction="descending" />
                                    </span>
                                </th>
                                <th data-testid="publications-count-header" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => requestSort("PublicationsCount")}>
                                    <span data-testid="publications-count-header"># of Relevant Publications</span>
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
                                <React.Fragment key={index}>
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <button
                                                    onClick={() => handleClickRow(index)}
                                                    className={`w-6 h-6 flex items-center justify-center focus:outline-none mr-4 ${expert.Identifier !== null ? '' : 'collapse'}`}
                                                >
                                                    <FontAwesomeIcon
                                                        icon={accordionOpen === index ? faCaretDown : faCaretRight}
                                                        className="text-gray-500"
                                                    />
                                                </button>
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
                                    {accordionOpen === index && expert.Identifier !== null && (
                                        <tr className="bg-gray-50">
                                            <td colSpan={4} className="p-4">
                                                <div className="flex justify-start">
                                                    <div className="flex items-center mr-8">
                                                        <FontAwesomeIcon icon={faUsers} className="mr-2 text-indigo-600" />
                                                        <span className="font-bold">Collaborators: </span>
                                                    </div>
                                                    <div className="flex flex-wrap">
                                                        {collaboratorsData[expert.Identifier.slice(-19)] &&
                                                            renderCollaborators(expert.Identifier.slice(-19))
                                                        }
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
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
                                    data-testid="previous-button"
                                    className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                                    disabled={currentPage === 1}
                                    onClick={() => handleClick(currentPage - 1)}
                                >
                                    Previous
                                </button>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                                    (pageNumber) => (
                                    <button
                                        data-testid="page-number-input"
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
                                    data-testid="next-button"
                                    className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
                                    disabled={currentPage === totalPages}
                                    onClick={() => handleClick(currentPage + 1)}
                                >
                                    Next
                                </button>
                            </div>
                        </nav>
                    </div>
                </div>
            ) : (
                renderEmptyMessage()
            )}
        </div>
    );
}