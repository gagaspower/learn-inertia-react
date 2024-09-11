import { router, usePage } from "@inertiajs/react";
import React, { useMemo, useState } from "react";
import Card from "@/components/Card";
import Tables from "@/components/Tables";
import Pagination from "@/components/Pagination";
import Modals from "@/components/Modals";

import { HiOutlineEye } from "react-icons/hi2";
import { CancelButton } from "../../components/Buttons";

export default function Mitra() {
    const { data: listHistori, flash, auth } = usePage().props;

    const hasPermission = (permission) => auth.permissions.includes(permission);
    const [modalDetail, setModalDetail] = useState(false);
    const [currentData, setCurrentData] = useState(null);

    const columns = useMemo(
        () => [
            {
                key: "order_id",
                label: "Deposit Kode",
            },
            {
                key: "bank",
                label: "Bank",
            },
            {
                key: "gross_amount_formatter",
                label: "Jumlah Depo",
            },
            {
                key: "status",
                label: "Status Depo",
            },
            {
                key: "user",
                label: "Nama",
            },
            {
                key: "action",
                label: "Aksi",
                formatter: (row) => {
                    return (
                        <div className="flex flex-row gap-3">
                            <button
                                onClick={() => {
                                    setCurrentData(row);
                                    setModalDetail(!modalDetail);
                                }}
                                className="inline-flex h-8 items-center justify-center gap-2 justify-self-center whitespace-nowrap rounded bg-emerald-50 px-4 text-xs font-medium tracking-wide text-emerald-500 transition duration-300 hover:bg-emerald-100 hover:text-emerald-600 focus:bg-emerald-200 focus:text-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-100 disabled:text-emerald-400 disabled:shadow-none"
                            >
                                <span className="order-2">Detail</span>
                                <span className="relative only:-mx-4">
                                    <HiOutlineEye />
                                </span>
                            </button>
                        </div>
                    );
                },
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
                        {auth?.user?.roles[0].name === "Mitra" ? (
                            <button
                                onClick={goPageAddForm}
                                className="inline-flex items-center justify-center h-8 gap-2 px-4 text-xs font-medium tracking-wide text-white transition duration-300 rounded whitespace-nowrap bg-emerald-500 hover:bg-emerald-600 focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none"
                            >
                                <span>Tarik tiket</span>
                            </button>
                        ) : null}
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

            <Modals title="Detail Deposit" isShowing={modalDetail}>
                <div>
                    <table className="table" cellPadding="5">
                        <tbody>
                            <tr>
                                <td>Deposit Kode</td>
                                <td>:</td>
                                <td>{currentData?.order_id}</td>
                            </tr>
                            <tr>
                                <td>Bank</td>
                                <td>:</td>
                                <td>{currentData?.bank}</td>
                            </tr>

                            <tr>
                                <td>Jumlah Deposit</td>
                                <td>:</td>
                                <td>{currentData?.gross_amount_formatter}</td>
                            </tr>

                            <tr>
                                <td>VA Bank</td>
                                <td>:</td>
                                <td>{currentData?.va_number}</td>
                            </tr>
                            <tr>
                                <td>Status Deposit</td>
                                <td>:</td>
                                <td>{currentData?.status}</td>
                            </tr>
                            <tr>
                                <td>Jatuh tempo</td>
                                <td>:</td>
                                <td>{currentData?.expiry_time_formatter}</td>
                            </tr>
                        </tbody>
                    </table>
                    <br />
                    <div className="border-b border-b-slate-200 mb-2"></div>
                    <div className="flex justify-end">
                        <CancelButton
                            label="Ok, tutup"
                            handleCancel={() => setModalDetail(!modalDetail)}
                        />
                    </div>
                </div>
            </Modals>
        </>
    );
}
