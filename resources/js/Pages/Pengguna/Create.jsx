import React from "react";
import Cards from "@/components/Card";
import { InputDefault, InputSelect } from "@/components/FormInput";
import { SuccessAlert, ErrorAlert } from "@/components/Alert";
import { CancelButton, SubmitButton } from "../../components/Buttons";
import { router, useForm, usePage } from "@inertiajs/react";

function Create() {
    const { flash, roles: roleData } = usePage().props;
    const { data, setData, post, errors, processing } = useForm({
        name: "",
        email: "",
        password: "",
        roles: "",
    });

    const backToIndex = (e) => {
        e.preventDefault();
        router.visit(route("user.index"));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("user.store"));
    };
    return (
        <Cards>
            <div className="p-4">
                <div className="border-b py-3 mb-3">
                    <span>Tambah Data Customer</span>
                </div>
                <div className="w-full md:w-1/2 flex flex-col">
                    {flash.success ? (
                        <SuccessAlert message={flash.success} />
                    ) : null}

                    {flash.error ? <ErrorAlert message={flash.error} /> : null}
                    <br />
                    <form onSubmit={handleSubmit}>
                        <InputDefault
                            name="name"
                            formLabel="Nama"
                            value={data.name}
                            handleChange={(e) =>
                                setData("name", e.target.value)
                            }
                            type="text"
                            error={errors.name}
                        />
                        <br />
                        <InputDefault
                            name="email"
                            formLabel="Email"
                            value={data.email}
                            handleChange={(e) =>
                                setData("email", e.target.value)
                            }
                            type="email"
                            error={errors.email}
                        />
                        <br />

                        <InputSelect
                            name="roles"
                            formLabel="Role"
                            value={data.roles}
                            handleChange={(e) =>
                                setData("roles", e.target.value)
                            }
                            error={errors.roles}
                        >
                            <option value="">pilih role</option>
                            {roleData.map((option, index) => {
                                return (
                                    <option value={option} key={index}>
                                        {option}
                                    </option>
                                );
                            })}
                        </InputSelect>
                        <br />
                        <InputDefault
                            name="password"
                            formLabel="Password"
                            value={data.password}
                            handleChange={(e) =>
                                setData("password", e.target.value)
                            }
                            type="password"
                            error={errors.password}
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

export default Create;
