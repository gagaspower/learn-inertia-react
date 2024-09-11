import React, { useState, useEffect } from "react";
import { InputDefault } from "../../components/FormInput";
import { usePage } from "@inertiajs/react";
import axios from "axios";
import Spinner from "../../components/Spinner";
import { ButtonBeli, CancelButton } from "../../components/Buttons";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Modals from "../../components/Modals";

export default function Token() {
    const { auth } = usePage().props;
    const MySwal = withReactContent(Swal);
    const currentRole = auth?.user?.roles[0].name;

    const [customerNo, setCustomerNo] = useState("");

    const [products, setProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(false);
    const [loadingBeli, setLoadingBeli] = useState({});
    const [plnSubscribeResult, setPlnSubscribeResult] = useState(null);
    const [plnSubscribeModal, setPlnSubscribeModal] = useState(false);
    const [plnSubscribeLoading, setPlnSubscribeLoading] = useState(false);

    useEffect(() => {
        const getProduct = async () => {
            setLoadingProducts(true);
            try {
                const response = await axios.post(
                    route("product.prabayar.product_by_brand"),
                    {
                        brand: "PLN",
                        category: "PLN",
                    }
                );
                setProducts(response.data);
                setLoadingProducts(false);
            } catch (error) {
                setLoadingProducts(false);
            }
        };

        getProduct();
    }, []);

    const handleTopupProduct = async (item) => {
        if (!customerNo) {
            MySwal.fire({
                icon: "error",
                title: "Oops...",
                text: "Nomor tujuan wajib diisi!",
            });
            return "";
        }

        if (currentRole === "Admin" && item.product_cost > auth.saldo) {
            MySwal.fire({
                icon: "error",
                title: "Oops...",
                text: "Saldo anda tidak mencukupi!",
            });
            return "";
        }

        if (currentRole === "Mitra" && item.product_price > auth.saldo) {
            MySwal.fire({
                icon: "error",
                title: "Oops...",
                text: "Saldo anda tidak mencukupi!",
            });
            return "";
        }
        try {
            setLoadingBeli((prevState) => ({
                ...prevState,
                [item.product_sku]: true,
            }));
            const response = await axios.post(route("ppob.topup"), {
                customer_no: customerNo,
                sku: item.product_sku,
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
            setLoadingBeli((prevState) => ({
                ...prevState,
                [item.product_sku]: false,
            }));
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

        setPlnSubscribeLoading(true);
        try {
            const response = await axios.post(route("ppob.pln_subcribe"), {
                customer_no: customerNo,
            });

            if (response.data.status === "Gagal") {
                MySwal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Data pelanggan tidak ditemukan",
                });
            } else {
                setPlnSubscribeResult(response.data);
                setPlnSubscribeModal(true);
            }
            setPlnSubscribeLoading(false);
        } catch (e) {
            setPlnSubscribeLoading(false);
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
                    <h3 className="font-bold">Pembelian Token PLN</h3>
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
                            isLoading={plnSubscribeLoading}
                            label="Cek ID Pelanggan"
                            handleClick={handleSubscribe}
                        />
                    </div>
                </div>
                <div className="mt-3">
                    {loadingProducts ? (
                        <Spinner />
                    ) : (
                        <div className="flex flex-col w-full gap-3">
                            {products.map((product, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="flex flex-row justify-between items-center border border-slate-300 rounded-md p-5 group hover:border-teal-400"
                                    >
                                        <div className="flex flex-col">
                                            <span className="">
                                                {product.product_name}
                                            </span>
                                            <span className="font-light text-sm text-slate-400">
                                                {auth?.user?.roles[0].name ===
                                                "Admin"
                                                    ? product.product_cost_formatted
                                                    : product.product_price_formatted}
                                            </span>
                                        </div>
                                        <ButtonBeli
                                            isLoading={
                                                loadingBeli[
                                                    product.product_sku
                                                ] || false
                                            }
                                            label="Beli"
                                            handleClick={() =>
                                                handleTopupProduct(product)
                                            }
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
            <Modals title="Detail Pelanggan" isShowing={plnSubscribeModal}>
                <div>
                    <table className="table">
                        <tbody>
                            <tr>
                                <td>Nama Pelanggan</td>
                                <td>:</td>
                                <td>{plnSubscribeResult?.name}</td>
                            </tr>
                            <tr>
                                <td>No/ID Pelanggan</td>
                                <td>:</td>
                                <td>{plnSubscribeResult?.customer_no}</td>
                            </tr>

                            <tr>
                                <td>Nomor Meter</td>
                                <td>:</td>
                                <td>{plnSubscribeResult?.meter_no}</td>
                            </tr>
                            <tr>
                                <td>Subcriber ID</td>
                                <td>:</td>
                                <td>{plnSubscribeResult?.subscriber_id}</td>
                            </tr>
                            <tr>
                                <td>Segmen Power</td>
                                <td>:</td>
                                <td>{plnSubscribeResult?.segment_power}</td>
                            </tr>
                        </tbody>
                    </table>
                    <br />
                    <div className="border-b border-b-slate-200 mb-2"></div>
                    <div className="flex justify-end">
                        <CancelButton
                            label="Ok, tutup"
                            handleCancel={() => setPlnSubscribeModal(false)}
                        />
                    </div>
                </div>
            </Modals>
        </div>
    );
}
