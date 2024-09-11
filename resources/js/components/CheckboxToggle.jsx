import React from "react";

export default function CheckboxToggle({
    formLabel,
    value,
    handleChange,
    name,
    checked,
}) {
    return (
        <>
            <div className="relative flex flex-wrap items-center p-2">
                <input
                    className="peer relative h-6 w-12 cursor-pointer appearance-none rounded-xl bg-slate-300 transition-colors after:absolute after:top-0 after:left-0 after:h-6 after:w-6 after:rounded-full after:bg-slate-500 after:transition-all checked:bg-emerald-200 checked:after:left-6 checked:after:bg-emerald-500 hover:bg-slate-400 after:hover:bg-slate-600 checked:hover:bg-emerald-300 checked:after:hover:bg-emerald-600 focus:outline-none checked:focus:bg-emerald-400 checked:after:focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-200 disabled:after:bg-slate-300"
                    type="checkbox"
                    value={value}
                    id={name}
                    onChange={() => handleChange(value)}
                    checked={checked}
                />
                <label
                    className="cursor-pointer pl-2 text-slate-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400"
                    htmlFor={name}
                >
                    {formLabel}
                </label>
            </div>
        </>
    );
}
