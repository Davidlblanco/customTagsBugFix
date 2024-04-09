import axios from "axios";
import { CredisimanType, PromotionParams } from "../Types/credisimanTypes";

export const simulation = async (params: PromotionParams): Promise<CredisimanType | undefined> => {
    const { skuId, channelId, sellerId } = params;
    const url = `/api/checkout/pub/orderForms/simulation?sc=${channelId}`;

    const requestData = {
        items: [{ id: skuId, quantity: 1, seller: sellerId }],
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

        console.log('Response simulation', response?.data)

        const discount = response?.data?.ratesAndBenefitsData?.teaser[0]?.effects?.parameters[0]?.value;
        const discountValue = +discount;
        const skuId = response?.data?.items[0]?.id;
        const total = response?.data?.items[0]?.priceDefinition?.total;
        const totalWithDiscount = ((discountValue / 100) * total - total) * -1;

        const data: CredisimanType = {
            discountValue,
            method: "percentage",
            skuId,
            totalWithDiscount
        };

        return discount ? data : undefined;
    } catch (error) {
        console.error("Erro:", error);
        return undefined;
    }
};
