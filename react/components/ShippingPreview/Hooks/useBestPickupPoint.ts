import { useEffect, useState } from "react";
import { usePickUpPoints } from "./usePickupPoints";
import {
    GetBestPickupPoint,
    GetCountry,
    GetDefaultSeller,
    GetProductContext,
    GetSallesChannel,
} from "../Logic/ShippingPreviewLogic";

export const useBestPickupPoint = () => {
    const [bestPickupPoint, setBestPickupPoint] = useState<Sla>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const { pickupPoints } = usePickUpPoints();
    const productContext = GetProductContext();
    const sellerId = GetDefaultSeller()?.sellerId;
    const country = GetCountry();
    const sallesChannel = GetSallesChannel();

    useEffect(() => {
        setLoading(true);
        const fetchBestPickupPoint = async () => {
            try {
                const bestResult = await GetBestPickupPoint(
                    pickupPoints,
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
    }, [pickupPoints]);

    return { bestPickupPoint, loading, error };
};
