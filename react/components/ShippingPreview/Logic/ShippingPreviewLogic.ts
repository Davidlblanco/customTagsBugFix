import { useEffect, useState } from "react";
import getShippingEstimateQuery from "../../../graphql/getShippingEstimate.gql";
import { useProduct } from "vtex.product-context";
import {
    PickupPointFiltered,
    ShippingQuery,
    EstimativeData,
    ShippingItem,
} from "../Types/types";
import { getDefaultSeller } from "../../../utils/GetDefaultSeller";
import { useOrderForm } from "vtex.order-manager/OrderForm";
import { useRuntime } from "vtex.render-runtime";
import { useQuery } from "react-apollo";
import { GetPickUpPoints } from "../Api/getPickUpPoints";
import { ProductContextState } from "vtex.product-context/react/ProductContextProvider";
import { SimulateCart, SimulationRequest } from "../Api/simulateCart";

const GetCountry = (): string | undefined => {
    const { culture } = useRuntime();
    return culture.country;
};

const GetProductContext = () => {
    const productContext = useProduct();
    return productContext;
};

const GetDefaultSeller = () => {
    return getDefaultSeller(GetProductContext()?.selectedItem?.sellers);
};

const FilterShippingEstimativeUserData = (
    data: ShippingQuery | undefined
): EstimativeData => {
    if (
        data?.shipping?.logisticsInfo[0]?.slas[0]?.shippingEstimate !==
            undefined &&
        data?.shipping?.logisticsInfo[0]?.slas[0]?.price !== undefined
    ) {
        return {
            estimative:
                data?.shipping?.logisticsInfo[0]?.slas[0]?.shippingEstimate,
            cost: data?.shipping?.logisticsInfo[0]?.slas[0]?.price,
            friendlyName:
                data?.shipping?.logisticsInfo[0]?.slas[0].friendlyName,
            id: data?.shipping?.logisticsInfo[0]?.slas[0].id,
        };
    }

    return {
        estimative: undefined,
        cost: undefined,
        friendlyName: undefined,
        id: undefined,
    };
};

const FilterPickUpPointsEstimativesByCost = (pointsEstimatives: Sla[]) => {
    const minCost = Math.min(
        ...pointsEstimatives.map((estimative) => estimative.price ?? Infinity)
    );
    return pointsEstimatives.filter(
        (estimative) => estimative.price === minCost
    );
};

const convertEstimativeToMinutes = (estimative: string | undefined) => {
    const value = parseInt(estimative ?? "0");
    return estimative?.includes("d") || estimative?.includes("bd")
        ? value * 24 * 60
        : value;
};

const FilterPickupPointEstimativesByEstimative = (pointsEstimatives: Sla[]) => {
    const minEstimative = Math.min(
        ...pointsEstimatives.map((point) =>
            convertEstimativeToMinutes(point.shippingEstimate)
        )
    );
    return pointsEstimatives.find(
        (point) =>
            convertEstimativeToMinutes(point.shippingEstimate) === minEstimative
    );
};

const RemoveNotPickupPoints = (results: ShippingItem[]) => {
    const estimatives: Sla[][] = results.map((result) =>
        result.slas.filter(
            (sla: Sla) =>
                sla.deliveryChannel === "pickup-in-point" &&
                sla.pickupStoreInfo.isPickupStore === true
        )
    );
    const flatArray: Sla[] = estimatives.flat();

    return flatArray;
};

const GetShippingEstimatives = async (
    pickupPoints: PickupPointFiltered[],
    country: string | undefined,
    sellerId: string,
    productContext: Partial<ProductContextState> | undefined
) => {
    const queries = pickupPoints.map(async (point) => {
        const simulationRequest: SimulationRequest = {
            productContext,
            sellerId,
            postalCode: point.postalCode,
            country,
            geoCoordinates: point.geoCoordinates,
        };

        return await SimulateCart(simulationRequest);
    });

    const results = await Promise.all(queries);

    return RemoveNotPickupPoints(results);
};

const GetBestPickupPoint = async (
    pickupPoints: PickupPointFiltered[],
    country: string | undefined,
    sellerId: string,
    productContext: Partial<ProductContextState> | undefined
) => {
    const estimatives = await GetShippingEstimatives(
        pickupPoints,
        country,
        sellerId,
        productContext
    );

    const bestCostResult = FilterPickUpPointsEstimativesByCost(estimatives);
    const bestResult = FilterPickupPointEstimativesByEstimative(bestCostResult);

    return bestResult;
};

const useGetPickUpPoints = () => {
    const [pickupPoints, setPickupPoints] = useState<PickupPointFiltered[]>([]);

    useEffect(() => {
        const fetchPickupPoints = async () => {
            const result = await GetPickUpPoints();
            setPickupPoints(result);
        };

        fetchPickupPoints();
    }, []);

    return { pickupPoints };
};

export const useGetBestPickupPoint = () => {
    const [bestPickupPoint, setBestPickupPoint] = useState<Sla>();
    const [loading, setLoading] = useState<boolean>(false);
    const { pickupPoints } = useGetPickUpPoints();
    const productContext = GetProductContext();
    const sellerId = GetDefaultSeller()?.sellerId;
    const country = GetCountry();

    useEffect(() => {
        setLoading(true);
        const fetchBestPickupPoint = async () => {
            try {
                const bestResult = await GetBestPickupPoint(
                    pickupPoints,
                    country,
                    sellerId,
                    productContext
                );
                setBestPickupPoint(bestResult);
            } catch (error) {
                console.error("Error fetching best pickup point:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBestPickupPoint();
    }, [pickupPoints]);

    return { bestPickupPoint, loading };
};

export const useGetShippingEstimative = (postalCode: string | undefined) => {
    const { data, loading, error } = useQuery<ShippingQuery>(
        getShippingEstimateQuery,
        {
            variables: {
                items: [
                    {
                        quantity:
                            GetProductContext()?.selectedQuantity?.toString(),
                        id: GetProductContext()?.selectedItem?.itemId,
                        seller: GetDefaultSeller()?.sellerId,
                    },
                ],
                postalCode,
                country: GetCountry(),
            },
        }
    );

    const estimative = FilterShippingEstimativeUserData(data);

    return { estimative, loading, error };
};

export const GetUserPostalCode = (): string | undefined => {
    const { orderForm } = useOrderForm();
    const selectedAddress = orderForm?.shipping?.selectedAddress;
    const initialPostalCode: string | undefined =
        orderForm?.canEditData || selectedAddress?.isDisposable
            ? selectedAddress?.postalCode
            : undefined;

    return initialPostalCode;
};
