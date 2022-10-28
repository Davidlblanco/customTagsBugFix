import React, { useEffect } from "react";
import { useProduct } from "vtex.product-context";

function ProductPageScript() {
    const context = useProduct();
    useEffect(() => {
        if (!context || !context.product || !context.product.productReference)
            return;
        const productReference = context.product.productReference;

        window.SYNDI = window.SYNDI || [];
        window.SYNDI = window.SYNDI.filter((element: any) => element != "null");
        const containsProductRef = window.SYNDI.includes(productReference);
        console.log(containsProductRef, window.SYNDI, productReference);
        if (!containsProductRef) window.SYNDI.push(productReference);
    }, [context]);
    return <></>;
}

export default ProductPageScript;
