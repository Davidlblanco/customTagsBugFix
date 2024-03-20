import { GetPickUpPoints } from "../Api/getPickUpPoints";
import { useEffect, useState } from "react";
import { PickupPointFiltered } from "../Types/types";
import { GetCountryDefaultGeoCoordinates } from "../Configs/defaultCountrySettings";

export const usePickUpPoints = () => {
    const [pickupPoints, setPickupPoints] = useState<PickupPointFiltered[]>([]);
    const geoCoordinates = GetCountryDefaultGeoCoordinates();

    useEffect(() => {
        const fetchPickupPoints = async () => {
            const result = await GetPickUpPoints(geoCoordinates);
            setPickupPoints(result);
        };

        fetchPickupPoints();
    }, []);

    return { pickupPoints };
};
