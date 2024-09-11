import React from "react";
import Cards from "@/components/Card";
import { InputSelect, InputFile } from "@/components/FormInput";
import { SuccessAlert, ErrorAlert } from "@/components/Alert";
import { CancelButton, SubmitButton } from "../../components/Buttons";
import { router, useForm, usePage } from "@inertiajs/react";

function Edit() {
    const { brand, flash, categories, product_aliases } = usePage().props;
    const aliases = product_aliases
        ? product_aliases.sort((a, b) => a.localeCompare(b))
        : [];
    const { data, setData, post, errors, processing } = useForm({
        id: brand.id || null,
        brand_name: brand.brand_name || "",
        brand_type: brand.brand_type || "",
        brand_logo: null,
    });

    const backToIndex = (e) => {
        e.preventDefault();
        router.visit(route("brand.index"));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("brand.update", { id: data.id }));
    };

    return (
        <Cards>
            <div className="p-4">
                <div className="border-b py-3 mb-3">
                    <span>Edit Data Brand</span>
                </div>
                <div className="w-full md:w-1/2 flex flex-col">
                    {flash.success ? (
                        <SuccessAlert message={flash.success} />
                    ) : null}

                    {flash.error ? <ErrorAlert message={flash.error} /> : null}
                    <br />
                    <form onSubmit={handleSubmit}>
                        <InputSelect
                            name="brand_name"
                            formLabel="Produk"
                            value={data.brand_name}
                            handleChange={(e) =>
                                setData("brand_name", e.target.value)
                            }
                            error={errors.brand_name}
                        >
                            <option value="">Pilih produk</option>
                            {aliases.map((option, index) => {
                                return (
                                    <option value={option} key={index}>
                                        {option}
                                    </option>
                                );
                            })}
                        </InputSelect>
                        <br />
                        <InputSelect
                            name="brand_type"
                            formLabel="Kategori"
                            value={data.brand_type}
                            handleChange={(e) =>
                                setData("brand_type", e.target.value)
                            }
                            error={errors.brand_type}
                        >
                            <option value="">Pilih kategori</option>
                            {categories.map((option, index) => {
                                return (
                                    <option value={option} key={index}>
                                        {option}
                                    </option>
                                );
                            })}
                        </InputSelect>
                        <br />

                        <InputFile
                            name="brand_logo"
                            formLabel="Logo"
                            handleChange={(e) =>
                                setData("brand_logo", e.target.files[0])
                            }
                            error={errors.brand_logo}
                        />
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

export default Edit;
