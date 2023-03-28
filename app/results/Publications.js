"use client"

import Link from 'next/link';
import Filters from "@/app/filters";

export default function Publications() {
    const people = [
        {
            name: 'Alison Amaya',
            title: 'Head of R&D',
            role: 'Professor',
            email: 'janecooper@example.com',
            imageUrl:
                'https://randomuser.me/api/portraits/women/75.jpg',
        },
        {
            name: 'Melissa Yeong',
            title: 'Biology',
            role: 'Professor',
            email: 'janecooper@example.com',
            imageUrl:
                'https://randomuser.me/api/portraits/women/60.jpg',
        },
        {
            name: 'Alison Chan',
            title: 'Chemistry',
            role: 'Professor',
            email: 'janecooper@example.com',
            imageUrl:
                'https://randomuser.me/api/portraits/women/80.jpg',
        },
        {
            name: 'Holly Billings',
            title: 'Radiology',
            role: 'Professor',
            email: 'janecooper@example.com',
            imageUrl:
                'https://randomuser.me/api/portraits/women/55.jpg',
        },
        {
            name: 'Joy Jones',
            title: 'Physics',
            role: 'Professor',
            email: 'janecooper@example.com',
            imageUrl:
                'https://randomuser.me/api/portraits/women/25.jpg',
        },
        // More people...
    ]

    return (

        <div className="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3">
            <ul
                role="list"
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-12"
            >
                {people.map((person) => (

                    <li
                        key={person.email}
                        className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
                    >
                        <Link href={`/profile`}>
                            <div className="flex flex-1 flex-col p-8">
                                <img
                                    className="mx-auto h-32 w-32 flex-shrink-0 rounded-full"
                                    src={person.imageUrl}
                                    alt=""
                                />
                                <h3 className="mt-6 text-sm font-medium text-gray-900">
                                    {person.name}
                                </h3>
                                <dl className="mt-1 flex flex-grow flex-col justify-between">
                                    <dt className="sr-only">Title</dt>
                                    <dd className="text-sm text-gray-500">{person.title}</dd>
                                    <dt className="sr-only">Role</dt>
                                    <dd className="mt-3">
                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                      {person.role}
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