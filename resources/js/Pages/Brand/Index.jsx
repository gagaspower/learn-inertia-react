import { router, usePage } from "@inertiajs/react";
import React, { useMemo, useState } from "react";
import Card from "@/components/Card";
import { AddButton, EditButton, DeleteButton } from "@/components/Buttons";
import Tables from "@/components/Tables";
import Pagination from "@/components/Pagination";

import { SuccessAlert, ErrorAlert } from "@/components/Alert";
import DeleteConfirm from "../../components/DeleteConfirm";

export default function Index() {
    const { brands, flash, auth } = usePage().props;

    const hasPermission = (permission) => auth.permissions.includes(permission);

    const [isShowConfirm, setIsShowConfirm] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const columns = useMemo(
        () => [
            {
                key: "brand_name",
                label: "Nama",
            },
            {
                key: "brand_type",
                label: "Kategori",
            },
            {
                key: "brand_logo",
                label: "Logo",
                formatter: (row) => {
                    const imgLogo = `/storage/brand/${row.brand_logo}`;
                    return (
                        <img
                            src={imgLogo}
                            alt="Brand Logo"
                            width={100}
                            height={100}
                        />
                    );
                },
            },
            {
                key: "action",
                label: "Aksi",
                formatter: (row) => {
                    return (
                        <div className="flex flex-row gap-3">
                            <EditButton handleClick={() => handleEdit(row)} />

                            <DeleteButton
                                handleClick={() => handleOpenConfirm(row.id)}
                            />
                        </div>
                    );
                },
            },
        ],
        []
    );

    const getData = (param = {}, preserveState = true) => {
        router.get(route("user.index"), param, {
            replace: true,
            preserveState,
            only: ["users"],
        });
    };

    const handleEdit = (row) => {
        router.visit(route("brand.edit", { id: row.id }));
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
        router.delete(route("brand.delete", { id: currentId }), {
            onSuccess: () => {
                setCurrentId(null);
                setIsShowConfirm(false);
            },
        });
    };

    function goPageAddForm() {
        router.visit(route("brand.create"));
    }

    return (
        <>
            <Card>
                <div className="p-4">
                    {flash.success ? (
                        <SuccessAlert message={flash.success} />
                    ) : null}
                    {flash.error ? <ErrorAlert message={flash.error} /> : null}

                    <div className="flex justify-end mb-2">
                        <AddButton handleClick={goPageAddForm} />
                    </div>

                    <Tables data={brands.data} columns={columns} />
                    <div className="flex justify-end mt-3">
                        <Pagination
                            pageLink={brands.links}
                            current_page={brands.meta.current_page}
                            last_page={brands.meta.last_page}
                        />
                    </div>
                </div>
            </Card>

            <DeleteConfirm
                isVisible={isShowConfirm}
                handleDelete={handleDelete}
                handleCancel={handleCloseConfirm}
            />
        </>
    );
}
