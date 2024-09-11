import React, { useState } from "react";
import { InputDefault } from "../../components/FormInput";
import { usePage } from "@inertiajs/react";
import axios from "axios";
import Spinner from "../../components/Spinner";
import { ButtonBeli } from "../../components/Buttons";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function BPJS() {
    const { auth } = usePage().props;
    const MySwal = withReactContent(Swal);
    const currentRole = auth?.user?.roles[0].name;

    const [customerNo, setCustomerNo] = useState("");
    const [loadingInquiry, setLoadingInquiry] = useState(false);
    const [inquiryResult, setInquiryResult] = useState(null);
    const [payPascaLoading, setPayPascaLoading] = useState(false);

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
                    sku: "bpjs",
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
                sku: "bpjs",
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

    return (
        <div className="bg-white flex m-auto justify-center w-full md:max-w-xl">
            <div className="p-4 w-full md:max-w-xl">
                <div className="border-b border-b-slate-300 mb-5 py-4">
                    <h3 className="font-bold">BPJS Kesehatan</h3>
                </div>
                <div className="">
                    <InputDefault
                        value={customerNo}
                        formLabel="No/ID Pelanggan"
                        handleChange={(e) => setCustomerNo(e.target.value)}
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
                                                <td>Jumlah Bulan</td>
                                                <td>:</td>
                                                <td>
                                                    {
                                                        inquiryResult?.desc
                                                            ?.lembar_tagihan
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
        </div>
    );
}
