import { router, usePage } from "@inertiajs/react";
import { useMemo, useState } from "react";
import Tables from "@/components/Tables";
import { DeleteButton, EditButton } from "@/components/Buttons";

import Cards from "@/components/Card";
import { AddButton, ConfirmButton, CancelButton } from "@/components/Buttons";
import { SuccessAlert, ErrorAlert } from "@/components/Alert";
import Modals from "@/components/Modals";

function Index() {
    const { data: layanans, auth, flash } = usePage().props;

    const hasPermission = (permission) => auth.permissions.includes(permission);

    const [currentId, setCurrentId] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);

    const columns = useMemo(
        () => [
            {
                key: "nama_layanan",
                label: "Nama Layanan",
            },
            {
                key: "harga_layanan_formatter",
                label: "Harga Layanan",
                formatter: (row) => {
                    return "Rp. " + row.harga_layanan_formatter;
                },
            },
            {
                key: "action",
                label: "Aksi",
                formatter: (row) => {
                    return (
                        <div className="flex flex-row gap-3">
                            {hasPermission("Edit Data Layanan") ? (
                                <EditButton
                                    handleClick={() => {
                                        router.visit(
                                            route("layanan.edit", {
                                                id: row.id,
                                            })
                                        );
                                    }}
                                />
                            ) : null}

                            {hasPermission("Hapus Data Layanan") ? (
                                <DeleteButton
                                    handleClick={() => {
                                        setCurrentId(row.id);
                                        setShowConfirm(!showConfirm);
                                    }}
                                />
                            ) : null}
                        </div>
                    );
                },
            },
        ],
        []
    );

    function toToAddForm() {
        router.visit(route("layanan.create"));
    }

    const handleDelete = (e) => {
        e.preventDefault();
        router.delete(route("layanan.delete", { id: currentId }), {
            onSuccess: () => {
                setShowConfirm(!showConfirm);
                setCurrentId(null);
            },
        });
    };

    return (
        <>
            <Cards>
                <div className="p-4">
                    <div className="border-b border-slate-100 mb-3 py-3">
                        <span>Data Layanan</span>
                    </div>
                    {flash.success ? (
                        <SuccessAlert message={flash.success} />
                    ) : null}

                    {flash.error ? <ErrorAlert message={flash.error} /> : null}
                    <br />
                    <div className="w-full flex justify-end mb-3">
                        {hasPermission("Tambah Data Layanan") ? (
                            <AddButton handleClick={toToAddForm} />
                        ) : null}
                    </div>
                    <Tables columns={columns} data={layanans.data} />
                </div>
            </Cards>

            <Modals isShowing={showConfirm} title="Hapus data?">
                <div className="flex flex-col gap-3 overflow-x-auto">
                    <span>Apakah anda yakin akan menghapus data ini ?</span>

                    <div className="flex flex-row  gap-3">
                        <ConfirmButton handleClick={handleDelete} />
                        <CancelButton
                            handleCancel={() => {
                                setCurrentId(null);
                                setShowConfirm(!showConfirm);
                            }}
                        />
                    </div>
                </div>
            </Modals>
        </>
    );
}

export default Index;
