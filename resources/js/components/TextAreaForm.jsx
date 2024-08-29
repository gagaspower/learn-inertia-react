import React from "react";

export default function TextAreaForm({
    formLabel,
    name,
    value,
    handleChange,
    placeholder,
    error,
}) {
    return (
        <>
            {formLabel ? (
                <label
                    htmlFor={name}
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    {formLabel}
                </label>
            ) : null}
            <textarea
                id={name}
                rows="4"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={placeholder || ""}
                value={value}
                onChange={handleChange}
            ></textarea>
            {error ? (
                <>
                    <small className="absolute flex justify-between w-full pt-1 text-xs transition text-pink-500 font-light italic">
                        <span>{error}</span>
                    </small>
                    <br />
                </>
            ) : null}
        </>
    );
}
