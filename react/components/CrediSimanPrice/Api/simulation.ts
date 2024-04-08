import axios from "axios";
import { CredisimanType, PromotionParams } from "../Types/credisimanTypes";

export const simulation = async (params: PromotionParams): Promise<CredisimanType | undefined> => {
    const { skuId } = params;
    const url = "/api/checkout/pub/orderForms/simulation?sc=1";

    const requestData = {
        items: [{ id: skuId, quantity: 1, seller: 1 }],
        paymentData: {
            payments: [{
                paymentSystem: "401",
                bin: "60083130"
            }]
        }
    };

    try {
        const response = await axios.post(url, requestData, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });

        const discountValue = response?.data?.ratesAndBenefitsData?.teaser[0]?.effects?.parameters[0]?.value;
        const skuId = response?.data?.items[0]?.id;
        const totalWithDiscount = response?.data?.items[0]?.priceDefinition?.total;

        const data: CredisimanType = {
            discountValue,
            method: "percentage",
            skuId,
            totalWithDiscount
        };

        return totalWithDiscount ? data : undefined;
    } catch (error) {
        console.error("Erro:", error);
        return undefined;
    }
};
