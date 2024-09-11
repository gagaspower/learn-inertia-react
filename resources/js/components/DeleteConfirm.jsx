import React from "react";
import Modals from "@/components/Modals";
import { CancelButton, ConfirmButton } from "@/components/Buttons";

export default function DeleteConfirm({
    isVisible,
    handleDelete,
    handleCancel,
}) {
    return (
        <Modals isShowing={isVisible} title="Hapus data?">
            <div className="flex flex-col gap-3 overflow-x-auto">
                <span>Apakah anda yakin akan menghapus data ini ?</span>

                <div className="flex flex-row  gap-3">
                    <ConfirmButton handleClick={handleDelete} />
                    <CancelButton handleCancel={handleCancel} />
                </div>
            </div>
        </Modals>
    );
}
