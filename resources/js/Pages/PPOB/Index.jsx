import React, { useMemo } from "react";
import Card from "@/components/Card";
import PPOBIcon from "../../components/PPOBIcon";
import { Link } from "@inertiajs/react";

export default function PPOB() {
    const ppobMenus = useMemo(
        () => [
            {
                label: "Pulsa",
                navigate: "ppob.pulsa",
            },
            {
                label: "Paket Data",
                navigate: "ppob.data",
            },
            {
                label: "E-Money",
                navigate: "ppob.emoney",
            },
            {
                label: "Token PLN",
                navigate: "ppob.token",
            },
            {
                label: "Tagihan PLN",
                navigate: "ppob.pln_pascabayar",
            },
            {
                label: "BPJS Kesehatan",
                navigate: "ppob.bpjs",
            },
            {
                label: "Internet",
                navigate: "ppob.internet",
            },
            {
                label: "PDAM",
                navigate: "ppob.pdam",
            },
            {
                label: "PBB",
                navigate: "ppob.pbb",
            },
        ],
        []
    );
    return (
        <Card>
            <div className="flex p-4 flex-col md:flex-row flex-wrap gap-3 justify-center">
                {ppobMenus.map((ppob, index) => {
                    return (
                        <Link
                            href={route(ppob.navigate)}
                            className="border border-slate-300 rounded-md w-full md:w-52 p-5 group hover:border-emerald-500"
                            key={index}
                        >
                            <div className="flex  flex-col items-center">
                                <PPOBIcon label={ppob.label} />
                                <span className="group-hover:text-emerald-500">
                                    {ppob.label}
                                </span>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </Card>
    );
}
