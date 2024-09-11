import React from "react";
import Cards from "@/components/Card";
import { InputDefault, InputSelect } from "@/components/FormInput";
import { SuccessAlert, ErrorAlert } from "@/components/Alert";
import { CancelButton, SubmitButton } from "../../components/Buttons";
import { router, useForm, usePage } from "@inertiajs/react";

function Create() {
    const { flash, brands } = usePage().props;
    const { data, setData, post, errors, processing } = useForm({
        number: "",
        operator: "",
    });

    const backToIndex = (e) => {
        e.preventDefault();
        router.visit(route("kode_nomor.index"));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("kode_nomor.store"));
    };
    return (
        <Cards>
            <div className="p-4">
                <div className="border-b py-3 mb-3">
                    <span>Tambah Kode Nomor</span>
                </div>
                <div className="w-full md:w-1/2 flex flex-col">
                    {flash.success ? (
                        <SuccessAlert message={flash.success} />
                    ) : null}

                    {flash.error ? <ErrorAlert message={flash.error} /> : null}
                    <br />
                    <form onSubmit={handleSubmit}>
                        <InputDefault
                            name="number"
                            formLabel="Nomor"
                            value={data.number}
                            handleChange={(e) =>
                                setData("number", e.target.value)
                            }
                            type="text"
                            error={errors.number}
                        />
                        <br />

                        <InputSelect
                            name="operator"
                            formLabel="Provider"
                            value={data.operator}
                            handleChange={(e) =>
                                setData("operator", e.target.value)
                            }
                            error={errors.operator}
                        >
                            <option value="">pilih Provider</option>
                            {brands.map((option, index) => {
                                return (
                                    <option value={option} key={index}>
                                        {option}
                                    </option>
                                );
                            })}
                        </InputSelect>
                        <br />

                        <div className="flex flex-row  gap-3">
                            <SubmitButton isDisable={processing} />
                            <CancelButton handleCancel={backToIndex} />
                        </div>
                    </form>
                </div>
            </div>
        </Cards>
    );
}

export default Create;
