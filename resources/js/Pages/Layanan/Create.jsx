import Cards from "@/components/Card";
import { InputDefault } from "@/components/FormInput";
import { useForm, usePage } from "@inertiajs/react";
import TextAreaForm from "@/components/TextAreaForm";
import { CancelButton, SubmitButton } from "@/components/Buttons";
import { SuccessAlert, ErrorAlert } from "@/components/Alert";
import { router } from "@inertiajs/react";

export default function Create() {
    const { flash } = usePage().props;
    const { data, setData, post, errors, processing } = useForm({
        nama_layanan: "",
        deskripsi_layanan: "",
        harga_layanan: "",
    });

    const backToIndex = (e) => {
        e.preventDefault();
        router.visit(route("layanan.index"));
    };

    const handleSubmitForm = (e) => {
        e.preventDefault();
        post(route("layanan.store"));
    };
    return (
        <Cards>
            <div className="p-4">
                <div className="border-b py-3 mb-3">
                    <span>Tambah Data Layanan</span>
                </div>
                <div className="w-full md:w-1/2 flex flex-col">
                    {flash.success ? (
                        <SuccessAlert message={flash.success} />
                    ) : null}

                    {flash.error ? <ErrorAlert message={flash.error} /> : null}
                    <br />

                    <form onSubmit={handleSubmitForm}>
                        <InputDefault
                            formLabel="Nama Layanan"
                            value={data.nama_layanan}
                            handleChange={(e) =>
                                setData("nama_layanan", e.target.value)
                            }
                            error={errors.nama_layanan}
                        />
                        <br />
                        <TextAreaForm
                            formLabel="Deskripsi Layanan"
                            name="deskripsi_layanan"
                            value={data.deskripsi_layanan}
                            handleChange={(e) =>
                                setData("deskripsi_layanan", e.target.value)
                            }
                            error={errors.deskripsi_layanan}
                        />
                        <br />
                        <InputDefault
                            formLabel="Harga Layanan"
                            value={data.harga_layanan}
                            handleChange={(e) =>
                                setData("harga_layanan", e.target.value)
                            }
                            error={errors.harga_layanan}
                            type="number"
                        />
                        <br />
                        <div className="flex flex-row gap-3 border-t mt-3 py-3">
                            <SubmitButton isDisable={processing} />
                            <CancelButton handleCancel={backToIndex} />
                        </div>
                    </form>
                </div>
            </div>
        </Cards>
    );
}
