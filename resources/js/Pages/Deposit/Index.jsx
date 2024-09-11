import React, { useState, useEffect } from "react";
import { InputDefault, InputSelect } from "../../components/FormInput";
import { usePage } from "@inertiajs/react";
import axios from "axios";
import Spinner from "../../components/Spinner";
import { ButtonBeli } from "../../components/Buttons";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function Index() {
    const { bankList } = usePage().props;
    const MySwal = withReactContent(Swal);

    const [amount, setAmount] = useState("0");
    const [bankOwner, setBankOwner] = useState("");
    const [selectedBank, setSelectedBank] = useState("");
    const [loadingDepo, setLoadingDepo] = useState(false);
    const [depoResult, setDepoResult] = useState(null);

    const handleTopup = async () => {
        if (amount === "0") {
            MySwal.fire({
                icon: "error",
                title: "Oops...",
                text: "Minimal deposit Rp. 200,000!",
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
        if (bankOwner === "") {
            MySwal.fire({
                icon: "error",
                title: "Oops...",
                text: "Nama pemilik bank wajib diisi",
            });
            return "";
        }
        try {
            setLoadingDepo(true);
            const response = await axios.post(route("deposit.store_admin"), {
                amount: amount,
                bank: selectedBank,
                owner: bankOwner,
            });

            if (response.data.rc !== "00") {
                MySwal.fire({
                    icon: response.data.rc !== "00" ? "success" : "error",
                    title: response.data.rc !== "00" ? "Yeah..." : "Oops...",
                    text: response.data.message,
                });
            } else {
                setDepoResult(response.data);
            }
        } catch (error) {
            MySwal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.message,
            });
        } finally {
            setLoadingDepo(false);
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
                    <InputDefault
                        value={bankOwner}
                        formLabel="Nama pemilik bank"
                        handleChange={(e) => setBankOwner(e.target.value)}
                    />
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
                                                <td>Jumlah pembayaran</td>
                                                <td>:</td>
                                                <td>
                                                    {
                                                        depoResult?.amount_formatter
                                                    }
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Bank tujuan</td>
                                                <td>:</td>
                                                <td>{selectedBank}</td>
                                            </tr>

                                            <tr>
                                                <td>Notes</td>
                                                <td>:</td>
                                                <td>{depoResult?.notes}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <br />
                                    <span className="text-red-400 italic text-sm font-light">
                                        * Masukan notes diatas pada berita acara
                                        transfer
                                    </span>
                                </div>
                            ) : null}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
