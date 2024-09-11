import React from "react";

import Phone from "../../assets/img/phone.png";
import PhoneSignal from "../../assets/img/phone-signal.png";
import Token from "../../assets/img/token.png";
import Wallet from "../../assets/img/wallet.png";
import BPJS from "../../assets/img/shield.png";
import Internet from "../../assets/img/router.png";
import PDAM from "../../assets/img/water.png";
import PLNPasca from "../../assets/img/listrikpasca.png";
import PBB from "../../assets/img/tax.png";
import WinpayLogo from "../../assets/img/logo.png";

export default function PPOBIcon({ label }) {
    return (
        <>
            {label === "Pulsa" ? (
                <img src={Phone} width={50} height={50} alt="Pulsa Ikon Menu" />
            ) : label === "Paket Data" ? (
                <img src={PhoneSignal} width={50} height={50} alt="Data logo" />
            ) : label === "Token PLN" ? (
                <img src={Token} width={50} height={50} alt="Token Logo" />
            ) : label === "E-Money" ? (
                <img src={Wallet} width={50} height={50} alt="Wallet logo" />
            ) : label === "BPJS Kesehatan" ? (
                <img src={BPJS} width={50} height={50} alt="BPJS logo" />
            ) : label === "Internet" ? (
                <img
                    src={Internet}
                    width={50}
                    height={50}
                    alt="Internet logo"
                />
            ) : label === "PDAM" ? (
                <img src={PDAM} width={50} height={50} alt="PDAM logo" />
            ) : label === "Tagihan PLN" ? (
                <img src={PLNPasca} width={50} height={50} alt="PDAM logo" />
            ) : label === "PBB" ? (
                <img src={PBB} width={50} height={50} alt="PBB logo" />
            ) : (
                <img
                    src={WinpayLogo}
                    width={50}
                    height={50}
                    alt="Winpay logo"
                />
            )}
        </>
    );
}
