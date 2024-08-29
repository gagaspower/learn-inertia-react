import { router, usePage } from "@inertiajs/react";
import React, { useMemo, useState, useRef } from "react";
import Card from "@/components/Card";
import {
    AddButton,
    EditButton,
    DeleteButton,
    CancelButton,
    ConfirmButton,
    SearchButton,
    FilterButtonWithRef,
} from "@/components/Buttons";
import Tables from "@/components/Tables";
import Pagination from "@/components/Pagination";
import Modals from "@/components/Modals";
import { SuccessAlert, ErrorAlert } from "@/components/Alert";
import { SmallInput, SmallSelect } from "../../components/FormInput";
import { Popover } from "flowbite-react";

export default function Index() {
    const {
        users,
        search: initialSearch,
        roles: roleData,
        searchRole,
        flash,
        auth,
    } = usePage().props;

    const hasPermission = (permission) => auth.permissions.includes(permission);

    const [params, setParams] = useState({
        query: initialSearch || "",
        role: searchRole || "all",
    });
    const [isShowConfirm, setIsShowConfirm] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [open, setOpen] = useState(false);
    const ButtonRef = useRef();

    const columns = useMemo(
        () => [
            {
                key: "name",
                label: "Nama",
            },
            {
                key: "email",
                label: "Email",
            },
            {
                key: "roles",
                label: "User Role",
            },
            {
                key: "action",
                label: "Aksi",
                formatter: (row) => {
                    return (
                        <div className="flex flex-row gap-3">
                            {hasPermission("Edit Data Pengelola") ? (
                                <EditButton
                                    handleClick={() => handleEdit(row)}
                                />
                            ) : null}
                            {hasPermission("Hapus Data Pengelola") ? (
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
        router.get(route("user.index"), param, {
            replace: true,
            preserveState,
            only: ["users"],
        });
    };

    const submitSearch = (e) => {
        e.preventDefault();
        const filteredParams = {};

        if (params.query) {
            filteredParams.query = params.query;
        }
        filteredParams.role = params.role;

        getData(filteredParams);
    };

    const handleReset = (e) => {
        e.preventDefault();
        setParams({ ...params, query: "", role: "all" });
        getData({
            role: "all",
        });
    };

    const handleEdit = (row) => {
        router.visit(route("user.edit", { id: row.id }));
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
        router.delete(route("user.delete", { id: currentId }), {
            onSuccess: () => {
                setCurrentId(null);
                setIsShowConfirm(false);
            },
        });
    };

    const handleOpenFilter = () => {
        setOpen(!open);
        if (ButtonRef.current) {
        }
    };

    function goPageAddForm() {
        router.visit(route("user.create"));
    }

    return (
        <>
            <Card>
                <div className="p-4">
                    {flash.success ? (
                        <SuccessAlert message={flash.success} />
                    ) : null}
                    {flash.error ? <ErrorAlert message={flash.error} /> : null}
                    <div className="flex flex-row items-center justify-end mb-2 gap-2">
                        <Popover
                            aria-labelledby="area-popover"
                            open={open}
                            onOpenChange={setOpen}
                            content={
                                <div className="flex w-64 flex-col gap-4 p-4 text-sm text-gray-500 dark:text-gray-400">
                                    <form
                                        onSubmit={submitSearch}
                                        className="flex flex-col"
                                    >
                                        <div>
                                            <SmallSelect
                                                value={params.role}
                                                handleChange={(e) =>
                                                    setParams({
                                                        ...params,
                                                        role: e.target.value,
                                                    })
                                                }
                                            >
                                                <option value="all">
                                                    semua role
                                                </option>
                                                {roleData.map((role, index) => {
                                                    return (
                                                        <option
                                                            key={index}
                                                            value={role}
                                                        >
                                                            {role}
                                                        </option>
                                                    );
                                                })}
                                            </SmallSelect>
                                        </div>
                                        <div>
                                            <SmallInput
                                                name="query"
                                                value={params.query}
                                                handleChange={(e) =>
                                                    setParams({
                                                        ...params,
                                                        query: e.target.value,
                                                    })
                                                }
                                                placeholder="search"
                                            />
                                        </div>
                                        <div className="flex flex-row justify-between">
                                            <SearchButton type="submit" />
                                            <button
                                                type="button"
                                                onClick={handleReset}
                                            >
                                                <span className="text-zinc-500 hover:underline text-sm font-light">
                                                    Reset
                                                </span>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            }
                        >
                            <FilterButtonWithRef
                                ref={ButtonRef}
                                onClick={handleOpenFilter}
                            />
                        </Popover>

                        {hasPermission("Tambah Data Pengelola") ? (
                            <AddButton handleClick={goPageAddForm} />
                        ) : null}
                    </div>
                    <Tables data={users.data} columns={columns} />
                    <div className="flex justify-end mt-3">
                        <Pagination
                            pageLink={users.links}
                            current_page={users.meta.current_page}
                            last_page={users.meta.last_page}
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
