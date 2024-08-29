import { router, usePage } from "@inertiajs/react";
import React, { useMemo, useState } from "react";
import Card from "@/components/Card";
import {
    AddButton,
    EditButton,
    DeleteButton,
    CancelButton,
    ConfirmButton,
} from "@/components/Buttons";
import Tables from "@/components/Tables";
import Pagination from "@/components/Pagination";
import Modals from "@/components/Modals";
import { SmallInput } from "@/components/FormInput";

import { SuccessAlert, ErrorAlert } from "@/components/Alert";
import { FilterButton } from "../../components/Buttons";

export default function Index() {
    const {
        data: customers,
        search: initialSearch,
        flash,
        auth,
    } = usePage().props;

    const hasPermission = (permission) => auth.permissions.includes(permission);

    const [query, setQuery] = useState(initialSearch || "");
    const [isShowConfirm, setIsShowConfirm] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    const columns = useMemo(
        () => [
            {
                key: "kode_customer",
                label: "Kode",
            },
            {
                key: "nama_customer",
                label: "Nama",
            },
            {
                key: "alamat_customer",
                label: "Alamat",
            },
            {
                key: "telp_customer",
                label: "Telp",
            },
            {
                key: "action",
                label: "Aksi",
                formatter: (row) => {
                    return (
                        <div className="flex flex-row gap-3">
                            {hasPermission("Edit Data Customer") ? (
                                <EditButton
                                    handleClick={() => handleEdit(row)}
                                />
                            ) : null}
                            {hasPermission("Hapus Data Customer") ? (
                                <DeleteButton
                                    handleClick={() =>
                                        handleOpenConfirm(row.id)
                                    }
                                />
                            ) : null}
                        </div>
                    );
                },
            },
        ],
        []
    );

    const getData = (param = {}, preserveState = true) => {
        router.get(route("customer.index"), param, {
            replace: true,
            preserveState,
        });
    };

    const AddNewData = () => {
        router.visit(route("customer.create"));
    };

    const handleEdit = (row) => {
        router.visit(route("customer.detail", { id: row.id }));
    };

    const handleOpenConfirm = (id) => {
        setCurrentId(id);
        setIsShowConfirm(true);
    };

    const handleCloseConfirm = () => {
        setCurrentId(null);
        setIsShowConfirm(false);
    };

    const handleDelete = () => {
        router.delete(route("customer.delete", { id: currentId }), {
            onSuccess: () => {
                setCurrentId(null);
                setIsShowConfirm(false);
            },
        });
    };

    const handleSearchData = (e) => {
        e.preventDefault();
        getData({ query });
    };
    return (
        <>
            <Card>
                <div className="p-4">
                    <div className="mb-3 border-b border-slate-50 py-3">
                        <span className="font-medium">Data Customer</span>
                    </div>
                    {flash.success ? (
                        <SuccessAlert message={flash.success} />
                    ) : null}
                    {flash.error ? <ErrorAlert message={flash.error} /> : null}
                    <div className="flex flex-col gap-3 justify-between mb-3 md:flex-row ">
                        <div className="w-full md:w-1/3">
                            <form onSubmit={handleSearchData}>
                                <SmallInput
                                    placeholder="search..."
                                    value={query}
                                    handleChange={(e) =>
                                        setQuery(e.target.value)
                                    }
                                />
                                <div className="inline-flex gap-3">
                                    <FilterButton type="submit" />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setQuery("");
                                            getData();
                                        }}
                                    >
                                        <span className="text-zinc-500 hover:underline text-sm font-light">
                                            Reset
                                        </span>
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div>
                            {hasPermission("Tambah Data Customer") ? (
                                <AddButton handleClick={AddNewData} />
                            ) : null}
                        </div>
                    </div>

                    <Tables data={customers.data} columns={columns} />
                    <div className="flex justify-end mt-3">
                        <Pagination
                            pageLink={customers.links}
                            current_page={customers.meta.current_page}
                            last_page={customers.meta.last_page}
                        />
                    </div>
                </div>
            </Card>

            <Modals isShowing={isShowConfirm} title="Hapus data?">
                <div className="flex flex-col gap-3 overflow-x-auto">
                    <span>Apakah anda yakin akan menghapus data ini ?</span>

                    <div className="flex flex-row  gap-3">
                        <ConfirmButton handleClick={handleDelete} />
                        <CancelButton handleCancel={handleCloseConfirm} />
                    </div>
                </div>
            </Modals>
        </>
    );
}
