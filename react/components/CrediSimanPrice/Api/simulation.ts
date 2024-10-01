import axios from "axios";
import { CredisimanType, PromotionParams } from "../Types/credisimanTypes";

export const simulation = async (params: PromotionParams): Promise<CredisimanType | undefined> => {
    const { skuId, channelId, sellerId, baseUrl = "" } = params;

    const url = `${baseUrl}/_v/credisiman-simulations/${skuId}/${channelId}/${sellerId}`;

    try {
        const response = await axios.get(url);
        return response?.data[0];
    } catch (error) {
        console.error(error);
        return undefined;
    }
};
