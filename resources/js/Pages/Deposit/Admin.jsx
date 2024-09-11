import React, { useMemo } from "react";
import Card from "@/components/Card";

import { Link } from "@inertiajs/react";
import InvoiceLogo from "../../../assets/img/invoice.png";

export default function Admin() {
    const historiMenus = useMemo(
        () => [
            {
                label: "Histori Deposit User",
                navigate: "deposit.index",
            },
            {
                label: "Histori Deposit Admin",
                navigate: "deposit.histori_admin",
            },
        ],
        []
    );
    return (
        <Card>
            <div className="flex p-4 flex-col md:flex-row flex-wrap gap-3 justify-center">
                {historiMenus.map((depo, index) => {
                    return (
                        <Link
                            href={route(depo.navigate)}
                            className="border border-slate-300 rounded-md w-full md:w-1/3 p-5 group hover:border-emerald-500"
                            key={index}
                        >
                            <div className="flex  flex-col items-center">
                                <img
                                    src={InvoiceLogo}
                                    width={100}
                                    height={100}
                                    alt="invoice ikon"
                                />
                                <span className="group-hover:text-emerald-500 text-center">
                                    {depo.label}
                                </span>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </Card>
    );
}
