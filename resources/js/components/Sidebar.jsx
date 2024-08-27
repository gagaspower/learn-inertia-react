import { useState } from "react";
import Logo from "../../assets/img/car.png";
import { Link, usePage } from "@inertiajs/react";
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
                >
                    <img src={Logo} alt="logo" className="w-10 h-10" />
                    Salon Mobil
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
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className={`h-6 w-6 ${
                                                url.includes("dashboard")
                                                    ? "text-emerald-500"
                                                    : ""
                                            }`}
                                            aria-label="Dashboard icon"
                                            role="graphics-symbol"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                                            />
                                        </svg>
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
                            {hasPermission("Lihat Data Hak Akses") ? (
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
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className={`h-6 w-6 ${
                                                    url.includes("role")
                                                        ? "text-emerald-500"
                                                        : ""
                                                }`}
                                                aria-label="Dashboard icon"
                                                role="graphics-symbol"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
                                                />
                                            </svg>
                                        </div>
                                        <div
                                            className={`flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm ${
                                                url.includes("role")
                                                    ? "text-emerald-500"
                                                    : ""
                                            }`}
                                        >
                                            Role/Hak Akses
                                        </div>
                                    </Link>
                                </li>
                            ) : null}

                            {hasPermission("Lihat Data Pengelola") ? (
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
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className={`h-6 w-6 ${
                                                    url.includes("user")
                                                        ? "text-emerald-500"
                                                        : ""
                                                }`}
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                        <div
                                            className={`flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm ${
                                                url.includes("user")
                                                    ? "text-emerald-500"
                                                    : ""
                                            }`}
                                        >
                                            Pengelola
                                        </div>
                                    </Link>
                                </li>
                            ) : null}
                            {hasPermission("Lihat Data Merk Kendaraan") ? (
                                <li className="px-3">
                                    <Link
                                        href="/merk-kendaraan"
                                        onClick={
                                            isSideNavOpen ? handleAutoClose : ""
                                        }
                                        className={`flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-500 focus:bg-emerald-50 ${
                                            url.includes("merk-kendaraan")
                                                ? "bg-emerald-50 text-emerald-500 "
                                                : ""
                                        }`}
                                        aria-current="merk"
                                    >
                                        <div className="flex items-center self-center ">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className={`h-6 w-6 ${
                                                    url.includes(
                                                        "merk-kendaraan"
                                                    )
                                                        ? "text-emerald-500"
                                                        : ""
                                                }`}
                                                aria-label="Dashboard icon"
                                                role="graphics-symbol"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
                                                />
                                            </svg>
                                        </div>
                                        <div
                                            className={`flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm ${
                                                url.includes("merk-kendaraan")
                                                    ? "text-emerald-500"
                                                    : ""
                                            }`}
                                        >
                                            Merk Kendaraan
                                        </div>
                                    </Link>
                                </li>
                            ) : null}
                            <li className="px-3">
                                <Link
                                    href="#"
                                    className="flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-500 focus:bg-emerald-50 aria-[current=page]:bg-emerald-50 aria-[current=page]:text-emerald-500 "
                                >
                                    <div className="flex items-center self-center ">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="h-6 w-6"
                                            aria-label="Dashboard icon"
                                            role="graphics-symbol"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                                            />
                                        </svg>
                                    </div>
                                    <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                                        Customer
                                    </div>
                                </Link>
                            </li>
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
