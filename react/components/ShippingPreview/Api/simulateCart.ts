import axios from "axios";
import { ProductContextState } from "vtex.product-context/react/ProductContextProvider";

export interface SimulationRequest {
    productContext: Partial<ProductContextState> | undefined;
    sellerId: string | undefined;
    postalCode: string | undefined;
    country: string | undefined;
    geoCoordinates: [number, number];
}

const SimulateCart = async ({
    productContext,
    sellerId,
    postalCode,
    country,
    geoCoordinates,
}: SimulationRequest) => {
    const url = "/api/checkout/pub/orderForms/simulation?RnbBehavior=0&sc=1";

    const requestData = {
        items: [
            {
                id: productContext?.selectedItem?.itemId,
                quantity: productContext?.selectedQuantity?.toString(),
                seller: sellerId,
            },
        ],
        postalCode,
        country,
        geoCoordinates,
    };

    const options = {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    };

    try {
        const response = await axios.post(url, requestData, options);
        return response.data.logisticsInfo[0];
    } catch (error) {
        console.error(error);
    }
};

export { SimulateCart };
