"use client"

import React, {useState, useRef, useEffect, useCallback} from "react";
import {FixedSizeList as List} from "react-window";
import {XMarkIcon} from "@heroicons/react/24/outline";
import {Listbox, Transition} from "@headlessui/react";
import {meshTerms} from './meshTerms';
import {debounce} from "lodash";
import Trie from "./Trie";
import Link from "next/link";
import {useSearchParams, usePathname, useRouter} from 'next/navigation'


const trie = new Trie();
meshTerms.forEach((term) => trie.insert(term.toLowerCase()));

function Row({data, index, style}) {
    const term = data[index];
    const addTerm = data.addTerm;

    return (
        <Listbox.Option
            key={term}
            value={term}
            as="li"
            style={style}
            className={({active}) =>
                `${
                    active ? "text-white bg-indigo-600" : "text-gray-900"
                } cursor-pointer select-none relative py-2 pl-3 pr-9`
            }
            onClick={() => addTerm(term)}
        >
            {term}
        </Listbox.Option>
    );
}

export default function SearchBar() {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredTerms, setFilteredTerms] = useState([]);
    const [selectedTerms, setSelectedTerms] = useState([]);
    const searchBarRef = useRef(null);
    let searchQuery = "";
    const stuff = "yeah"

    useEffect(() => {
        if (searchTerm.length > 0) {
            setFilteredTerms(
                trie.findWordsWithPrefix(searchTerm.toLowerCase())
            );
        } else {
            setFilteredTerms([]);
        }
    }, [searchTerm]);

    const debouncedSetSearchTerm = debounce((value) => {
        setSearchTerm(value)
    }, 10);

    const handleInputChange = (e) => {
        debouncedSetSearchTerm(e.target.value);
    };

    const addTerm = useCallback((term) => {
        if (!selectedTerms.includes(term)) {
            setSelectedTerms([...selectedTerms, term]);
            // updateSearchQuery()
        }
        setSearchTerm("");
        setFilteredTerms([]);
    }, [selectedTerms]);

    const removeTerm = (termToRemove) => {
        setSelectedTerms(selectedTerms.filter((term) => term !== termToRemove));
        // updateSearchQuery()
    };

    // const updateSearchQuery = () => {
    //     let currQuery = ""
    //     selectedTerms.map((term) => {
    //         currQuery = term + " " + currQuery
    //     })
    //     searchQuery = currQuery
    //
    //     console.log("THIS IS THE SEARCH QUERY CURRENTLY: ")
    //     console.log(searchQuery)
    // }

    const onSearch = (event) => {
        event.preventDefault()

        let currQuery = ""
        selectedTerms.map((term) => {
            currQuery = term + " " + currQuery
        })
        console.log(currQuery)
        console.log(encodeURI(currQuery))

        router.push(`/results?q=${encodeURI(currQuery)}`)
    }

    return (
        <form onSubmit={onSearch}>
            <div className="relative">
                <div
                    className="mt-2 flex items-center bg-white rounded-md border-0 pl-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <div className="flex flex-wrap items-center">
                        {selectedTerms.map((term) => (
                            <span
                                className="flex items-center m-1 px-2 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded">
              {term}
                                <XMarkIcon
                                    className="w-4 h-4 ml-1 text-gray-500 cursor-pointer"
                                    onClick={() => removeTerm(term)}
                                />
            </span>
                        ))}
                    </div>
                    <input
                        ref={searchBarRef}
                        id="text"
                        autoComplete="text"
                        placeholder='e.g. "progeria"'
                        minLength={0}
                        maxLength={256}
                        value={searchTerm}
                        onChange={handleInputChange}
                        className="flex-grow min-w-0 rounded-md border-0 pl-0 py-0.5 text-gray-900 bg-transparent placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
                    />
                </div>
                <Transition
                    show={filteredTerms.length > 0}
                    className="absolute w-full mt-1 bg-white border border-gray-300 rounded shadow-lg z-[100]"
                    enter="transition ease-out duration-100 transform"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="transition ease-in duration-75 transform"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <Listbox
                        as="ul"
                        value={null}
                        onChange={addTerm}
                        className="py-1 overflow-auto text-base leading-6 rounded-md shadow-sm max-h-60 focus:outline-none sm:text-sm sm:leading-5"
                    >
                        <List
                            height={filteredTerms.length >= 0 ? 200 : 0}
                            itemCount={filteredTerms.length}
                            itemSize={35}
                            width="100%"
                            itemData={{...filteredTerms, addTerm}}
                        >
                            {Row}
                        </List>
                        {filteredTerms.length === 0 && (
                            <li className="py-2 pl-3 pr-9 text-gray-500 cursor-not-allowed">
                                No words
                            </li>
                        )}
                    </Listbox>
                </Transition>
            </div>
            {(pathname === "/") &&
                <div className="flex py-2 flex-col items-center">
                    <button
                        type="submit"
                        size="md"
                        className="h-12 px-4 ml-3 rounded-md bg-indigo-600 px-3 py-2 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Search
                    </button>
                </div>
            }
        </form>
    );
}
