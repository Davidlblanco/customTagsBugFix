import axios from "axios";
import { ProductContextState } from "vtex.product-context/react/ProductContextProvider";

export interface SimulationRequest {
    productContext: Partial<ProductContextState> | undefined;
    sellerId: string | undefined;
    country: string | undefined;
    geoCoordinates: [number, number];
    sallesChannel: string | undefined;
}

const SimulateCart = async ({
    productContext,
    sellerId,
    country,
    geoCoordinates,
    sallesChannel,
}: SimulationRequest) => {
    const url = `/api/checkout/pub/orderForms/simulation?RnbBehavior=0&sc=${sallesChannel}`;

    const requestData = {
        items: [
            {
                id: productContext?.selectedItem?.itemId,
                quantity: productContext?.selectedQuantity?.toString(),
                seller: sellerId,
            },
        ],
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
