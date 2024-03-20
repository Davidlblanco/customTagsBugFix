import { useQuery } from "react-apollo";
import getShippingEstimateQuery from "../../../graphql/getShippingEstimate.gql";
import {
    DivideShippingEstimativeUserData,
    FilterShippingEstimativeUserData,
    GetCountry,
    GetDefaultSeller,
    GetProductContext,
} from "../Logic/ShippingPreviewLogic";
import { ShippingQuery } from "../Types/types";

export const useShippingEstimative = (postalCode: string | undefined) => {
    const productContext = GetProductContext();

    const { data, error } = useQuery<ShippingQuery>(getShippingEstimateQuery, {
        variables: {
            items: [
                {
                    quantity: productContext?.selectedQuantity?.toString(),
                    id: productContext?.selectedItem?.itemId,
                    seller: GetDefaultSeller()?.sellerId,
                },
            ],
            postalCode,
            country: GetCountry(),
        },
    });

    const estimatives = FilterShippingEstimativeUserData(data);
    const { delivery, expressDelivery, scheduledDelivery } =
        DivideShippingEstimativeUserData(estimatives);

    return { delivery, expressDelivery, scheduledDelivery, error };
};
