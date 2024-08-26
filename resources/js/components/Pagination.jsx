import React from "react";
import { Link } from "@inertiajs/react";

export default function Pagination({ pageLink, current_page, last_page }) {
    return (
        <>
            <nav role="navigation" aria-label="Pagination Navigation">
                <ul className="flex list-none items-center justify-center divide-x divide-slate-200 overflow-hidden rounded border border-slate-200 text-sm text-slate-700">
                    <li>
                        <Link
                            href={pageLink.prev}
                            aria-label="Goto Page 1"
                            className={`inline-flex h-10 items-center justify-center gap-4 stroke-slate-700 px-4 text-sm font-medium text-slate-700 transition duration-300  ${
                                current_page === 1
                                    ? "disabled cursor-not-allowed"
                                    : "hover:bg-emerald-50 hover:stroke-emerald-500 hover:text-emerald-500  focus:bg-emerald-50 focus:stroke-emerald-600 focus:text-emerald-600 focus-visible:outline-none"
                            }`}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="-mx-1 h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                role="graphics-symbol"
                                aria-labelledby="title-47 desc-47"
                            >
                                <title id="title-47">Previous page</title>
                                <desc id="desc-47">link to previous page</desc>
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                            <span>Prev</span>
                        </Link>
                    </li>

                    <li>
                        <Link
                            href={pageLink.next}
                            aria-label="Goto Page 3"
                            className={`inline-flex h-10 items-center justify-center gap-4 stroke-slate-700 px-4 text-sm font-medium text-slate-700 transition duration-300   ${
                                current_page === last_page
                                    ? "disabled cursor-not-allowed"
                                    : "hover:bg-emerald-50 hover:stroke-emerald-500 hover:text-emerald-500  focus:bg-emerald-50 focus:stroke-emerald-600 focus:text-emerald-600 focus-visible:outline-none"
                            }`}
                        >
                            <span>Next </span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="-mx-1 h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                role="graphics-symbol"
                                aria-labelledby="title-48 desc-48"
                            >
                                <title id="title-48">Next page</title>
                                <desc id="desc-48">link to next page</desc>
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    );
}
