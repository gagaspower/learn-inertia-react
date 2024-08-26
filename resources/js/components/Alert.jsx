import React from "react";

export function SuccessAlert({ message }) {
    return (
        <div
            className="w-full px-4 py-3 text-sm border rounded border-emerald-100 bg-emerald-50 text-emerald-500 mb-3"
            role="alert"
        >
            <p>{message}</p>
        </div>
    );
}

export function ErrorAlert({ message }) {
    return (
        <div
            className="w-full px-4 py-3 text-sm text-pink-500 border border-pink-100 rounded bg-pink-50 mb-3"
            role="alert"
        >
            <p>{message}</p>
        </div>
    );
}
