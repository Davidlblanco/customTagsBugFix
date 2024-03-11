import { useEffect, useState } from "react";
import getShippingEstimatesQuery from "../../../graphql/getShippingEstimates.gql";
import { useProduct } from "vtex.product-context";
import { PickupPointFiltered, ShippingQuery } from "../Types/types";
import { getDefaultSeller } from "../../../utils/GetDefaultSeller";
import { useOrderForm } from "vtex.order-manager/OrderForm";
import { useRuntime } from "vtex.render-runtime";
import { useQuery } from "react-apollo";
import { GetPickUpPoints } from "../Api/getPickUpPoints";

const GetCountry = () => {
    const { culture } = useRuntime();
    return culture.country;
};

const FilterShippingEstimativeData = (data: ShippingQuery | undefined) => {
    return {
        estimative: data?.shipping.logisticsInfo[0].slas[0].shippingEstimate,
        cost: data?.shipping.logisticsInfo[0].slas[0].price,
    };
};

export const useGetPickUpPoints = () => {
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

export const GetUserPostalCode = () => {
    const { orderForm } = useOrderForm();
    const selectedAddress = orderForm?.shipping?.selectedAddress;
    const initialPostalCode =
        orderForm?.canEditData || selectedAddress?.isDisposable
            ? selectedAddress?.postalCode
            : undefined;

    return initialPostalCode;
};

export const useGetShippingEstimative = (postalCode: string) => {
    const productContext = useProduct();
    const defaultSeller = getDefaultSeller(
        productContext?.selectedItem?.sellers
    );

    const { data, loading, error } = useQuery<ShippingQuery>(
        getShippingEstimatesQuery,
        {
            variables: {
                items: [
                    {
                        quantity: productContext?.selectedQuantity?.toString(),
                        id: productContext?.selectedItem?.itemId,
                        seller: defaultSeller?.sellerId,
                    },
                ],
                postalCode,
                country: GetCountry(),
            },
        }
    );

    const estimative = FilterShippingEstimativeData(data);

    return { estimative, loading, error };
};
