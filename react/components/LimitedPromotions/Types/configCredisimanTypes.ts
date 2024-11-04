import { ConfigLimitedPromotions } from "./limitedPromotions";

export type CredisimanType = {
  type: 'normal' | 'limited'
  promotionId: string
  available?: string
  discountValue: number
  method: 'percentage' | 'nominal'
  skuId: string[]
  totalWithDiscount: number
  styles: ConfigLimitedPromotions['configs']
}

export type PromotionParams = {
  productId: string | undefined
  skuId: string | undefined
  channelId: string | undefined
  sellerId?: string | undefined
  baseUrl: string | undefined
}

export type CredisimanStorage = {
  remainingMillisecondsExpire: number
  value: Record<string, CredisimanType>
}