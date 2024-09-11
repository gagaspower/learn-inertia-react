import { usePage } from "@inertiajs/react";
import React from "react";

export default function Dashboard() {
    const { auth } = usePage().props;
    return (
        <div
            className="w-full px-4 py-3 text-sm border rounded border-emerald-100 bg-emerald-50 text-emerald-500"
            role="alert"
        >
            <p>Hallo, {auth?.user?.name} </p>
        </div>
    );
}
