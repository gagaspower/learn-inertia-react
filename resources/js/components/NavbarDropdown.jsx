import React, { useState } from "react";
import AvatarImg from "../../assets/img/boy.png";
import { Link, router } from "@inertiajs/react";
export default function NavbarDropDown() {
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        router.visit(route("auth.logout"), {
            method: "post",
        });
    };

    return (
        <>
            {/* <!-- Component: Basic dropdown menu--> */}
            <div className="relative inline-flex" id="dropdown">
                {/*  <!--  Start Dropdown trigger --> */}
                <button
                    className="inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded  px-5 text-sm font-medium tracking-wide text-slate-500 transition duration-300  focus-visible:outline-none disabled:cursor-not-allowed "
                    onClick={() => setIsOpen(!isOpen)}
                    aria-expanded={isOpen ? " true" : "false"}
                >
                    <img
                        src={AvatarImg}
                        alt="user name"
                        title="user name"
                        width="40"
                        height="40"
                        className="max-w-full rounded-full"
                    />
                    <span className="relative only:-mx-5">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            aria-labelledby="t-01 d-01"
                            role="graphics-symbol"
                        >
                            <title id="t-01">Button icon</title>
                            <desc id="d-01">
                                An icon describing the buttons usage
                            </desc>
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                            />
                        </svg>
                    </span>
                </button>
                <ul
                    className={`${
                        isOpen ? "flex" : "hidden"
                    } absolute top-full z-10 mt-1 flex list-none flex-col rounded bg-white py-2 shadow-md shadow-slate-500/10 -translate-x-full `}
                >
                    <li>
                        <Link
                            className="bg-none text-slate-500 flex items-start justify-start gap-2 p-2 px-5 transition-colors duration-300 hover:bg-emerald-50 hover:text-emerald-500 focus:bg-emerald-50 focus:text-emerald-600 focus:outline-none focus-visible:outline-none"
                            href={route("profil.password")}
                        >
                            <span className="flex flex-col gap-1 overflow-hidden whitespace-nowrap">
                                <span className="truncate leading-5">
                                    Ubah password
                                </span>
                            </span>
                        </Link>
                    </li>
                    <li>
                        <button
                            onClick={handleLogout}
                            type="button"
                            className="bg-none w-full text-slate-500 flex items-start justify-start gap-2 p-2 px-5 transition-colors duration-300 hover:bg-emerald-50 hover:text-emerald-500 focus:bg-emerald-50 focus:text-emerald-600 focus:outline-none focus-visible:outline-none"
                        >
                            <span className="flex flex-col gap-1 overflow-hidden whitespace-nowrap">
                                <span className="truncate leading-5">
                                    Logout
                                </span>
                            </span>
                        </button>
                    </li>
                </ul>
                {/*  <!-- End Menu list --> */}
            </div>
            {/* <!-- End Basic dropdown menu--> */}
        </>
    );
}
