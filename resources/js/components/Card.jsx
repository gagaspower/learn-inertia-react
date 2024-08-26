import React from "react";

export default function Card({ children }) {
    return (
        <div className="overflow-hidden bg-white rounded shadow-md text-slate-500 shadow-slate-200">
            {children}
        </div>
    );
}
