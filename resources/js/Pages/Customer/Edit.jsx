import React from "react";
import Cards from "@/components/Card";
import { InputDefault } from "@/components/FormInput";
import { useForm, usePage } from "@inertiajs/react";
import TextAreaForm from "../../components/TextAreaForm";
import { CancelButton, SubmitButton } from "../../components/Buttons";
import { SuccessAlert, ErrorAlert } from "@/components/Alert";
import { router } from "@inertiajs/react";

export default function Edit() {
    const { flash, data: currentCustomer } = usePage().props;
    const { data, setData, put, errors, processing } = useForm({
        id: currentCustomer.id || "",
        nama_customer: currentCustomer.nama_customer || "",
        alamat_customer: currentCustomer.alamat_customer || "",
        telp_customer: currentCustomer.telp_customer || "",
    });

    const backToIndex = (e) => {
        e.preventDefault();
        router.visit(route("customer.index"));
    };

    const handleSubmitForm = (e) => {
        e.preventDefault();
        put(route("customer.update", { id: data.id }));
    };
    return (
        <Cards>
            <div className="p-4">
                <div className="border-b py-3 mb-3">
                    <span>Edit Data Customer</span>
                </div>
                <div className="w-full md:w-1/2 flex flex-col">
                    {flash.success ? (
                        <SuccessAlert message={flash.success} />
                    ) : null}

                    {flash.error ? <ErrorAlert message={flash.error} /> : null}
                    <br />

                    <form onSubmit={handleSubmitForm}>
                        <InputDefault
                            formLabel="Nama Customer"
                            value={data.nama_customer}
                            handleChange={(e) =>
                                setData("nama_customer", e.target.value)
                            }
                            error={errors.nama_customer}
                        />
                        <br />
                        <TextAreaForm
                            formLabel="Alamat"
                            name="alamat_customer"
                            value={data.alamat_customer}
                            handleChange={(e) =>
                                setData("alamat_customer", e.target.value)
                            }
                            error={errors.alamat_customer}
                        />
                        <br />
                        <InputDefault
                            formLabel="No. Telp Customer"
                            value={data.telp_customer}
                            handleChange={(e) =>
                                setData("telp_customer", e.target.value)
                            }
                            error={errors.telp_customer}
                        />
                        <br />
                        <div className="flex flex-row gap-3 border-t mt-3 py-3">
                            <SubmitButton isDisable={processing} />
                            <CancelButton handleCancel={backToIndex} />
                        </div>
                    </form>
                </div>
            </div>
        </Cards>
    );
}
