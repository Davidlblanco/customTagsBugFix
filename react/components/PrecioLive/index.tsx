import React, { useEffect, useState } from "react";
import waitForEl from "../../utils/waitForEl";
import styles from "./index.css";
import { useDevice } from "vtex.device-detector";

const PrecioLive = () => {
    const [inserted, setInserted] = useState(false);
    const { isMobile } = useDevice();

    useEffect(() => {
        if (!inserted) {
            setInserted(true);
            waitForEl(".vtex-product-price-1-x-sellingPrice", insertPrecioLive);
        }
    }, [inserted]);

    useEffect(() => {
        if (isMobile)
            waitForEl(
                ".vtexventures-livestreaming-free-0-x-player-button",
                resetPrecioLive
            );
    }, [isMobile]);

    function insertPrecioLive(elements: any) {
        //console.log("Inserindo tag!");
        if (document.querySelector(".siman-m3-custom-0-x-precio-live")) return;
        Array.from(elements).map((el: any) => {
            const span = document.createElement("span");
            span.innerText = "Oferta";
            span.classList.add(styles["precio-live"]);
            el.append(span);
        });
    }

    function resetPrecioLive(elements: any) {
        elements[0].addEventListener("click", () => setInserted(false));
    }

    return <></>;
};

export default PrecioLive;
