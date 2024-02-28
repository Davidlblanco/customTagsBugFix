import axios from "axios";

interface SimulationRequest {
    productId: string | undefined;
    postalCode: string;
    country: string;
    geoCoordinates: [number, number];
}

const SimulateCart = async ({
    productId,
    postalCode,
    country,
    geoCoordinates
}: SimulationRequest) => {
    const url = "/api/checkout/pub/orderForms/simulation?RnbBehavior=0&sc=1";

    const requestData = {
        items: [{ id: productId, quantity: 1, seller: "1" }],
        postalCode,
        country,
        geoCoordinates
    };

    const options = {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    };

    try {
        const response = await axios.post(url, requestData, options);
        return response.data.logisticsInfo[0];
    } catch (error) {
        console.error(error);
    }
};

export { SimulateCart };
