import { ConfigLimitedOfpPromotions } from "./limitedOfpPromotions";

export type ConfigType = {
  type: 'normal' | 'limited'
  promotionId: string
  available?: string
  discountValue: number
  method: 'percentage' | 'nominal'
  skuId: string[]
  totalWithDiscount: number
  styles: ConfigLimitedOfpPromotions['configs']
}

export type PromotionParams = {
  productId: string | undefined
  skuId: string | undefined
  channelId: string | undefined
  sellerId?: string | undefined
  baseUrl: string
}

export type ConfigStorage = {
  remainingMillisecondsExpire: number
  value: Record<string, ConfigType>
}