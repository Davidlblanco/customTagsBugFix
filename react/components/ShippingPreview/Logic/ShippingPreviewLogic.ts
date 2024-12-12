import { useProduct } from "vtex.product-context";
import { ShippingQuery, EstimativeData, ShippingItem } from "../Types/types";
import { getDefaultSeller } from "../../../utils/GetDefaultSeller";
import { useOrderForm } from "vtex.order-manager/OrderForm";
import { useRuntime } from "vtex.render-runtime";
import { ProductContextState } from "vtex.product-context/react/ProductContextProvider";
import { SimulateCart } from "../Api/simulateCart";
import { useRenderSession } from "vtex.session-client";
import { GetCountryDefaultPostalCode } from "../Configs/defaultCountrySettings";

export const GetCountry = (): string | undefined => {
    const { culture } = useRuntime();
    return culture.country;
};

export const UseSallesChannel = (): string | undefined => {
    const { session } = useRenderSession();
    return session?.namespaces?.store?.channel?.value;
};

export const GetProductContext = () => {
    const productContext = useProduct();
    return productContext;
};

export const GetDefaultSeller = () => {
    return getDefaultSeller(GetProductContext()?.selectedItem?.sellers);
};

export const validatePostalCode = (postalCode : string) => {
    if(postalCode.length < 1) return false

    return !postalCode.includes("*");
};

export const GetUserPostalCode = (): string | undefined => {
    const { orderForm } = useOrderForm();

    const selectedAddress =
        orderForm?.shipping?.selectedAddress?.addressType !== "search"
            ? orderForm?.shipping?.selectedAddress
            : null;

    const postalCodeIsValid = validatePostalCode(selectedAddress?.postalCode ?? "");

    const initialPostalCode: string | undefined = postalCodeIsValid
        ? selectedAddress?.postalCode
        : GetCountryDefaultPostalCode();

    return initialPostalCode;
};

export const FilterShippingEstimativeUserData = (
    data: ShippingQuery | undefined
): EstimativeData[] | undefined => {
    if (!data) return undefined;

    const filteredData = data?.shipping?.logisticsInfo[0]?.slas.map((item) => {
        return {
            ...item,
        };
    });

    return filteredData;
};

export const DivideShippingEstimativeUserData = (
    data: EstimativeData[] | undefined
) => {
    let delivery: EstimativeData = {} as EstimativeData;
    let scheduledDelivery: EstimativeData = {} as EstimativeData;
    let expressDelivery: EstimativeData = {} as EstimativeData;
    
    data?.forEach((item) => {
        if (item.friendlyName.toLowerCase().includes("envío a domicilio entrega programada")) scheduledDelivery = item; 
        else if (item.friendlyName.toLowerCase().includes("evío a domicilio entrega express")) expressDelivery = item;
        else if (item.friendlyName.toLowerCase().includes("envío a domicilio")) delivery = item;
    });

    return { delivery, expressDelivery, scheduledDelivery };
};

export const GetBestPickupPoint = async (
    coordinates: number[],
    country: string | undefined,
    sellerId: string,
    productContext: Partial<ProductContextState> | undefined,
    sallesChannel: string | undefined
) => {
    const estimatives = await GetShippingEstimativesByCoordinates(
        coordinates,
        country,
        sellerId,
        productContext,
        sallesChannel
    );

    const bestCostResult = FilterPickUpPointsEstimativesByCost(estimatives);
    const bestResult = FilterPickupPointEstimativesByEstimative(bestCostResult);

    return bestResult;
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

const GetShippingEstimativesByCoordinates = async (
    coorDinates: number[],
    country: string | undefined,
    sellerId: string,
    productContext: Partial<ProductContextState> | undefined,
    sallesChannel: string | undefined
) => {
    const results = await SimulateCart({
        productContext,
        sellerId,
        country,
        geoCoordinates: coorDinates as [number, number],
        sallesChannel,
    });
    return RemoveNotPickupPoints(results);
};

const RemoveNotPickupPoints = (results: ShippingItem[]) => {
    const estimatives: Sla[][] = results?.map((result) =>
        result?.slas?.filter(
            (sla: Sla) =>
                sla.deliveryChannel === "pickup-in-point" &&
                sla.pickupStoreInfo.isPickupStore === true
        )
    );
    const flatArray: Sla[] = estimatives.flat();

    return flatArray;
};
