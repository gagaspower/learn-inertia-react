import { usePage } from "@inertiajs/react";
import React, { useMemo, useState, useEffect } from "react";
import Card from "@/components/Card";
import Tables from "@/components/Tables";
import Pagination from "@/components/Pagination";
import { InputDate, InputSelect } from "../../components/FormInput";
import { CancelButton, FilterButton } from "../../components/Buttons";
import Modals from "@/components/Modals";
import { HiOutlineEye } from "react-icons/hi2";
import { HiArrowDownCircle } from "react-icons/hi2";
import axios from "axios";
import Spinner from "@/components/Spinner";

export default function Prabayar() {
    const { categories_filter, auth } = usePage().props;

    const hasPermission = (permission) => auth.permissions.includes(permission);

    const [selectedCategories, setSelectedCategories] = useState("all");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [modalDetail, setModalDetail] = useState(false);
    const [currentData, setCurrentData] = useState(null);
    const [loadingReport, setLoadingReport] = useState(false);
    const [data, setData] = useState([]);
    const [excelUrl, setExcelUrl] = useState("");

    const getDataReport = async () => {
        setLoadingReport(true);
        try {
            const response = await axios.post(
                route("laporan.prabayar.get_report"),
                {
                    categories: selectedCategories,
                    start_date: startDate,
                    end_date: endDate,
                }
            );

            setData(response.data.data);
            setExcelUrl(response.data.excel_url);
            setLoadingReport(false);
        } catch (error) {
            setLoadingReport(false);
        }
    };

    useEffect(() => {
        getDataReport();
    }, []);

    const columns = useMemo(
        () => [
            {
                key: "transaction_code",
                label: "Kode Trx",
            },
            {
                key: "transaction_customer_no",
                label: "No/ID Pelanggan",
            },
            {
                key: "transaction_product_name",
                label: "Produk",
            },
            {
                key: "transaction_status",
                label: "Status",
            },
            {
                key: "transaction_source",
                label: "Source",
            },
            {
                key: "action",
                label: "Aksi",
                formatter: (row) => {
                    return (
                        <div className="flex flex-row gap-3">
                            <button
                                onClick={() => {
                                    setModalDetail(!modalDetail);
                                    setCurrentData(row);
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

    const handleSearch = () => {
        getDataReport();
    };

    const handleDownloadFile = () => {
        window.location.href = excelUrl;
    };

    return (
        <>
            <Card>
                <div className="p-4">
                    <div className="flex flex-col md:flex-row gap-2">
                        <div className="w-full md:w-64">
                            <InputDate
                                formLabel="Tanggal Awal"
                                name="startDate"
                                value={startDate}
                                handleChange={(e) =>
                                    setStartDate(e.target.value)
                                }
                            />
                        </div>
                        <div className="w-full md:w-64">
                            <InputDate
                                formLabel="Tanggal Akhir"
                                name="endDate"
                                value={endDate}
                                handleChange={(e) => setEndDate(e.target.value)}
                            />
                        </div>
                        <div className="w-full md:w-64">
                            <InputSelect
                                formLabel="Kategori Produk"
                                value={selectedCategories}
                                name="categories"
                                handleChange={(e) =>
                                    setSelectedCategories(e.target.value)
                                }
                            >
                                <option value="all">Semua Kategori</option>
                                {categories_filter.map((r, index) => {
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
                            <FilterButton onClick={handleSearch} />
                        </div>
                        <div className="flex-col md:flex-row">
                            <button
                                type="button"
                                onClick={handleDownloadFile}
                                className="inline-flex items-center justify-center h-8 gap-2 px-4 md:mr-2 text-xs font-medium tracking-wide text-white transition duration-300 rounded focus-visible:outline-none whitespace-nowrap bg-orange-500 hover:bg-orange-600 focus:bg-orange-700 disabled:cursor-not-allowed disabled:border-orange-300 disabled:bg-orange-300 disabled:shadow-none"
                            >
                                <span className="order-2">Download Excel</span>
                                <span className="relative only:-mx-4">
                                    <HiArrowDownCircle size={20} />
                                </span>
                            </button>
                        </div>
                    </div>

                    {loadingReport ? (
                        <Spinner />
                    ) : (
                        <>
                            <Tables data={data.data} columns={columns} />
                            <div className="flex justify-end mt-3">
                                <Pagination
                                    pageLink={{
                                        prev: data.prev_page_url,
                                        next: data.next_page_url,
                                    }}
                                    current_page={data.current_page}
                                    last_page={data.last_page}
                                />
                            </div>
                        </>
                    )}
                </div>
            </Card>
            <Modals title="Detail Transaksi" isShowing={modalDetail}>
                <div>
                    <table className="table" cellPadding="5">
                        <tbody>
                            <tr>
                                <td>Kode Transaksi</td>
                                <td>:</td>
                                <td>{currentData?.transaction_code}</td>
                            </tr>
                            <tr>
                                <td>No Tujuan</td>
                                <td>:</td>
                                <td>{currentData?.transaction_customer_no}</td>
                            </tr>
                            <tr>
                                <td>Jenis Produk</td>
                                <td>:</td>
                                <td>
                                    {currentData?.transaction_product_category}
                                </td>
                            </tr>
                            <tr>
                                <td>Produk</td>
                                <td>:</td>
                                <td>{currentData?.transaction_product_name}</td>
                            </tr>

                            <tr>
                                <td>Source Transaksi</td>
                                <td>:</td>
                                <td>{currentData?.transaction_source}</td>
                            </tr>
                            <tr>
                                <td>Harga Produk</td>
                                <td>:</td>
                                <td>
                                    {auth?.user?.roles[0].name === "Admin"
                                        ? currentData?.transaction_product_cost_formatted
                                        : currentData?.transaction_product_price_formatted}
                                </td>
                            </tr>
                            <tr>
                                <td>Status Transaksi</td>
                                <td>:</td>
                                <td>{currentData?.transaction_status}</td>
                            </tr>
                            <tr>
                                <td>SN</td>
                                <td>:</td>
                                <td>{currentData?.transaction_sn}</td>
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
