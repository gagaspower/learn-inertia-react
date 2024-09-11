import { router, usePage } from "@inertiajs/react";
import React, { useMemo, useState, useEffect } from "react";
import Card from "@/components/Card";
import { AddButton, EditButton, DeleteButton } from "@/components/Buttons";
import Tables from "@/components/Tables";
import Pagination from "@/components/Pagination";
import { SuccessAlert, ErrorAlert } from "@/components/Alert";
import { InputSelect } from "../../components/FormInput";
import { ClearFilterButton, FilterButton } from "../../components/Buttons";
import DeleteConfirm from "../../components/DeleteConfirm";

export default function Index() {
    const { nomor: dataNomor, brands: filter, flash, auth } = usePage().props;

    const hasPermission = (permission) => auth.permissions.includes(permission);

    const [selectedBrand, setSelectedBrand] = useState("All");
    const [isShowConfirm, setIsShowConfirm] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    const queryParam = new URLSearchParams(window.location.search);
    const selectedBrandParams = queryParam.get("selected_provider");

    const columns = useMemo(
        () => [
            {
                key: "number",
                label: "Nomor",
            },
            {
                key: "operator",
                label: "Provider",
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

    useEffect(() => {
        setSelectedBrand(selectedBrandParams || "All");
    }, [selectedBrandParams]);

    const getData = (param = {}, preserveState = true) => {
        router.get(route("kode_nomor.index"), param, {
            replace: true,
            preserveState,
            only: ["nomor"],
        });
    };

    const submitSearch = (e) => {
        e.preventDefault();
        getData({ selected_provider: selectedBrand });
    };

    const handleReset = (e) => {
        e.preventDefault();
        setSelectedBrand("All");
        getData({
            selected_provider: "All",
        });
    };

    const handleEdit = (row) => {
        router.visit(route("kode_nomor.edit", { id: row.id }));
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
        router.delete(route("kode_nomor.delete", { id: currentId }), {
            onSuccess: () => {
                setCurrentId(null);
                setIsShowConfirm(false);
            },
        });
    };

    function goPageAddForm() {
        router.visit(route("kode_nomor.create"));
    }

    return (
        <>
            <Card>
                <div className="p-4">
                    {flash.success ? (
                        <SuccessAlert message={flash.success} />
                    ) : null}
                    {flash.error ? <ErrorAlert message={flash.error} /> : null}

                    <form onSubmit={submitSearch}>
                        <div className="flex flex-col md:flex-row gap-2">
                            <div className="w-full md:w-64">
                                <InputSelect
                                    value={selectedBrand}
                                    name="selected_brand"
                                    handleChange={(e) =>
                                        setSelectedBrand(e.target.value)
                                    }
                                >
                                    <option value="All">Semua Provider</option>
                                    {filter.map((r, index) => {
                                        return (
                                            <option value={r} key={index}>
                                                {r}
                                            </option>
                                        );
                                    })}
                                </InputSelect>
                            </div>
                        </div>

                        <div className="mt-2 mb-2 flex flex-col md:flex-row justify-between gap-2">
                            <div className="inline-flex gap-2">
                                <FilterButton type="submit" />
                                {selectedBrandParams &&
                                selectedBrandParams !== "All" ? (
                                    <ClearFilterButton
                                        type="button"
                                        onClick={handleReset}
                                    />
                                ) : null}
                            </div>
                            <AddButton handleClick={goPageAddForm} />
                        </div>
                    </form>

                    <Tables data={dataNomor.data} columns={columns} />
                    <div className="flex justify-end mt-3">
                        <Pagination
                            pageLink={dataNomor.links}
                            current_page={dataNomor.meta.current_page}
                            last_page={dataNomor.meta.last_page}
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
