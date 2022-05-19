import React, { useEffect, useState } from "react";
import waitForEl from "../../utils/waitForEl";
import styles from "./index.css";
import { useOrderForm } from "vtex.order-manager/OrderForm";
import { useProduct } from "vtex.product-context";

const PrecioLive = () => {
    const [inserted, setInserted] = useState(false);
    const { orderForm } = useOrderForm();
    const productContextValue = useProduct();

    useEffect(() => {
        console.log("Orderform: ", orderForm);
    }, [orderForm]);

    useEffect(() => {
        console.log("productContextValue: ", productContextValue);
    }, [productContextValue]);

    useEffect(() => {
        if (!inserted) {
            setInserted(true);
            waitForEl(
                ".vtex-product-summary-2-x-priceContainer",
                insertPrecioLive
            );
        }
    }, []);

    const insertPrecioLive = (elements: any) => {
        Array.from(elements).map((el: any) => {
            const span = document.createElement("span");
            span.innerText = "Precio Live";
            span.classList.add(styles["precio-live"]);
            el.append(span);
        });
    };

    return <> sadds </>;
};

export default PrecioLive;
