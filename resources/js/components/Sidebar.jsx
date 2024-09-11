import { useState } from "react";
import Logo from "../../assets/img/logo.png";
import { Link, usePage } from "@inertiajs/react";
import {
    IoAlbumsOutline,
    IoAlertCircleOutline,
    IoArchiveOutline,
    IoBatteryHalfOutline,
    IoClipboardOutline,
    IoDesktopOutline,
    IoPersonSharp,
    IoScan,
} from "react-icons/io5";
import { HiMiniSquares2X2 } from "react-icons/hi2";
export default function Sidebar() {
    const [isSideNavOpen, setIsSideNavOpen] = useState(false);
    const { url } = usePage();
    const { auth } = usePage().props;
    const handleAutoClose = () => {
        setIsSideNavOpen(!isSideNavOpen);
    };

    const hasPermission = (permission) => auth.permissions.includes(permission);

    return (
        <>
            <button
                title="Side navigation"
                type="button"
                className={`visible fixed left-6 top-6 z-40 order-10 block h-10 w-10 self-center rounded bg-white opacity-100 lg:hidden ${
                    isSideNavOpen
                        ? "visible opacity-100 [&_span:nth-child(1)]:w-6 [&_span:nth-child(1)]:translate-y-0 [&_span:nth-child(1)]:rotate-45 [&_span:nth-child(3)]:w-0 [&_span:nth-child(2)]:-rotate-45 "
                        : ""
                }`}
                aria-haspopup="menu"
                aria-label="Side navigation"
                aria-expanded={isSideNavOpen ? " true" : "false"}
                aria-controls="nav-menu-2"
                onClick={() => setIsSideNavOpen(!isSideNavOpen)}
            >
                <div className="absolute top-1/2 left-1/2 w-6 -translate-x-1/2 -translate-y-1/2 transform">
                    <span
                        aria-hidden="true"
                        className="absolute block h-0.5 w-9/12 -translate-y-2 transform rounded-full bg-slate-700 transition-all duration-300"
                    ></span>
                    <span
                        aria-hidden="true"
                        className="absolute block h-0.5 w-6 transform rounded-full bg-slate-900 transition duration-300"
                    ></span>
                    <span
                        aria-hidden="true"
                        className="absolute block h-0.5 w-1/2 origin-top-left translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
                    ></span>
                </div>
            </button>

            {/*  <!-- Side Navigation --> */}
            <aside
                id="nav-menu-2"
                aria-label="Side navigation"
                className={`fixed top-0 bottom-0 left-0 z-40 flex w-64 flex-col border-r border-r-slate-200 bg-white transition-transform lg:translate-x-0 ${
                    isSideNavOpen ? "translate-x-0" : " -translate-x-full"
                }`}
            >
                <Link
                    aria-label="WindUI logo"
                    className="flex items-center gap-2 whitespace-nowrap p-6 text-xl font-medium focus:outline-none"
                    href="/dashboard"
                    onClick={isSideNavOpen ? handleAutoClose : ""}
                >
                    <img src={Logo} alt="logo" className="w-10 h-10" />
                    WinPay
                </Link>
                <nav
                    aria-label="side navigation"
                    className="flex-1 divide-y divide-slate-100 overflow-auto"
                >
                    <div>
                        <ul className="flex flex-1 flex-col gap-1 py-3">
                            <li className="px-3">
                                <Link
                                    href="/dashboard"
                                    onClick={
                                        isSideNavOpen ? handleAutoClose : ""
                                    }
                                    className={`flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-500 focus:bg-emerald-50 ${
                                        url.includes("dashboard")
                                            ? "bg-emerald-50 text-emerald-500 "
                                            : ""
                                    }`}
                                >
                                    <div className="flex items-center self-center">
                                        <IoDesktopOutline
                                            className={`h-6 w-6 ${
                                                url.includes("dashboard")
                                                    ? "text-emerald-500"
                                                    : ""
                                            }`}
                                        />
                                    </div>
                                    <div
                                        className={`flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm ${
                                            url.includes("dashboard")
                                                ? "text-emerald-500"
                                                : ""
                                        }`}
                                    >
                                        Dashboard
                                    </div>
                                </Link>
                            </li>
                            {hasPermission("Hak Akses User") ? (
                                <li className="px-3">
                                    <Link
                                        href="/role"
                                        onClick={
                                            isSideNavOpen ? handleAutoClose : ""
                                        }
                                        className={`flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-500 focus:bg-emerald-50 ${
                                            url.includes("role")
                                                ? "bg-emerald-50 text-emerald-500 "
                                                : ""
                                        }`}
                                    >
                                        <div className="flex items-center self-center">
                                            <IoAlertCircleOutline
                                                className={`h-6 w-6 ${
                                                    url.includes("role")
                                                        ? "text-emerald-500"
                                                        : ""
                                                }`}
                                            />
                                        </div>
                                        <div
                                            className={`flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm ${
                                                url.includes("role")
                                                    ? "text-emerald-500"
                                                    : ""
                                            }`}
                                        >
                                            Hak Akses User
                                        </div>
                                    </Link>
                                </li>
                            ) : null}

                            {hasPermission("User Manajemen") ? (
                                <li className="px-3">
                                    <Link
                                        href="/user"
                                        onClick={
                                            isSideNavOpen ? handleAutoClose : ""
                                        }
                                        className={`flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-500 focus:bg-emerald-50 ${
                                            url.includes("user")
                                                ? "bg-emerald-50 text-emerald-500 "
                                                : ""
                                        }`}
                                    >
                                        <div className="flex items-center self-center">
                                            <IoPersonSharp
                                                className={`h-6 w-6 ${
                                                    url.includes("user")
                                                        ? "text-emerald-500"
                                                        : ""
                                                }`}
                                            />
                                        </div>
                                        <div
                                            className={`flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm ${
                                                url.includes("user")
                                                    ? "text-emerald-500"
                                                    : ""
                                            }`}
                                        >
                                            User manajemen
                                        </div>
                                    </Link>
                                </li>
                            ) : null}

                            {hasPermission("Brand Produk") ? (
                                <li className="px-3">
                                    <Link
                                        href="/brand"
                                        onClick={
                                            isSideNavOpen ? handleAutoClose : ""
                                        }
                                        className={`flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-500 focus:bg-emerald-50 ${
                                            url.includes("brand")
                                                ? "bg-emerald-50 text-emerald-500 "
                                                : ""
                                        }`}
                                        aria-current="brand"
                                    >
                                        <div className="flex items-center self-center ">
                                            <IoAlbumsOutline
                                                className={`h-6 w-6 ${
                                                    url.includes("brand")
                                                        ? "text-emerald-500"
                                                        : ""
                                                }`}
                                            />
                                        </div>
                                        <div
                                            className={`flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm ${
                                                url.includes("brand")
                                                    ? "text-emerald-500"
                                                    : ""
                                            }`}
                                        >
                                            Brand Produk
                                        </div>
                                    </Link>
                                </li>
                            ) : null}

                            {hasPermission("Kode Nomor") ? (
                                <li className="px-3">
                                    <Link
                                        href={route("kode_nomor.index")}
                                        onClick={
                                            isSideNavOpen ? handleAutoClose : ""
                                        }
                                        className={`flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-500 focus:bg-emerald-50 ${
                                            url.includes("kode-nomor")
                                                ? "bg-emerald-50 text-emerald-500 "
                                                : ""
                                        }`}
                                        aria-current="kode-nomor"
                                    >
                                        <div className="flex items-center self-center ">
                                            <IoScan
                                                className={`h-6 w-6 ${
                                                    url.includes("kode-nomor")
                                                        ? "text-emerald-500"
                                                        : ""
                                                }`}
                                            />
                                        </div>
                                        <div
                                            className={`flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm ${
                                                url.includes("kode-nomor")
                                                    ? "text-emerald-500"
                                                    : ""
                                            }`}
                                        >
                                            Kode Nomor
                                        </div>
                                    </Link>
                                </li>
                            ) : null}

                            {hasPermission("Daftar Produk Prabayar") ? (
                                <li className="px-3">
                                    <Link
                                        href={route("product.prabayar")}
                                        onClick={
                                            isSideNavOpen ? handleAutoClose : ""
                                        }
                                        className={`flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-500 focus:bg-emerald-50 ${
                                            url.includes("product/prabayar")
                                                ? "bg-emerald-50 text-emerald-500 "
                                                : ""
                                        }`}
                                        aria-current="merk"
                                    >
                                        <div className="flex items-center self-center ">
                                            <IoArchiveOutline
                                                className={`h-6 w-6 ${
                                                    url.includes(
                                                        "product/prabayar"
                                                    )
                                                        ? "text-emerald-500"
                                                        : ""
                                                }`}
                                            />
                                        </div>
                                        <div
                                            className={`flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm ${
                                                url.includes("product/prabayar")
                                                    ? "text-emerald-500"
                                                    : ""
                                            }`}
                                        >
                                            Produk Prabayar
                                        </div>
                                    </Link>
                                </li>
                            ) : null}
                            {hasPermission("Daftar Produk Pascabayar") ? (
                                <li className="px-3">
                                    <Link
                                        href={route("product.pascabayar")}
                                        onClick={
                                            isSideNavOpen ? handleAutoClose : ""
                                        }
                                        className={`flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-500 focus:bg-emerald-50 ${
                                            url.includes("product/pascabayar")
                                                ? "bg-emerald-50 text-emerald-500 "
                                                : ""
                                        }`}
                                        aria-current="merk"
                                    >
                                        <div className="flex items-center self-center ">
                                            <IoArchiveOutline
                                                className={`h-6 w-6 ${
                                                    url.includes(
                                                        "product/pascabayar"
                                                    )
                                                        ? "text-emerald-500"
                                                        : ""
                                                }`}
                                            />
                                        </div>
                                        <div
                                            className={`flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm ${
                                                url.includes(
                                                    "product/pascabayar"
                                                )
                                                    ? "text-emerald-500"
                                                    : ""
                                            }`}
                                        >
                                            Produk Pascabayar
                                        </div>
                                    </Link>
                                </li>
                            ) : null}
                            <li className="px-3">
                                <Link
                                    href={route("ppob.index")}
                                    onClick={
                                        isSideNavOpen ? handleAutoClose : ""
                                    }
                                    className={`flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-500 focus:bg-emerald-50 ${
                                        url.includes("ppob")
                                            ? "bg-emerald-50 text-emerald-500 "
                                            : ""
                                    }`}
                                >
                                    <div className="flex items-center self-center ">
                                        <HiMiniSquares2X2
                                            className={`h-6 w-6 ${
                                                url.includes("ppob")
                                                    ? "text-emerald-500"
                                                    : ""
                                            }`}
                                        />
                                    </div>
                                    <div
                                        className={`flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm ${
                                            url.includes("ppob")
                                                ? "text-emerald-500"
                                                : ""
                                        }`}
                                    >
                                        PPOB
                                    </div>
                                </Link>
                            </li>
                            {hasPermission("Laporan") ? (
                                <li className="px-3">
                                    <Link
                                        href={route("laporan.index")}
                                        onClick={
                                            isSideNavOpen ? handleAutoClose : ""
                                        }
                                        className={`flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-500 focus:bg-emerald-50 ${
                                            url.includes("laporan")
                                                ? "bg-emerald-50 text-emerald-500 "
                                                : ""
                                        }`}
                                        aria-current="laporan"
                                    >
                                        <div className="flex items-center self-center ">
                                            <IoClipboardOutline
                                                className={`h-6 w-6 ${
                                                    url.includes("laporan")
                                                        ? "text-emerald-500"
                                                        : ""
                                                }`}
                                            />
                                        </div>
                                        <div
                                            className={`flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm ${
                                                url.includes("laporan")
                                                    ? "text-emerald-500"
                                                    : ""
                                            }`}
                                        >
                                            Laporan
                                        </div>
                                    </Link>
                                </li>
                            ) : null}
                            {hasPermission("Deposit") ? (
                                <li className="px-3">
                                    <Link
                                        href={
                                            auth?.user?.roles[0].name ===
                                            "Mitra"
                                                ? route("deposit.index")
                                                : route("deposit.admin")
                                        }
                                        onClick={
                                            isSideNavOpen ? handleAutoClose : ""
                                        }
                                        className={`flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-500 focus:bg-emerald-50 ${
                                            url.includes("deposit")
                                                ? "bg-emerald-50 text-emerald-500 "
                                                : ""
                                        }`}
                                        aria-current="merk"
                                    >
                                        <div className="flex items-center self-center ">
                                            <IoBatteryHalfOutline
                                                className={`h-6 w-6 ${
                                                    url.includes("deposit")
                                                        ? "text-emerald-500"
                                                        : ""
                                                }`}
                                            />
                                        </div>
                                        <div
                                            className={`flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm ${
                                                url.includes("deposit")
                                                    ? "text-emerald-500"
                                                    : ""
                                            }`}
                                        >
                                            Deposit
                                        </div>
                                    </Link>
                                </li>
                            ) : null}
                        </ul>
                    </div>
                </nav>
            </aside>

            <div
                className={`fixed top-0 bottom-0 left-0 right-0 z-30 bg-slate-900/20 transition-colors md:hidden ${
                    isSideNavOpen ? "block" : "hidden"
                }`}
                onClick={() => setIsSideNavOpen(false)}
            ></div>
        </>
    );
}
