import CarWashIcon from "../../assets/img/carwash.png";
import WalletIcon from "../../assets/img/wallet.png";

export default function Transaksi() {
    return (
        <>
            <section>
                <div className="container m-auto">
                    <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
                        <div className="col-span-4 lg:col-span-6">
                            <div
                                onClick={() => console.log("click")}
                                className="overflow-hidden rounded bg-white text-center text-slate-500 shadow-md shadow-slate-200 group hover:border hover:border-emerald-300 hover:cursor-pointer"
                            >
                                {/*  <!-- Image --> */}
                                <figure className="p-6 pb-0">
                                    <span className="relative inline-flex h-20 w-20 items-center justify-center rounded-full text-white">
                                        <img
                                            src={CarWashIcon}
                                            alt="user name"
                                            title="user name"
                                            width="80"
                                            height="80"
                                            className="max-w-full rounded-full"
                                        />
                                    </span>
                                </figure>
                                {/*  <!-- Body--> */}
                                <div className="p-6">
                                    <header className="mb-4">
                                        <h3 className="text-xl font-medium text-slate-700 group-hover:text-emerald-500">
                                            Salon Mobil/Motor
                                        </h3>
                                    </header>
                                </div>
                                {/*  <!-- Action base sized with lead icon buttons  --> */}
                            </div>
                        </div>
                        <div className="col-span-4 lg:col-span-6">
                            <div
                                onClick={() => console.log("click 2")}
                                className="overflow-hidden rounded bg-white text-center text-slate-500 shadow-md shadow-slate-200 group hover:border hover:border-emerald-300 hover:cursor-pointer"
                            >
                                {/*  <!-- Image --> */}
                                <figure className="p-6 pb-0">
                                    <span className="relative inline-flex h-20 w-20 items-center justify-center rounded-full text-white">
                                        <img
                                            src={WalletIcon}
                                            alt="user name"
                                            title="user name"
                                            width="80"
                                            height="80"
                                            className="max-w-full rounded-full"
                                        />
                                    </span>
                                </figure>
                                {/*  <!-- Body--> */}
                                <div className="p-6">
                                    <header className="mb-4">
                                        <h3 className="text-xl font-medium text-slate-700 group-hover:text-emerald-500">
                                            Pengeluaran
                                        </h3>
                                    </header>
                                </div>
                                {/*  <!-- Action base sized with lead icon buttons  --> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
