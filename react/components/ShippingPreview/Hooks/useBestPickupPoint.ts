import { useEffect, useState } from "react";
import {
    GetBestPickupPoint,
    GetCountry,
    GetDefaultSeller,
    GetProductContext,
    UseSallesChannel,
} from "../Logic/ShippingPreviewLogic";
import { GetCountryDefaultGeoCoordinates } from "../Configs/defaultCountrySettings";

export const useBestPickupPoint = () => {
    const [bestPickupPoint, setBestPickupPoint] = useState<Sla>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const geoCoordinates = GetCountryDefaultGeoCoordinates();

    const productContext = GetProductContext();
    const sellerId = GetDefaultSeller()?.sellerId;
    const country = GetCountry();
    const sallesChannel = UseSallesChannel();

    useEffect(() => {
        if (!geoCoordinates || !sallesChannel) return;
        setLoading(true);

        const fetchBestPickupPoint = async () => {
            try {
                const bestResult = await GetBestPickupPoint(
                    geoCoordinates,
                    country,
                    sellerId,
                    productContext,
                    sallesChannel
                );

                setBestPickupPoint(bestResult);
            } catch (error) {
                console.error("Error fetching best pickup point:", error);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchBestPickupPoint();
    }, [...geoCoordinates, sallesChannel]);

    return { bestPickupPoint, loading, error };
};
