export type CredisimanType = {
   discountValue: number;
   method: "percentage" | "nominal";
   skuId: string[];
   totalWithDiscount: number;
};

export type PromotionParams = {
   productId: string | undefined;
   skuId: string | undefined;
   sellerId: string | undefined;
};

export type CredisimanStorage = {
   remainingMillisecondsExpire: number;
   value: Record<string, CredisimanType>
}
