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
import { SuccessAlert, ErrorAlert } from "@/components/Alert";
import { InputDefault, InputSelect } from "../../components/FormInput";
import { ClearFilterButton, FilterButton } from "../../components/Buttons";

export default function Index() {
    const {
        users,
        search: initialSearch,
        roles: roleData,
        selectedRole,
        flash,
        auth,
    } = usePage().props;

    const hasPermission = (permission) => auth.permissions.includes(permission);

    const [params, setParams] = useState({
        query: initialSearch || "",
        selectedRole: selectedRole || "all",
    });
    const [isShowConfirm, setIsShowConfirm] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    const queryParam = new URLSearchParams(window.location.search);
    const roleParam = queryParam.get("selectedRole");
    const searchParam = queryParam.get("query");

    console.log(roleParam);

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

    const submitSearch = (e) => {
        e.preventDefault();
        const filteredParams = {};

        if (params.query) {
            filteredParams.query = params.query;
        }
        filteredParams.selectedRole = params.selectedRole;

        getData(filteredParams);
    };

    const handleReset = (e) => {
        e.preventDefault();
        setParams({ ...params, query: "", selectedRole: "all" });
        getData({
            selectedRole: "all",
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

                    <form onSubmit={submitSearch}>
                        <div className="flex flex-col md:flex-row gap-2">
                            <div className="w-full md:w-64">
                                <InputDefault
                                    name="search"
                                    value={params.query}
                                    placeholder="cari..."
                                    handleChange={(e) =>
                                        setParams({
                                            ...params,
                                            query: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <div className="w-full md:w-64">
                                <InputSelect
                                    value={params.selectedRole}
                                    name="role"
                                    handleChange={(e) =>
                                        setParams({
                                            ...params,
                                            selectedRole: e.target.value,
                                        })
                                    }
                                >
                                    <option value="all">Semua role</option>
                                    {roleData.map((r, index) => {
                                        return (
                                            <option value={r} key={index}>
                                                {r}
                                            </option>
                                        );
                                    })}
                                </InputSelect>
                            </div>
                        </div>

                        <div className="mt-2 mb-2 flex flex-col md:flex-row justify-between">
                            <div className="inline-flex gap-2">
                                <FilterButton type="submit" />
                                {searchParam ||
                                (roleParam && roleParam !== "all") ? (
                                    <ClearFilterButton
                                        type="button"
                                        onClick={handleReset}
                                    />
                                ) : null}
                            </div>
                            <AddButton handleClick={goPageAddForm} />
                        </div>
                    </form>

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
