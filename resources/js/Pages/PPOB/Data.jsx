import React, { useState, useEffect } from "react";
import { InputDefault } from "../../components/FormInput";
import { useDebounce } from "use-debounce";
import { usePage } from "@inertiajs/react";
import axios from "axios";
import Spinner from "../../components/Spinner";
import { ButtonBeli } from "../../components/Buttons";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function Data() {
    const { auth } = usePage().props;
    const MySwal = withReactContent(Swal);
    const currentRole = auth?.user?.roles[0].name;

    const [customerNo, setCustomerNo] = useState("");

    const [products, setProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(false);
    const [loadingBeli, setLoadingBeli] = useState({});

    const [value] = useDebounce(customerNo, 500);

    useEffect(() => {
        const getProduct = async () => {
            setLoadingProducts(true);
            try {
                const response = await axios.post(
                    route("product.prabayar.search_by_number"),
                    {
                        customer_no: value,
                        product_category: "Data",
                    }
                );
                setProducts(response.data);
                setLoadingProducts(false);
            } catch (error) {
                setLoadingProducts(false);
            }
        };

        if (value) {
            getProduct();
        }
    }, [value]);

    const handleTopupProduct = async (item) => {
        if (!customerNo) {
            MySwal.fire({
                icon: "error",
                title: "Oops...",
                text: "Nomor tujuan wajib diisi!",
            });
            return "";
        }

        // if (currentRole === "Admin" && item.product_cost > auth.saldo) {
        //     MySwal.fire({
        //         icon: "error",
        //         title: "Oops...",
        //         text: "Saldo anda tidak mencukupi!",
        //     });
        //     return "";
        // }

        // if (currentRole === "Mitra" && item.product_price > auth.saldo) {
        //     MySwal.fire({
        //         icon: "error",
        //         title: "Oops...",
        //         text: "Saldo anda tidak mencukupi!",
        //     });
        //     return "";
        // }
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

    return (
        <div className="bg-white flex m-auto justify-center w-full md:max-w-xl">
            <div className="p-4 w-full md:max-w-xl">
                <div className="border-b border-b-slate-300 mb-5 py-4">
                    <h3 className="font-bold">Pembelian Paket Data</h3>
                </div>
                <div className="">
                    <InputDefault
                        value={customerNo}
                        formLabel="No.Tujuan"
                        handleChange={(e) => setCustomerNo(e.target.value)}
                    />
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
        </div>
    );
}
