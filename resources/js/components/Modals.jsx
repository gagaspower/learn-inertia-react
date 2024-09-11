export default function Modals({
    isShowing,
    title,
    children,
    handleIsShowing,
}) {
    return (
        <>
            {isShowing ? (
                <div
                    className="fixed top-0 left-0 z-20 flex h-screen w-screen items-center justify-center bg-slate-300/20 backdrop-blur-sm"
                    aria-labelledby="header-1a content-1a"
                    aria-modal="true"
                    tabIndex="-1"
                    role="dialog"
                >
                    <div
                        className="flex max-h-[90vh] w-11/12 max-w-2xl flex-col gap-6 overflow-hidden rounded bg-white p-6 text-slate-500 shadow-xl shadow-slate-700/10"
                        id="modal"
                        role="document"
                    >
                        <header id="header-1a" className="flex items-center">
                            <h3 className="flex-1 text-xl font-medium text-slate-700">
                                {title}
                            </h3>
                            {handleIsShowing ? (
                                <button
                                    onClick={handleIsShowing}
                                    className="inline-flex h-10 items-center justify-center gap-2 justify-self-center whitespace-nowrap rounded-full px-5 text-sm font-medium tracking-wide text-emerald-500 transition duration-300 hover:bg-emerald-100 hover:text-emerald-600 focus:bg-emerald-200 focus:text-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:text-emerald-300 disabled:shadow-none disabled:hover:bg-transparent"
                                    aria-label="close dialog"
                                >
                                    <span className="relative only:-mx-5">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            role="graphics-symbol"
                                            aria-labelledby="title-79 desc-79"
                                        >
                                            <title id="title-79">
                                                Icon title
                                            </title>
                                            <desc id="desc-79">
                                                A more detailed description of
                                                the icon
                                            </desc>
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </span>
                                </button>
                            ) : null}
                        </header>

                        <div className="mt-3 pb-3">{children}</div>
                    </div>
                </div>
            ) : null}
        </>
    );
}
