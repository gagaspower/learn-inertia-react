import { useForm, usePage } from "@inertiajs/react";
import React, { useEffect } from "react";
import { InputDefault } from "@/components/FormInput";
import Cards from "@/components/Card";
import CheckboxToggle from "@/components/CheckboxToggle";
import { SubmitButton } from "@/components/Buttons";
import { ErrorAlert, SuccessAlert } from "@/components/Alert";

export default function Detail() {
    const { permissions, selectedRole, selectedPermission, flash } =
        usePage().props;

    const permissionIds = selectedPermission.map((p) => p.permission_id);
    const { data, setData, put, errors, processing } = useForm({
        roles: selectedRole.name,
        permissionData: permissionIds || [],
    });

    useEffect(() => {
        if (!Array.isArray(data.permissionData)) {
            setData("permissionData", []);
        }
    }, [data.permissionData]);

    const handleCheckboxChange = (id) => {
        const permissionArray = Array.isArray(data.permissionData)
            ? data.permissionData
            : [];

        setData(
            "permissionData",
            permissionArray.includes(id)
                ? permissionArray.filter((permissionId) => permissionId !== id)
                : [...permissionArray, id]
        );
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        put(route("role.update", { id: selectedRole.id }));
    };
    return (
        <Cards>
            <div className="p-4">
                {flash.success ? (
                    <SuccessAlert message={flash.success} />
                ) : null}
                {flash.error ? <ErrorAlert message={flash.error} /> : null}
                <section className="w-full md:w-1/2 bg-white divide-y rounded  divide-slate-200 shadow-slate-200 p-4">
                    <form onSubmit={handleUpdate}>
                        <InputDefault
                            formLabel="Role"
                            value={data.roles}
                            readOnly={true}
                            name="roles"
                        />
                        <div className="my-2"></div>
                        <hr />
                        <div className="my-3">
                            <span className="font-bold">Hak Akses Role</span>
                        </div>

                        {errors.permissionData ? (
                            <>
                                <small className="absolute flex justify-between w-full pt-1 text-xs transition text-pink-500 font-light italic">
                                    <span>* {errors.permissionData}</span>
                                </small>
                                <br />
                            </>
                        ) : null}

                        {permissions.map((permission, index) => {
                            return (
                                <CheckboxToggle
                                    key={index}
                                    name={permission.name}
                                    value={permission.id}
                                    formLabel={permission.name}
                                    checked={data.permissionData.includes(
                                        permission.id
                                    )}
                                    handleChange={handleCheckboxChange}
                                />
                            );
                        })}
                        <br />
                        <hr />
                        <br />
                        <SubmitButton isDisable={processing} />
                    </form>
                </section>
            </div>
        </Cards>
    );
}
