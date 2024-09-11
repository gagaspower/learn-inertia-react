import React, { useState, useEffect } from "react";
import { InputDefault, InputSelect } from "../../components/FormInput";
import { usePage } from "@inertiajs/react";
import axios from "axios";
import Spinner from "../../components/Spinner";
import { ButtonBeli } from "../../components/Buttons";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function IndexMitra() {
    const { bankList } = usePage().props;
    const MySwal = withReactContent(Swal);

    const [amount, setAmount] = useState("0");
    const [selectedBank, setSelectedBank] = useState("");
    const [loadingDepo, setLoadingDepo] = useState(false);
    const [depoResult, setDepoResult] = useState(null);

    const handleTopup = async () => {
        if (amount < "50000") {
            MySwal.fire({
                icon: "error",
                title: "Oops...",
                text: "Minimal deposit Rp. 50,000",
            });
            return "";
        }
        if (selectedBank === "") {
            MySwal.fire({
                icon: "error",
                title: "Oops...",
                text: "Silahkan pilih bank tujuan",
            });
            return "";
        }
        try {
            setLoadingDepo(true);
            const response = await axios.post(route("deposit.store"), {
                amount: amount,
                bank: selectedBank,
            });

            setDepoResult(response.data);
        } catch (error) {
            MySwal.fire({
                icon: "error",
                title: "Oops...",
                text: "Saat ini transaksi tidak dapat dilakukan, silahkan coba lagi nanti",
            });
        } finally {
            setLoadingDepo(false);
            setAmount("0");
            setSelectedBank("");
        }
    };

    return (
        <div className="bg-white flex m-auto justify-center w-full md:max-w-xl">
            <div className="p-4 w-full md:max-w-xl">
                <div className="border-b border-b-slate-300 mb-5 py-4">
                    <h3 className="font-bold">Deposit saldo</h3>
                </div>
                <div className="">
                    <InputDefault
                        value={amount}
                        formLabel="Jumlah Deposit"
                        handleChange={(e) => setAmount(e.target.value)}
                    />
                    <br />
                    <InputSelect
                        value={selectedBank}
                        formLabel="Pilih bank"
                        handleChange={(e) => setSelectedBank(e.target.value)}
                    >
                        <option value="">Pilih</option>
                        {bankList.map((bank, index) => {
                            return (
                                <option value={bank.kode_bank} key={index}>
                                    {bank.nama_bank}
                                </option>
                            );
                        })}
                    </InputSelect>
                    <br />
                    {depoResult === null ? (
                        <ButtonBeli
                            label="Topup"
                            handleClick={handleTopup}
                            isLoading={loadingDepo}
                        />
                    ) : null}
                </div>
                <div className="mt-3">
                    {loadingDepo ? (
                        <Spinner />
                    ) : (
                        <>
                            {depoResult ? (
                                <div className="flex flex-col w-full gap-3">
                                    <span className="italic font-bold">
                                        Detail Pembayaran deposit anda
                                    </span>
                                    <table className="table">
                                        <tbody>
                                            <tr>
                                                <td>Invoice Kode</td>
                                                <td>:</td>
                                                <td>{depoResult?.order_id}</td>
                                            </tr>
                                            <tr>
                                                <td>Jumlah pembayaran</td>
                                                <td>:</td>
                                                <td>
                                                    {
                                                        depoResult?.gross_amount_formatter
                                                    }
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Bank tujuan</td>
                                                <td>:</td>
                                                <td>
                                                    {depoResult?.bank_tujuan}
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>Status Pembayaran</td>
                                                <td>:</td>
                                                <td>
                                                    {
                                                        depoResult?.transaction_status
                                                    }
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>VA Bank</td>
                                                <td>:</td>
                                                <td>{depoResult?.va_number}</td>
                                            </tr>
                                            <tr>
                                                <td>Batas Waktu Pembayaran</td>
                                                <td>:</td>
                                                <td>
                                                    {
                                                        depoResult?.expiry_time_formatter
                                                    }
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            ) : null}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
