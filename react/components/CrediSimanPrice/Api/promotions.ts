import axios from "axios";
import { CredisimanType, PromotionParams } from "../Types/credisimanTypes";

export const getPromotions = async (params: PromotionParams): Promise<CredisimanType | undefined> => {
   const { productId, skuId, channelId } = params;
   const url = `/_v/credisiman-promotions/${productId}/${skuId}/${channelId}`;

   try {
      const response = await axios.get(url);
      return response?.data[0];
   } catch (error) {
      console.error(error);
      return undefined;
   }
};
