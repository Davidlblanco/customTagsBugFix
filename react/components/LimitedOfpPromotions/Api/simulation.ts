import axios from 'axios'

import type { ConfigType, PromotionParams } from '../Types/configType'

export const simulation = async (
  params: PromotionParams
): Promise<ConfigType | undefined> => {
  const { skuId, channelId, sellerId, baseUrl = '' } = params

  const url = `${baseUrl}/_v/limited-ofp-promotions/${skuId}/${channelId}/${sellerId}`

  try {
    const { data } = await axios.get(url)

    return data[0]
  } catch (error) {
    console.error(error)

    return undefined
  }
}