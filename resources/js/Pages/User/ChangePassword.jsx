import React from "react";
import Cards from "@/components/Card";
import { InputDefault } from "@/components/FormInput";
import { SuccessAlert, ErrorAlert } from "@/components/Alert";
import { SubmitButton } from "../../components/Buttons";
import { useForm, usePage } from "@inertiajs/react";

function ChangePassword() {
    const { flash } = usePage().props;

    const { data, setData, put, errors, processing } = useForm({
        password: "",
        password_confirmation: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("profile.update_password"));
    };
    return (
        <Cards>
            <div className="p-4">
                <div className="border-b py-3 mb-3">
                    <span>Update Password</span>
                </div>
                <div className="w-full md:w-1/2 flex flex-col">
                    {flash.success ? (
                        <SuccessAlert message={flash.success} />
                    ) : null}

                    {flash.error ? <ErrorAlert message={flash.error} /> : null}
                    <br />
                    <form onSubmit={handleSubmit}>
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
                        <InputDefault
                            name="password_confirmation"
                            formLabel="Ulangi password"
                            value={data.password_confirmation}
                            handleChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                            type="password"
                            error={errors.password_confirmation}
                        />
                        <br />
                        <div className="flex flex-row  gap-3">
                            <SubmitButton isDisable={processing} />
                        </div>
                    </form>
                </div>
            </div>
        </Cards>
    );
}

export default ChangePassword;
