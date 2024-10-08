import React from "react";
import Logo from "../../../../assets/img/logo.png";
import { router, useForm, usePage } from "@inertiajs/react";
import { SuccessAlert, ErrorAlert } from "@/components/Alert";

export default function Registrasi() {
    const { flash } = usePage().props;

    const { setData, errors, post, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("auth.daftar.store"), {
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a
                    href="#"
                    className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
                >
                    <img className="w-8 h-8 mr-2" src={Logo} alt="logo" />
                    WinPay
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Daftar Winpay
                        </h1>
                        {flash.success ? (
                            <SuccessAlert message={flash.success} />
                        ) : null}
                        {flash.error ? (
                            <ErrorAlert message={flash.error} />
                        ) : null}
                        <form
                            className="space-y-4 md:space-y-6"
                            onSubmit={handleSubmit}
                        >
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Nama
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required=""
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    autoComplete="off"
                                />
                                {errors.name ? (
                                    <>
                                        <small className="absolute flex justify-between w-full pt-1 text-xs transition text-pink-500 font-light italic">
                                            <span>{errors.name}</span>
                                        </small>
                                        <br />
                                    </>
                                ) : null}
                            </div>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="name@domain.com"
                                    required=""
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    autoComplete="off"
                                />
                                {errors.email ? (
                                    <>
                                        <small className="absolute flex justify-between w-full pt-1 text-xs transition text-pink-500 font-light italic">
                                            <span>{errors.email}</span>
                                        </small>
                                        <br />
                                    </>
                                ) : null}
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required=""
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    autoComplete="off"
                                />
                                {errors.password ? (
                                    <>
                                        <small className="absolute flex justify-between w-full pt-1 text-xs transition text-pink-500 font-light italic">
                                            <span>{errors.password}</span>
                                        </small>
                                        <br />
                                    </>
                                ) : null}
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Ulangi Password
                                </label>
                                <input
                                    type="password"
                                    name="password_confirmation"
                                    id="password_confirmation"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required=""
                                    onChange={(e) =>
                                        setData(
                                            "password_confirmation",
                                            e.target.value
                                        )
                                    }
                                    autoComplete="off"
                                />
                                {errors.password_confirmation ? (
                                    <>
                                        <small className="absolute flex justify-between w-full pt-1 text-xs transition text-pink-500 font-light italic">
                                            <span>
                                                {errors.password_confirmation}
                                            </span>
                                        </small>
                                        <br />
                                    </>
                                ) : null}
                            </div>
                            <button
                                type="submit"
                                className="w-full text-white bg-teal-600 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800"
                            >
                                Daftar
                            </button>
                        </form>
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={() => router.visit(route("login"))}
                            >
                                <span className="italic font-light text-sm">
                                    Kembali login
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
