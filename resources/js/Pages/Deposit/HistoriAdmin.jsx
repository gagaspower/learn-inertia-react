import { router, usePage } from "@inertiajs/react";
import React, { useMemo } from "react";
import Card from "@/components/Card";
import Tables from "@/components/Tables";
import Pagination from "@/components/Pagination";

export default function HistoriAdmin() {
    const { data: listHistori, flash, auth } = usePage().props;

    const hasPermission = (permission) => auth.permissions.includes(permission);

    const columns = useMemo(
        () => [
            {
                key: "bank",
                label: "Bank",
            },
            {
                key: "amount_payment_formatter",
                label: "Jumlah Deposit",
            },
            {
                key: "notes",
                label: "Notes/Kode Unik",
            },
        ],
        []
    );

    function goPageAddForm() {
        router.visit(route("deposit.create_ticket"));
    }
    return (
        <>
            <Card>
                <div className="p-4">
                    <div className="mt-2 mb-2 flex flex-col md:flex-row justify-between">
                        <button
                            onClick={goPageAddForm}
                            className="inline-flex items-center justify-center h-8 gap-2 px-4 text-xs font-medium tracking-wide text-white transition duration-300 rounded whitespace-nowrap bg-emerald-500 hover:bg-emerald-600 focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none"
                        >
                            <span>Tarik tiket</span>
                        </button>
                    </div>
                    <Tables data={listHistori.data} columns={columns} />
                    <div className="flex justify-end mt-3">
                        <Pagination
                            pageLink={listHistori.links}
                            current_page={listHistori.meta.current_page}
                            last_page={listHistori.meta.last_page}
                        />
                    </div>
                </div>
            </Card>
        </>
    );
}
