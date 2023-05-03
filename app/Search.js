import React from "react";
import SearchBar from './SearchBar';
import {signIn} from "next-auth/react";
import Head from 'next/head';

//used to obtain the session from firebase and next-auth
import { useSession } from "next-auth/react";


/**
 * The Search component represents the search bar and accompanying sign in buttons for the home page.
 */
export default function Search() {

  //this session will return an object when the user signs in
  const {data : session} = useSession();

  return (
    <main>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Belleza&display=swap" rel="stylesheet" />
      </Head>
      <div className="flex flex-col w-full justify-center ">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto object-contain h-16"
            src="./logo.png"
            alt="Doyen"
          />
          <div className="mt-2 text-center text-sm text-gray-600">
            {" "}
            <p 
              className="text-5xl font-bold text-indigo-600 doyen-font pb-1"
              style={{ fontFamily: "'Belleza', sans-serif !important" }}
              >
                Doyen
              </p>
            <p className="text-md font-medium text-gray-600">Search for an Expert</p>
          </div>
        </div>

        <div className="mt-8 w-full">
          <div className="bg-white py-8 px-2  sm:rounded-lg sm:px-10">
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="search-terms"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Primary Search Terms
                </label>
                  <SearchBar></SearchBar>
              </div>
            </div>
            {!session ? (
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

                  <div className="mt-6 flex flex-col items-center">
                    <button type="button" onClick={async () => {
                      await signIn("google")
                    }}
                            className="text-white bg-[#bdc3c7] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2">
                      <svg className="w-4 h-4 mr-2 -ml-1" aria-hidden="true" focusable="false" data-prefix="fab"
                           data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                        <path fill="currentColor"
                              d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                      </svg>
                      Sign in with Google
                    </button>
                  </div>
                </div>
            ) : (<h1> </h1>)}
          </div>
        </div>
      </div>
    </main>
  );
}
