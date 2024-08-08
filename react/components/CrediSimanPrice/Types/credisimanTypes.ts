export type CredisimanType = {
   promotionId: string
   discountValue: number;
   method: "percentage" | "nominal";
   skuId: string[];
   totalWithDiscount: number;
   styles: ConfigGroup['configs']
};

export type PromotionParams = {
   productId: string | undefined;
   skuId: string | undefined;
   channelId: string | undefined;
   sellerId?: string | undefined;
};

export type CredisimanStorage = {
   remainingMillisecondsExpire: number;
   value: Record<string, CredisimanType>
}

export interface ConfigGroup {
  promotionId: string
  configs: {
    viewFields: {
      price: {
        active: boolean
        color: string
      }
      porcentage: boolean
      img: boolean
      text: {
        active: boolean
        color: string
        phrase: string
        position: 'left' | 'right'
      }
    }
    percentageBasis: 'list-price' | 'selling-price'
    tagStyles: {
      fontSize: string
      borderColor: string
      borderRadius: string
      backgroundColor: string
      color: string
    }
    image: {
      src: string
      filename: string
      position: 'right' | 'left'
    }
  }
}
