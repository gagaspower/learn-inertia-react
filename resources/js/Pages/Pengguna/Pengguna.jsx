import { router, useForm, usePage } from "@inertiajs/react";
import React, { useMemo, useState } from "react";
import Card from "@/components/Card";
import {
    AddButton,
    EditButton,
    DeleteButton,
    CancelButton,
    SearchButton,
    SubmitButton,
    ConfirmButton,
} from "@/components/Buttons";
import Tables from "@/components/Tables";
import Pagination from "@/components/Pagination";
import Modals from "@/components/Modals";
import { Input, InputSelect } from "@/components/FormInput";
import { SuccessAlert, ErrorAlert } from "@/components/Alert";

export default function Pengguna() {
    const {
        users,
        search: initialSearch,
        roles: roleData,
        searchRole,
        flash,
        auth,
    } = usePage().props;
    const { data, setData, processing, post, put, errors, reset, clearErrors } =
        useForm({
            name: "",
            email: "",
            password: "",
            roles: "",
        });
    const hasPermission = (permission) => auth.permissions.includes(permission);

    const [params, setParams] = useState({
        query: initialSearch || "",
        role: searchRole || "all",
    });
    const [isShowModal, setIsShowModal] = useState(false);
    const [isShowConfirm, setIsShowConfirm] = useState(false);
    const [currentId, setCurrentId] = useState(null);

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

    const handleAddModal = (e) => {
        setIsShowModal(!isShowModal);
        setCurrentId(null);
        setData({ ...data, name: "", email: "", password: "", roles: "" });
    };

    const handleEdit = (row) => {
        setCurrentId(row.id);
        setData({
            name: row.name,
            email: row.email,
            roles: row.roles,
        });
        setIsShowModal(!isShowModal);
    };

    const handleOpenConfirm = (id) => {
        setCurrentId(id);
        setIsShowConfirm(true);
    };

    const handleCloseConfirm = () => {
        setCurrentId(null);
        setIsShowConfirm(false);
    };

    const storeData = (e) => {
        e.preventDefault();

        post(route("user.store"), {
            onSuccess: () => {
                reset();
                setIsShowModal(!isShowModal);
            },
        });
    };

    const updateData = (e) => {
        e.preventDefault();
        put(route("user.update", { id: currentId }), {
            onSuccess: () => {
                setIsShowModal(!isShowModal);
            },
        });
    };

    const handleDelete = () => {
        router.delete(route("user.delete", { id: currentId }), {
            onSuccess: () => {
                setCurrentId(null);
                setIsShowConfirm(false);
            },
        });
    };
    return (
        <>
            <Card>
                <div className="p-4">
                    {flash.success ? (
                        <SuccessAlert message={flash.success} />
                    ) : null}
                    {flash.error ? <ErrorAlert message={flash.error} /> : null}
                    <div className="flex flex-col gap-3 items-center justify-between mb-3 md:flex-row ">
                        <form
                            onSubmit={submitSearch}
                            className="w-full flex flex-col md:flex-row justify-start gap-3"
                        >
                            <div className="w-full md:w-1/4">
                                <select
                                    value={params.role}
                                    onChange={(e) =>
                                        setParams({
                                            ...params,
                                            role: e.target.value,
                                        })
                                    }
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                >
                                    <option value="all">semua role</option>
                                    {roleData.map((role, index) => {
                                        return (
                                            <option key={index} value={role}>
                                                {role}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="w-full md:w-1/4">
                                <input
                                    type="text"
                                    name="query"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-5 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Search"
                                    value={params.query}
                                    onChange={(e) =>
                                        setParams({
                                            ...params,
                                            query: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="w-full flex flex-col md:flex-row gap-2 items-center">
                                <SearchButton type="submit" />
                                <CancelButton
                                    label="Reset"
                                    handleCancel={handleReset}
                                />
                            </div>
                        </form>

                        <div className="flex flex-col items-stretch justify-end flex-shrink-0 w-full space-y-2 md:w-auto md:flex-row md:space-y-0 md:items-center md:space-x-3">
                            {hasPermission("Lihat Data Pengelola") ? (
                                <AddButton handleClick={handleAddModal} />
                            ) : null}
                        </div>
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

            <Modals
                isShowing={isShowModal}
                title={currentId ? "Edit Data" : "Tambah Data"}
            >
                <div className="flex flex-col gap-3 overflow-x-auto">
                    <form onSubmit={currentId ? updateData : storeData}>
                        <Input
                            name="name"
                            formLabel="Nama"
                            value={data.name}
                            handleChange={(e) =>
                                setData("name", e.target.value)
                            }
                            type="text"
                            error={errors.name}
                        />
                        <br />
                        <Input
                            name="email"
                            formLabel="Email"
                            value={data.email}
                            handleChange={(e) =>
                                setData("email", e.target.value)
                            }
                            type="email"
                            error={errors.email}
                        />
                        <br />

                        <InputSelect
                            name="roles"
                            formLabel="Role"
                            value={data.roles}
                            handleChange={(e) =>
                                setData("roles", e.target.value)
                            }
                            error={errors.roles}
                        >
                            {roleData.map((option, index) => {
                                return (
                                    <option value={option} key={index}>
                                        {option}
                                    </option>
                                );
                            })}
                        </InputSelect>
                        <br />
                        <Input
                            name="password"
                            formLabel="Password"
                            value={data.password}
                            handleChange={(e) =>
                                setData("password", e.target.value)
                            }
                            type="password"
                            error={errors.password}
                        />
                        <br />

                        <div className="flex flex-row  gap-3">
                            <SubmitButton isDisable={processing} />
                            <CancelButton
                                handleCancel={() => {
                                    clearErrors();
                                    setIsShowModal(!isShowModal);
                                }}
                            />
                        </div>
                    </form>
                </div>
            </Modals>

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
