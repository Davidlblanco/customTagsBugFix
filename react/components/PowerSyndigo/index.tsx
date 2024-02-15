import React, {useEffect} from "react";
import { useProduct } from "vtex.product-context";

const PowerSyndigo = () => {
    const productContextValue = useProduct();
    const productReference = productContextValue?.product?.productReference as string;

    useEffect(() => {
        const script = document.createElement("syndigo-powerpage");
        script.setAttribute("pageid", productReference);
        document.getElementById("siman-syndigo")?.appendChild(script);

    }, []);

    return <div id="siman-syndigo"></div>;
};

export default PowerSyndigo;