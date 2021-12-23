import React from "react";
import useProduct from "vtex.product-context/useProduct";

export default function GiftWrapper() {
    const ctx = useProduct();
    console.log("productproduct", ctx);

    return <div>teste</div>
}