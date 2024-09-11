import { usePage } from "@inertiajs/react";
import { formatRupiah } from "../utils/const";
import NavbarDropDown from "./NavbarDropdown";

export function NavbarComponent() {
    const { auth } = usePage().props;

    return (
        <header className="border-b-1 p-2 rounded-md relative z-20 w-full border-b border-slate-200 bg-white/90 shadow-lg shadow-slate-700/5 after:absolute after:left-0 after:top-full after:z-10 after:block after:h-px after:w-full after:bg-slate-200 lg:border-slate-200 lg:backdrop-blur-sm lg:after:hidden">
            <div className="flex  justify-end md:order-2 items-center gap-5">
                <span className="text-emerald-500">
                    Saldo: {formatRupiah(auth?.saldo)}
                </span>
                <NavbarDropDown name={auth.user.name} />
            </div>
        </header>
    );
}
