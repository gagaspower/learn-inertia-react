import React, { useState, useEffect } from "react";
import { InputDefault } from "../../components/FormInput";
import { usePage } from "@inertiajs/react";
import axios from "axios";
import Spinner from "../../components/Spinner";
import { ButtonBeli, ButtonShowProductPasca } from "../../components/Buttons";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Modals from "../../components/Modals";

export default function PBB() {
    const { auth } = usePage().props;
    const MySwal = withReactContent(Swal);
    const currentRole = auth?.user?.roles[0].name;

    const [customerNo, setCustomerNo] = useState("");
    const [loadingInquiry, setLoadingInquiry] = useState(false);
    const [inquiryResult, setInquiryResult] = useState(null);
    const [payPascaLoading, setPayPascaLoading] = useState(false);

    const [pbbList, setPbbList] = useState([]);
    const [pbbListLoading, setPbbListLoading] = useState(false);
    const [selectedSku, setSelectedSku] = useState(null);
    const [modalPbbList, setModalPbbList] = useState(false);
    const [search, setSearch] = useState("");

    useEffect(() => {
        getPbbProduct();
    }, []);

    const getPbbProduct = async () => {
        setPbbListLoading(true);
        try {
            const response = await axios.post(
                route("product.pascabayar.product_pasca_by_brand"),
                {
                    brand: "PBB",
                }
            );
            setPbbList(response.data);
            setPbbListLoading(false);
        } catch (error) {
            setPbbListLoading(false);
        }
    };

    const handleSearch = (value) => {
        setSearch(value);

        const pbbSearch = pbbList.filter((pbb) =>
            pbb.product_name.toLowerCase().includes(value.toLowerCase())
        );

        setPbbList(pbbSearch);
    };

    const handleReset = () => {
        setSearch("");
        getPbbProduct();
    };

    const handlePayPasca = async () => {
        if (!customerNo) {
            MySwal.fire({
                icon: "error",
                title: "Oops...",
                text: "Nomor tujuan wajib diisi!",
            });
            return "";
        }

        if (currentRole === "Admin" && inquiryResult.price > auth.saldo) {
            MySwal.fire({
                icon: "error",
                title: "Oops...",
                text: "Saldo anda tidak mencukupi!",
            });
            return "";
        }

        if (
            currentRole === "Mitra" &&
            inquiryResult.selling_price > auth.saldo
        ) {
            MySwal.fire({
                icon: "error",
                title: "Oops...",
                text: "Saldo anda tidak mencukupi!",
            });
            return "";
        }
        try {
            setPayPascaLoading(true);
            const response = await axios.post(route("ppob.pay_pasca"), {
                data: {
                    customer_no: customerNo,
                    ref_id: inquiryResult.ref_id,
                    sku: selectedSku.product_sku,
                },
            });
            MySwal.fire({
                icon: response.data.status === "Gagal" ? "error" : "success",
                title: response.data.status === "Gagal" ? "Oops..." : "Yeah...",
                text: response.data.message,
            });
        } catch (error) {
            MySwal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.message,
            });
        } finally {
            setPayPascaLoading(false);
            setInquiryResult(null);
        }
    };

    const handleSubscribe = async () => {
        if (!customerNo) {
            MySwal.fire({
                icon: "error",
                title: "Oops...",
                text: "ID Pelanggan wajib diisi",
            });
            return "";
        }
        setInquiryResult(null);
        setLoadingInquiry(true);
        try {
            const response = await axios.post(route("ppob.inquiry_pasca"), {
                customer_no: customerNo,
                sku: selectedSku.product_sku,
            });
            if (response.data.status !== "Gagal") {
                setInquiryResult(response.data);
            } else {
                MySwal.fire({
                    icon: "info",
                    title: response.data.status,
                    text: response.data.message,
                });
            }

            setLoadingInquiry(false);
        } catch (e) {
            setLoadingInquiry(false);
            MySwal.fire({
                icon: "error",
                title: "Oops...",
                text: "Saat ini sedang tidak dapat melakukan transaksi",
            });
        }
    };

    const handleShowPdamList = () => {
        setModalPbbList(!modalPbbList);
    };

    return (
        <div className="bg-white flex m-auto justify-center w-full md:max-w-xl">
            <div className="p-4 w-full md:max-w-xl">
                <div className="border-b border-b-slate-300 mb-5 py-4">
                    <h3 className="font-bold">
                        PBB ( Pajak Bumi dan Bangunan )
                    </h3>
                </div>
                <div className="">
                    <InputDefault
                        value={customerNo}
                        formLabel="No/ID Pelanggan"
                        handleChange={(e) => setCustomerNo(e.target.value)}
                    />
                    <br />
                    <ButtonShowProductPasca
                        value={selectedSku?.product_name}
                        formLabel="Pilih wilayah PBB"
                        handleClick={handleShowPdamList}
                    />
                    <br />
                    <div className="flex justify-end">
                        <ButtonBeli
                            isLoading={loadingInquiry}
                            label="Cek Tagihan"
                            handleClick={handleSubscribe}
                        />
                    </div>
                </div>
                <div className="mt-3">
                    {loadingInquiry ? (
                        <Spinner />
                    ) : (
                        <>
                            {inquiryResult ? (
                                <div className="flex flex-col w-full gap-3">
                                    <table className="table">
                                        <tbody>
                                            <tr>
                                                <td>Nama Pelanggan</td>
                                                <td>:</td>
                                                <td>
                                                    {
                                                        inquiryResult?.customer_name
                                                    }
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>No/ID Pelanggan</td>
                                                <td>:</td>
                                                <td>
                                                    {inquiryResult?.customer_no}
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>Lembar tagihan</td>
                                                <td>:</td>
                                                <td>
                                                    {
                                                        inquiryResult?.desc
                                                            ?.lembar_tagihan
                                                    }
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Tahun pajak</td>
                                                <td>:</td>
                                                <td>
                                                    {
                                                        inquiryResult?.desc
                                                            ?.tahun_pajak
                                                    }
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Luas Tanah / Gedung</td>
                                                <td>:</td>
                                                <td>
                                                    {
                                                        inquiryResult?.desc
                                                            ?.luas_tanah
                                                    }
                                                    /
                                                    {
                                                        inquiryResult?.desc
                                                            ?.luas_gedung
                                                    }
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Alamat</td>
                                                <td>:</td>
                                                <td>
                                                    {
                                                        inquiryResult?.desc
                                                            ?.alamat
                                                    }
                                                    ,
                                                    {
                                                        inquiryResult?.desc
                                                            ?.kelurahan
                                                    }
                                                    ,
                                                    {
                                                        inquiryResult?.desc
                                                            ?.kecamatan
                                                    }{" "}
                                                    -
                                                    {
                                                        inquiryResult?.desc
                                                            ?.kab_kota
                                                    }
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Tagihan</td>
                                                <td>:</td>
                                                <td>
                                                    {
                                                        inquiryResult?.selling_price_without_admin
                                                    }
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Admin Bank</td>
                                                <td>:</td>
                                                <td>
                                                    {
                                                        inquiryResult?.admin_formatter
                                                    }
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Total Tagihan</td>
                                                <td>:</td>
                                                <td>
                                                    {
                                                        inquiryResult?.selling_price_formatter
                                                    }
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <br />
                                    <ButtonBeli
                                        isLoading={payPascaLoading}
                                        label="Bayar Tagihan"
                                        handleClick={handlePayPasca}
                                    />
                                </div>
                            ) : null}
                        </>
                    )}
                </div>
            </div>

            <Modals
                title="Wilayah PBB"
                isShowing={modalPbbList}
                handleIsShowing={() => setModalPbbList(!modalPbbList)}
            >
                {pbbListLoading ? (
                    <Spinner />
                ) : (
                    <>
                        <div className="flex flex-row gap-2">
                            <InputDefault
                                value={search}
                                placeholder="Cari wilayah"
                                handleChange={(e) =>
                                    handleSearch(e.target.value)
                                }
                            />
                            {search ? (
                                <button type="button" onClick={handleReset}>
                                    <span className="font-light text-sm">
                                        reset
                                    </span>
                                </button>
                            ) : null}
                        </div>
                        <br />
                        <div className="flex flex-col w-full gap-3 overflow-y-auto max-h-[400px]">
                            {pbbList.map((product, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="flex flex-row justify-between items-center border border-slate-300 rounded-md p-5 group hover:border-teal-400"
                                    >
                                        <div className="flex flex-col">
                                            <span className="">
                                                {product.product_name}
                                            </span>
                                        </div>
                                        <ButtonBeli
                                            label="Pilih"
                                            handleClick={() => {
                                                setSelectedSku(product);
                                                setModalPbbList(!modalPbbList);
                                            }}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                        <div className="border-b border-b-slate-300 my-3"></div>
                        <div className="flex justify-end mb-3">
                            <ButtonBeli
                                label="Tutup"
                                handleClick={() =>
                                    setModalPbbList(!modalPbbList)
                                }
                            />
                        </div>
                    </>
                )}
            </Modals>
        </div>
    );
}
