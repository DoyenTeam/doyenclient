"use client"

import React, {useState} from "react";
import { useSession } from "next-auth/react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";
import { useRouter } from "next/navigation";
import {router} from "next/client";

export default function SaveSearch({searchTerm}) {

    const {data : session } = useSession();
    const [saved, setsaved] = useState(false);

    const saveSearch = async () => {
        const doc = await addDoc(
            collection(db, "users", session.user.email, "savedExports"), {
                savedExport: searchTerm,
                userId: session.user.email,
                createdAt: serverTimestamp()
            }
        )
        setsaved(true);
    }

    return (
        <div>
            {!saved ?
            <button onClick={() => saveSearch(searchTerm)}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="mr-1 h-4 w-4">
                    <path
                        fill-rule="evenodd"
                        d="M19.5 21a3 3 0 003-3V9a3 3 0 00-3-3h-5.379a.75.75 0 01-.53-.22L11.47 3.66A2.25 2.25 0 009.879 3H4.5a3 3 0 00-3 3v12a3 3 0 003 3h15zm-6.75-10.5a.75.75 0 00-1.5 0v4.19l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V10.5z"
                        clip-rule="evenodd"/>
                </svg>
                <span>
                    Save Search
                </span>
            </button>
                :
                <button className="bg-green-200 hover:bg-green-100 text-green-800 font-bold py-2 px-4 rounded inline-flex items-center">
                    <span>
                    Saved
                </span>
                </button>
            }
        </div>
    )
}
