export default function Modals({ isShowing, title, children }) {
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
                        </header>

                        <div className="my-6">{children}</div>
                    </div>
                </div>
            ) : null}
        </>
    );
}
