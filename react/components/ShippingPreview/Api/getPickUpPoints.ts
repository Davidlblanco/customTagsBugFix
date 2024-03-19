import axios from "axios";
import { PickupPointItem, PickupPointFiltered } from "../Types/types";

const GetPickUpPoints = async (countryGeoCoordinates: number[]) => {
    const url = `/api/checkout/pub/pickup-points?geoCoordinates=${countryGeoCoordinates.join(
        ";"
    )}`;

    const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
    };

    try {
        const response = await axios.get(url, { headers });
        return FilterPickUpPoints(response.data.items);
    } catch (error) {
        console.error(error);
        return [];
    }
};

const FilterPickUpPoints = (items: PickupPointItem[]) => {
    const filteredPickUpItems = items.filter(
        (item) => item.pickupPoint.address.addressType === "pickup"
    );

    const pickupPointDetails: PickupPointFiltered[] = filteredPickUpItems.map(
        (item) => {
            return {
                friendlyName: item.pickupPoint.friendlyName,
                postalCode: item.pickupPoint.address.postalCode,
                geoCoordinates: item.pickupPoint.address.geoCoordinates,
                country: item.pickupPoint.address.country,
            };
        }
    );

    return pickupPointDetails;
};

export { GetPickUpPoints };
