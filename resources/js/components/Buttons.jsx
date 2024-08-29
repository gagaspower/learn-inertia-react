import React, { forwardRef } from "react";

export function EditButton({ handleClick }) {
    return (
        <>
            {/*<!-- Component: Small outline button with icon  --> */}
            <button
                onClick={handleClick}
                className="inline-flex items-center justify-center h-8 gap-2 px-4 text-xs font-medium tracking-wide text-white transition duration-300 rounded focus-visible:outline-none whitespace-nowrap bg-emerald-500 hover:bg-emerald-600 focus:bg-emerald-700 disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none"
            >
                <span className="order-2">Edit</span>
                <span className="relative only:-mx-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        role="graphics-symbol"
                        aria-labelledby="title-81 desc-81"
                    >
                        <title id="title-81">Icon title</title>
                        <desc id="desc-81">
                            A more detailed description of the icon
                        </desc>
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        />
                    </svg>
                </span>
            </button>
            {/*<!-- End Small outline button with icon  --> */}
        </>
    );
}

export function DeleteButton({ handleClick }) {
    return (
        <>
            {/*<!-- Component: Small outline button with icon  --> */}
            <button
                onClick={handleClick}
                className="inline-flex items-center justify-center h-8 gap-2 px-4 text-xs font-medium tracking-wide text-white transition duration-300 rounded focus-visible:outline-none whitespace-nowrap bg-rose-500 hover:bg-rose-600 focus:bg-rose-700 disabled:cursor-not-allowed disabled:border-rose-300 disabled:bg-rose-300 disabled:shadow-none"
            >
                <span className="order-2">Hapus</span>
                <span className="relative only:-mx-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        role="graphics-symbol"
                        aria-labelledby="title-81 desc-81"
                    >
                        <title id="title-81">Icon title</title>
                        <desc id="desc-81">
                            A more detailed description of the icon
                        </desc>
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                    </svg>
                </span>
            </button>
            {/*<!-- End Small outline button with icon  --> */}
        </>
    );
}

export function AddButton({ handleClick, label }) {
    return (
        <>
            {/*<!-- Component: Small secondary button with leading icon  --> */}
            <button
                onClick={handleClick}
                className="inline-flex h-8 items-center justify-center gap-2 justify-self-center whitespace-nowrap rounded bg-emerald-50 px-4 text-xs font-medium tracking-wide text-emerald-500 transition duration-300 hover:bg-emerald-100 hover:text-emerald-600 focus:bg-emerald-200 focus:text-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-100 disabled:text-emerald-400 disabled:shadow-none"
            >
                <span className="order-2">{label || "Tambah Data"}</span>
                <span className="relative only:-mx-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        role="graphics-symbol"
                        aria-labelledby="title-26 desc-26"
                    >
                        <title id="title-26">Icon title</title>
                        <desc id="desc-26">
                            A more detailed description of the icon
                        </desc>
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
                        />
                    </svg>
                </span>
            </button>
            {/*<!-- End Small secondary button with leading icon  --> */}
        </>
    );
}

export function ViewDetailButton() {
    return (
        <>
            {/*<!-- Component: Small secondary button with leading icon  --> */}
            <button className="inline-flex h-8 items-center justify-center gap-2 justify-self-center whitespace-nowrap rounded bg-zinc-50 px-4 text-xs font-medium tracking-wide text-zinc-500 transition duration-300 hover:bg-zinc-100 hover:text-zinc-600 focus:bg-zinc-200 focus:text-zinc-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-zinc-300 disabled:bg-zinc-100 disabled:text-zinc-400 disabled:shadow-none">
                <span className="order-2">Tambah Data</span>
                <span className="relative only:-mx-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        role="graphics-symbol"
                        aria-labelledby="title-26 desc-26"
                    >
                        <title id="title-26">Icon title</title>
                        <desc id="desc-26">
                            A more detailed description of the icon
                        </desc>
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                    </svg>
                </span>
            </button>
            {/*<!-- End Small secondary button with leading icon  --> */}
        </>
    );
}

export function SubmitButton({ isDisable }) {
    return (
        <>
            {/*<!-- Component: Small secondary button with leading icon  --> */}
            <button
                disabled={isDisable}
                className={`inline-flex h-8 items-center justify-center gap-2 justify-self-center whitespace-nowrap rounded bg-teal-50 px-4 text-xs font-medium tracking-wide text-teal-500 transition duration-300 hover:bg-teal-100 hover:text-teal-600 focus:bg-teal-200 focus:text-teal-700 focus-visible:outline-none ${
                    isDisable
                        ? "disabled disabled:cursor-not-allowed disabled:border-teal-300 disabled:bg-teal-100 disabled:text-teal-400 disabled:shadow-none"
                        : ""
                }`}
            >
                <span className="order-2">
                    {isDisable ? "Mohon tunggu" : "Submit"}
                </span>
                <span className="relative only:-mx-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        role="graphics-symbol"
                        aria-labelledby="title-26 desc-26"
                    >
                        <title id="title-26">Icon title</title>
                        <desc id="desc-26">
                            A more detailed description of the icon
                        </desc>
                        {isDisable ? (
                            <>
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </>
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
                            />
                        )}
                    </svg>
                </span>
            </button>
            {/*<!-- End Small secondary button with leading icon  --> */}
        </>
    );
}

export function CancelButton({ handleCancel, label }) {
    return (
        <>
            {/*<!-- Component: Small secondary button with leading icon  --> */}
            <button
                onClick={handleCancel}
                className="w-full md:w-auto inline-flex h-8 items-center justify-center gap-2 justify-self-center whitespace-nowrap rounded bg-zinc-50 px-4 text-xs font-medium tracking-wide text-zinc-500 transition duration-300 hover:bg-zinc-100 hover:text-zinc-600 focus:bg-zinc-200 focus:text-zinc-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-zinc-300 disabled:bg-zinc-100 disabled:text-zinc-400 disabled:shadow-none"
            >
                <span className="order-2">{label || "Batal"}</span>
                <span className="relative only:-mx-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        role="graphics-symbol"
                        aria-labelledby="title-26 desc-26"
                    >
                        <title id="title-26">Icon title</title>
                        <desc id="desc-26">
                            A more detailed description of the icon
                        </desc>
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                    </svg>
                </span>
            </button>
            {/*<!-- End Small secondary button with leading icon  --> */}
        </>
    );
}

export function ConfirmButton({ handleClick }) {
    return (
        <>
            {/*<!-- Component: Small secondary button with leading icon  --> */}
            <button
                onClick={handleClick}
                className={`inline-flex h-8 items-center justify-center gap-2 justify-self-center whitespace-nowrap rounded bg-teal-50 px-4 text-xs font-medium tracking-wide text-teal-500 transition duration-300 hover:bg-teal-100 hover:text-teal-600 focus:bg-teal-200 focus:text-teal-700 focus-visible:outline-none `}
            >
                <span className="order-2">Ya</span>
            </button>
            {/*<!-- End Small secondary button with leading icon  --> */}
        </>
    );
}

export function SearchButton({ type, handleClick }) {
    return (
        <>
            <button
                type={type}
                onClick={handleClick}
                className="w-auto inline-flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                <span className="order-2">Search</span>
                <span className="relative only:-mx-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        role="graphics-symbol"
                        aria-labelledby="title-26 desc-26"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                        />
                    </svg>
                </span>
            </button>
        </>
    );
}

export const FilterButtonWithRef = forwardRef((props, ref) => (
    <button
        type="button"
        ref={ref}
        {...props}
        className="inline-flex h-8 items-center justify-center gap-2 justify-self-center whitespace-nowrap rounded bg-zinc-50 px-4 text-xs font-medium tracking-wide text-zinc-500 transition duration-300 hover:bg-zinc-100 hover:text-zinc-600 focus:bg-zinc-200 focus:text-zinc-700 focus-visible:outline-none"
    >
        <span className="order-2">filter</span>
        <span className="relative only:-mx-4">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
                role="graphics-symbol"
                aria-labelledby="title-26 desc-26"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
                />
            </svg>
        </span>
    </button>
));

export const FilterButton = ({ type, ...props }) => {
    return (
        <button
            type={type || "button"}
            {...props}
            className="inline-flex h-8 items-center justify-center gap-2 justify-self-center whitespace-nowrap rounded bg-zinc-50 px-4 text-xs font-medium tracking-wide text-zinc-500 transition duration-300 hover:bg-zinc-100 hover:text-zinc-600 focus:bg-zinc-200 focus:text-zinc-700 focus-visible:outline-none"
        >
            <span className="order-2">filter</span>
            <span className="relative only:-mx-4">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    role="graphics-symbol"
                    aria-labelledby="title-26 desc-26"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
                    />
                </svg>
            </span>
        </button>
    );
};
