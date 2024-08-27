import { useForm, usePage } from "@inertiajs/react";
import React, { useEffect } from "react";
import { Input } from "@/components/FormInput";
import Cards from "@/components/Card";
import CheckboxToggle from "@/components/CheckboxToggle";
import { SubmitButton } from "@/components/Buttons";
import { ErrorAlert, SuccessAlert } from "@/components/Alert";

export default function Detail() {
    const {
        permissions: permissionParents,
        selectedRole,
        selectedPermission,
        flash,
    } = usePage().props;

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
                        <Input
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

                        {permissionParents.map((parent, index) => {
                            return (
                                <details className="p-4 group" key={index}>
                                    <summary className="relative flex cursor-pointer list-none gap-4 pr-8 font-medium text-slate-700 transition-colors duration-300 focus-visible:outline-none group-hover:text-slate-900  [&::-webkit-details-marker]:hidden">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-6 h-6 shrink-0 stroke-emerald-500 "
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            aria-labelledby="title-ac05 desc-ac05"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="m4.5 12.75 6 6 9-13.5"
                                            />
                                        </svg>
                                        <span className="font-medium mb-3">
                                            {parent.parent_name}
                                        </span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="absolute right-0 w-4 h-4 transition duration-300 top-1 shrink-0 stroke-slate-700 group-open:rotate-45"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            aria-labelledby="title-ac06 desc-ac06"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M12 4v16m8-8H4"
                                            />
                                        </svg>
                                    </summary>
                                    <div className="flex flex-col gap-3 mt-3 mb-3">
                                        {parent.permissions.map(
                                            (permission, index) => {
                                                return (
                                                    <CheckboxToggle
                                                        key={index}
                                                        name={permission.name}
                                                        value={permission.id}
                                                        formLabel={
                                                            permission.name
                                                        }
                                                        checked={data.permissionData.includes(
                                                            permission.id
                                                        )}
                                                        handleChange={
                                                            handleCheckboxChange
                                                        }
                                                    />
                                                );
                                            }
                                        )}
                                    </div>
                                </details>
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
