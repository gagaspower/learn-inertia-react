import { useMemo, useState } from "react";
import Tables from "@/components/Tables";
import { EditButton } from "@/components/Buttons";
import { router, useForm, usePage } from "@inertiajs/react";

import Pagination from "@/components/Pagination";
import Card from "@/components/Card";
import { SearchInput } from "@/components/SearchInput";
import {
    AddButton,
    DeleteButton,
    SubmitButton,
    CancelButton,
    ConfirmButton,
} from "@/components/Buttons";
import Modals from "@/components/Modals";

import { ErrorAlert, SuccessAlert } from "../../components/Alert";
import { InputSelect, InputDefault } from "../../components/FormInput";

function Home({ merks, search: initialSearch }) {
    const [search, setSearch] = useState(initialSearch || "");
    const [showModal, setShowModal] = useState(false);
    const [modalConfirm, setModalConfirm] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const { data, setData, post, processing, errors, reset } = useForm({
        nama_merk: "",
        kategori_merk: "",
    });
    const { flash, auth } = usePage().props;
    const { url } = usePage();
    const hasPermission = (permission) => auth.permissions.includes(permission);
    const columns = useMemo(
        () => [
            {
                key: "nama_merk",
                label: "Nama Merk",
            },
            {
                key: "kategori_merk",
                label: "Kategori",
            },
            {
                key: "aksi",
                label: "Aksi",
                formatter: (row) => {
                    return (
                        <div className="flex flex-col md:flex-row gap-2">
                            {hasPermission("Edit Data Merk Kendaraan") ? (
                                <EditButton
                                    handleClick={() => handleEdit(row)}
                                />
                            ) : null}
                            {hasPermission("Hapus Data Merk Kendaraan") ? (
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

    const options = useMemo(() => ["mobil", "motor"], []);

    const handleSearch = (e) => {
        e.preventDefault();
        getData({ query: search });
    };

    const handleReset = (e) => {
        e.preventDefault();
        setSearch("");
        getData({});
    };

    const getData = (params = {}, preserveState = true) => {
        router.get(route("merk.index"), params, {
            replace: true,
            preserveState,
        });
    };

    const handleModal = (e) => {
        e.preventDefault();
        setCurrentId(null);
        setData({
            nama_merk: "",
            kategori_merk: "",
        });
        setShowModal(true);
    };

    const handleEdit = (row) => {
        setCurrentId(row.id);
        setData({
            nama_merk: row.nama_merk,
            kategori_merk: row.kategori_merk,
        });
        setShowModal(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let url = route("merk.store");

        if (currentId) {
            url = route("merk.update", { id: currentId });
        }
        post(url, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                reset();
                setCurrentId(null);
                setShowModal(false);
            },
        });
    };

    const handleOpenConfirm = (id) => {
        setCurrentId(id);
        setModalConfirm(true);
    };

    const handleCloseConfirm = () => {
        setCurrentId(null);
        setModalConfirm(false);
    };

    const handleDelete = () => {
        router.delete(route("merk.delete", { id: currentId }), {
            onSuccess: () => {
                setCurrentId(null);
                setModalConfirm(false);
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
                        <div className="w-full md:w-1/2">
                            <SearchInput
                                label={url.includes("query") ? "Reset" : "Cari"}
                                onChange={(e) => setSearch(e.target.value)}
                                value={search}
                                handleSubmit={
                                    url.includes("query")
                                        ? handleReset
                                        : handleSearch
                                }
                            />
                        </div>
                        <div className="flex flex-col items-stretch justify-end flex-shrink-0 w-full space-y-2 md:w-auto md:flex-row md:space-y-0 md:items-center md:space-x-3">
                            {hasPermission("Tambah Data Merk Kendaraan") ? (
                                <AddButton handleClick={handleModal} />
                            ) : null}
                        </div>
                    </div>

                    <Tables data={merks.data} columns={columns} />
                    <div className="flex justify-end mt-3">
                        <Pagination
                            pageLink={merks.links}
                            current_page={merks.meta.current_page}
                            last_page={merks.meta.last_page}
                        />
                    </div>
                </div>
            </Card>
            <Modals
                isShowing={showModal}
                title={currentId ? "Edit Data" : "Tambah Data"}
            >
                <div className="flex flex-col gap-3">
                    <form onSubmit={handleSubmit}>
                        <InputDefault
                            name="nama_merk"
                            formLabel="Nama Merk"
                            value={data.nama_merk}
                            handleChange={(e) =>
                                setData("nama_merk", e.target.value)
                            }
                            type="text"
                            error={errors.nama_merk}
                        />
                        <br />

                        <InputSelect
                            name="kategori_merk"
                            formLabel="Kategori Merk"
                            value={data.kategori_merk}
                            handleChange={(e) =>
                                setData("kategori_merk", e.target.value)
                            }
                            error={errors.kategori_merk}
                        >
                            {options.map((option, index) => {
                                return (
                                    <option value={option} key={index}>
                                        {option}
                                    </option>
                                );
                            })}
                        </InputSelect>
                        <br />

                        <div className="flex flex-row mt-10 gap-3">
                            <SubmitButton isDisable={processing} />
                            <CancelButton
                                handleCancel={() => setShowModal(!showModal)}
                            />
                        </div>
                    </form>
                </div>
            </Modals>

            <Modals isShowing={modalConfirm} title="Hapus data">
                <div className="flex flex-col gap-3">
                    <span>Anda yakin akan menghapus data ini ?</span>
                    <div className="flex flex-row mt-10 gap-3">
                        {/* <SubmitButton isDisable={processing} /> */}
                        <ConfirmButton handleClick={handleDelete} />
                        <CancelButton handleCancel={handleCloseConfirm} />
                    </div>
                </div>
            </Modals>
        </>
    );
}

export default Home;
