import { router, useForm, usePage } from "@inertiajs/react";
import React, { useMemo, useState, useEffect } from "react";
import Card from "@/components/Card";
import Tables from "@/components/Tables";
import Pagination from "@/components/Pagination";
import { SuccessAlert, ErrorAlert } from "@/components/Alert";
import {
    InputDefault,
    InputFile,
    InputSelect,
} from "../../components/FormInput";
import {
    CancelButton,
    ClearFilterButton,
    FilterButton,
    SubmitButton,
} from "../../components/Buttons";
import Modals from "@/components/Modals";

import {
    HiArrowDownCircle,
    HiAtSymbol,
    HiArrowUpCircle,
} from "react-icons/hi2";

export default function Prabayar() {
    const { products, categories, flash, auth } = usePage().props;
    const { data, setData, post, errors, processing, reset, clearErrors } =
        useForm({
            file: null,
            product_sku: "",
            product_price: 0,
        });

    const hasPermission = (permission) => auth.permissions.includes(permission);

    const [selectedCategories, setSelectedCategories] = useState("all");
    const [modalImport, setModalImport] = useState(false);
    const [modalUpdate, setModalUpdate] = useState(false);
    const queryParam = new URLSearchParams(window.location.search);
    const selectedCatParams = queryParam.get("selected_categories");

    const columnsForMitra = useMemo(
        () => [
            {
                key: "product_name",
                label: "Nama Produk",
            },
            {
                key: "product_category",
                label: "Kategori",
            },
            {
                key: "product_price_formatted",
                label: "Harga",
                formatter: (row) => {
                    if (row.product_price === 0) {
                        return "Harga jual belum diatur";
                    } else {
                        return row.product_price_formatted;
                    }
                },
            },
        ],
        []
    );

    const columnsforAdmin = useMemo(
        () => [
            {
                key: "product_name",
                label: "Nama Produk",
            },
            {
                key: "product_category",
                label: "Kategori",
            },
            {
                key: "product_cost_formatted",
                label: "Harga Awal",
            },
            {
                key: "product_price_formatted",
                label: "Harga Jual",
                formatter: (row) => {
                    if (row.product_price === 0) {
                        return "Harga jual belum diatur";
                    } else {
                        return row.product_price_formatted;
                    }
                },
            },
            {
                key: "action",
                label: "Aksi",
                formatter: (row) => {
                    return (
                        <div className="flex flex-row gap-3">
                            <button
                                type="button"
                                onClick={() => handleUpdateHarga(row)}
                                className="inline-flex items-center justify-center h-8 gap-2 px-4 text-xs font-medium tracking-wide text-white transition duration-300 rounded focus-visible:outline-none whitespace-nowrap bg-cyan-500 hover:bg-cyan-600 focus:bg-cyan-700 disabled:cursor-not-allowed disabled:border-cyan-300 disabled:bg-cyan-300 disabled:shadow-none"
                            >
                                <span className="order-2">Atur harga jual</span>
                                <span className="relative only:-mx-4">
                                    <HiAtSymbol size={20} />
                                </span>
                            </button>
                        </div>
                    );
                },
            },
        ],
        []
    );

    useEffect(() => {
        setSelectedCategories(selectedCatParams || "all");
    }, [selectedCatParams]);

    const getData = (param = {}, preserveState = true) => {
        router.get(route("product.prabayar"), param, {
            replace: true,
            preserveState,
            only: ["products"],
        });
    };

    const submitSearch = (e) => {
        e.preventDefault();
        getData({ selected_categories: selectedCategories });
    };

    const handleReset = (e) => {
        e.preventDefault();
        setSelectedCategories("all");
        getData({
            selected_categories: "all",
        });
    };

    const handleImport = () => {
        router.visit(route("digiflaz.import_product_prabayar"));
    };

    const handleUpdateBulk = () => {
        clearErrors();
        setModalImport(!modalImport);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("product.prabayar.import"), {
            data: data.file,
            onSuccess: () => {
                clearErrors();
                setModalImport(!modalImport);
            },
        });
    };

    const handleDownloadFile = () => {
        window.location.href = route("product.prabayar.download");
    };

    const handleUpdateHarga = (row) => {
        setData({
            ...data,
            product_sku: row.product_sku,
            product_price: row.product_price,
        });
        setModalUpdate(!modalUpdate);
    };

    const handleResetUpdateHarga = () => {
        setData({
            ...data,
            product_sku: "",
            product_price: 0,
        });
        setModalUpdate(!modalUpdate);
    };

    const updateHarga = (e) => {
        e.preventDefault();
        post(route("product.prabayar.update_harga"), {
            data: {
                ...data,
                product_sku,
                product_price,
            },
            onSuccess: () => {
                clearErrors();
                reset();
                setModalUpdate(!modalUpdate);
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
                    {/* {errors ? <ErrorAlert message={errors} /> : null} */}
                    <form onSubmit={submitSearch}>
                        <div className="flex flex-col md:flex-row gap-2">
                            <div className="w-full md:w-64">
                                <InputSelect
                                    value={selectedCategories}
                                    name="selected_categories"
                                    handleChange={(e) =>
                                        setSelectedCategories(e.target.value)
                                    }
                                >
                                    <option value="all">Semua Kategori</option>
                                    {categories.map((r, index) => {
                                        return (
                                            <option value={r} key={index}>
                                                {r}
                                            </option>
                                        );
                                    })}
                                </InputSelect>
                            </div>
                        </div>

                        <div className="mt-2 mb-2 flex flex-col md:flex-row justify-between gap-3">
                            <div className="inline-flex gap-2">
                                <FilterButton type="submit" />
                                {selectedCatParams &&
                                selectedCatParams !== "all" ? (
                                    <ClearFilterButton
                                        type="button"
                                        onClick={handleReset}
                                    />
                                ) : null}
                            </div>
                            <div className="flex-col md:flex-row">
                                {auth?.user.roles[0].name === "Admin" ? (
                                    <>
                                        <button
                                            type="button"
                                            onClick={handleUpdateBulk}
                                            className="inline-flex items-center justify-center h-8 gap-2 px-4 md:mr-2 text-xs font-medium tracking-wide text-white transition duration-300 rounded focus-visible:outline-none whitespace-nowrap bg-orange-500 hover:bg-orange-600 focus:bg-orange-700 disabled:cursor-not-allowed disabled:border-orange-300 disabled:bg-orange-300 disabled:shadow-none"
                                        >
                                            <span className="order-2">
                                                Update Harga Sekaligus
                                            </span>
                                            <span className="relative only:-mx-4">
                                                <HiArrowUpCircle size={20} />
                                            </span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleImport}
                                            className="inline-flex items-center justify-center h-8 gap-2 px-4 text-xs font-medium tracking-wide text-white transition duration-300 rounded focus-visible:outline-none whitespace-nowrap bg-emerald-500 hover:bg-emerald-600 focus:bg-emerald-700 disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none"
                                        >
                                            <span className="order-2">
                                                Import Produk dari digiflaz
                                            </span>
                                            <span className="relative only:-mx-4">
                                                <HiArrowDownCircle size={20} />
                                            </span>
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={handleDownloadFile}
                                        className="inline-flex items-center justify-center h-8 gap-2 px-4 md:mr-2 text-xs font-medium tracking-wide text-white transition duration-300 rounded focus-visible:outline-none whitespace-nowrap bg-orange-500 hover:bg-orange-600 focus:bg-orange-700 disabled:cursor-not-allowed disabled:border-orange-300 disabled:bg-orange-300 disabled:shadow-none"
                                    >
                                        <span className="order-2">
                                            Download Excel
                                        </span>
                                        <span className="relative only:-mx-4">
                                            <HiArrowDownCircle size={20} />
                                        </span>
                                    </button>
                                )}
                            </div>
                        </div>
                    </form>

                    <Tables
                        data={products.data}
                        columns={
                            auth?.user.roles[0].name === "Admin"
                                ? columnsforAdmin
                                : columnsForMitra
                        }
                    />
                    <div className="flex justify-end mt-3">
                        <Pagination
                            pageLink={products.links}
                            current_page={products.meta.current_page}
                            last_page={products.meta.last_page}
                        />
                    </div>
                </div>

                <Modals isShowing={modalImport} title="Update Harga Produk">
                    <div className="flex flex-col gap-3">
                        <form onSubmit={handleSubmit}>
                            <InputFile
                                name="file"
                                formLabel="File Produk"
                                handleChange={(e) =>
                                    setData("file", e.target.files[0])
                                }
                                error={errors.file}
                            />
                            <br />
                            <button type="button" onClick={handleDownloadFile}>
                                <span className="italic font-light underline">
                                    Download format produk
                                </span>
                            </button>
                            <div className="flex flex-row mt-10 gap-3">
                                <SubmitButton isDisable={processing} />
                                <CancelButton
                                    handleCancel={() => {
                                        clearErrors();
                                        setModalImport(!modalImport);
                                    }}
                                />
                            </div>
                        </form>
                    </div>
                </Modals>

                <Modals isShowing={modalUpdate} title="Update Harga Produk">
                    <div className="flex flex-col gap-3">
                        <form onSubmit={updateHarga}>
                            <InputDefault
                                name="product_sku"
                                formLabel="SKU"
                                value={data.product_sku}
                                handleChange={(e) =>
                                    setData("product_sku", e.target.value)
                                }
                                type="text"
                                readOnly={true}
                            />
                            <br />
                            <InputDefault
                                name="product_price"
                                formLabel="Harga Jual"
                                value={data.product_price}
                                handleChange={(e) =>
                                    setData("product_price", e.target.value)
                                }
                                type="text"
                            />

                            <div className="flex flex-row mt-10 gap-3">
                                <SubmitButton isDisable={processing} />
                                <CancelButton
                                    handleCancel={handleResetUpdateHarga}
                                />
                            </div>
                        </form>
                    </div>
                </Modals>
            </Card>
        </>
    );
}
