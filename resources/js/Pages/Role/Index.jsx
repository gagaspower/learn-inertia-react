import { Link, usePage } from "@inertiajs/react";
import React, { useMemo } from "react";

import Cards from "@/components/Card";
import Tables from "@/components/Tables";

export default function Index() {
    const { data, auth } = usePage().props;
    const hasPermission = (permission) => auth.permissions.includes(permission);

    const columns = useMemo(
        () => [
            {
                key: "name",
                label: "Nama",
            },
            {
                key: "action",
                label: "Aksi",
                formatter: (row) => {
                    return (
                        <>
                            {hasPermission("Atur Data Hak Akses") ? (
                                <Link
                                    href={route("role.detail", { id: row.id })}
                                    className="inline-flex items-center justify-center h-8 gap-2 px-4 text-xs font-medium tracking-wide text-white transition duration-300 rounded focus-visible:outline-none whitespace-nowrap bg-emerald-500 hover:bg-emerald-600 focus:bg-emerald-700 disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none"
                                >
                                    <span className="order-2">
                                        Atur Hak Akses
                                    </span>
                                    <span className="relative only:-mx-4">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-4 h-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            role="graphics-symbol"
                                            aria-labelledby="title-11 desc-11"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                                            />
                                        </svg>
                                    </span>
                                </Link>
                            ) : null}
                        </>
                    );
                },
            },
        ],
        []
    );
    return (
        <>
            <Cards>
                <div className="p-4">
                    <Tables data={data} columns={columns} />
                </div>
            </Cards>
        </>
    );
}
