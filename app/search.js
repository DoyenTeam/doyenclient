import Link from 'next/link';
import React, { useState, useRef, useEffect, useCallback } from "react";
import { FixedSizeList as List } from "react-window";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Listbox, Transition } from "@headlessui/react";
import { meshTerms } from './meshTerms';
import { debounce } from "lodash";
import Trie from "./Trie";

const trie = new Trie();
meshTerms.forEach((term) => trie.insert(term.toLowerCase()));

function Row({ data, index, style }) {
  const term = data[index];
  const addTerm = data.addTerm;

  return (
    <Listbox.Option
      key={term}
      value={term}
      as="li"
      style={style}
      className={({ active }) =>
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

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTerms, setFilteredTerms] = useState([]);
  const [selectedTerms, setSelectedTerms] = useState([]);
  const searchBarRef = useRef(null);

  useEffect(() => {
    if (searchTerm.length > 0) {
      setFilteredTerms(
        trie.findWordsWithPrefix(searchTerm.toLowerCase())
      );
    } else {
      setFilteredTerms([]);
    }
  }, [searchTerm]);

  const debouncedSetSearchTerm = debounce((value) => setSearchTerm(value), 300);

  const handleInputChange = (e) => {
    debouncedSetSearchTerm(e.target.value);
  };

  const addTerm = useCallback((term) => {
    if (!selectedTerms.includes(term)) {
      setSelectedTerms([...selectedTerms, term]);
    }
    setSearchTerm("");
    setFilteredTerms([]);
  }, [selectedTerms]);

  const removeTerm = (termToRemove) => {
    setSelectedTerms(selectedTerms.filter((term) => term !== termToRemove));
  };

  return (
    <main>
      <div className="flex flex-col w-full justify-center ">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto object-contain h-16"
            src="./logo.png"
            alt="Doyen"
          />
          <p className="mt-2 text-center text-sm text-gray-600">
            {" "}
            <a className="font-medium text-gray-600">Search for an Expert</a>
          </p>
        </div>

        <div className="mt-8 w-full">
          <div className="bg-white py-8 px-4  sm:rounded-lg sm:px-10">
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Primary Search Terms
                </label>
                <div className="mt-2">
                  {selectedTerms.map((term) => (
                    <span className="flex items-center m-1 px-2 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded">
                      {term}
                      <XMarkIcon
                        className="w-4 h-4 ml-1 text-gray-500 cursor-pointer"
                        onClick={() => removeTerm(term)}
                      />
                    </span>
                  ))}
                  <input
                    ref={searchBarRef}
                    id="text"
                    name="text"
                    type="text"
                    autoComplete="text"
                    placeholder='e.g. "progeria"'
                    value={searchTerm}
                    onChange={handleInputChange}
                    required
                    className="block w-full rounded-md border-0 pl-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                      itemData={{ ...filteredTerms, addTerm }}
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

              <div className="flex flex-col items-center">
                <Link href={`/results`}>
                  <button
                    type="submit"
                    size="md"
                    className="h-12 px-4 ml-3 rounded-md bg-indigo-600 px-3 py-2 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Search
                  </button>
                </Link>
              </div>
            </div>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-gray-500">
                    Or Sign In with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <button type="button"
                        className="text-white bg-[#bdc3c7] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2">
                  <svg className="w-4 h-4 mr-2 -ml-1" aria-hidden="true" focusable="false" data-prefix="fab"
                       data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                    <path fill="currentColor"
                          d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                  </svg>
                  Sign in with Google
                </button>

                <button type="button"
                        className="text-white bg-[#bdc3c7] hover:bg-[#2c3e50]/30 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2">
                  <svg className="w-4 h-4 mr-2 -ml-1" aria-hidden="true" focusable="false" data-prefix="fab"
                       data-icon="github" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
                    <path fill="currentColor"
                          d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>
                  </svg>
                  Sign in with Github
                </button>

                <button type="button"
                        className="text-white bg-[#bdc3c7] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 mr-2 mb-2">
                  <svg className="w-4 h-4 mr-2 -ml-1" aria-hidden="true" focusable="false" data-prefix="fab"
                       data-icon="twitter" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path fill="currentColor"
                          d="M459.4 151.7c.325 4.548 .325 9.097 .325 13.65 0 138.7-105.6 298.6-298.6 298.6-59.45 0-114.7-17.22-161.1-47.11 8.447 .974 16.57 1.299 25.34 1.299 49.06 0 94.21-16.57 130.3-44.83-46.13-.975-84.79-31.19-98.11-72.77 6.498 .974 12.99 1.624 19.82 1.624 9.421 0 18.84-1.3 27.61-3.573-48.08-9.747-84.14-51.98-84.14-102.1v-1.299c13.97 7.797 30.21 12.67 47.43 13.32-28.26-18.84-46.78-51.01-46.78-87.39 0-19.49 5.197-37.36 14.29-52.95 51.65 63.67 129.3 105.3 216.4 109.8-1.624-7.797-2.599-15.92-2.599-24.04 0-57.83 46.78-104.9 104.9-104.9 30.21 0 57.5 12.67 76.67 33.14 23.72-4.548 46.46-13.32 66.6-25.34-7.798 24.37-24.37 44.83-46.13 57.83 21.12-2.273 41.58-8.122 60.43-16.24-14.29 20.79-32.16 39.31-52.63 54.25z"></path>
                  </svg>
                  Sign in with Twitter
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
