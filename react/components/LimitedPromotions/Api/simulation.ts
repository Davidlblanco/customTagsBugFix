import axios from 'axios'

import type { CredisimanType, PromotionParams } from '../Types/configCredisimanTypes'

export const simulation = async (
  params: PromotionParams
): Promise<CredisimanType | undefined> => {
  const { skuId, channelId, sellerId, baseUrl = '' } = params

  const url = `${baseUrl}/_v/limited-promotions/${skuId}/${channelId}/${sellerId}`

  try {
    const { data } = await axios.get(url)

    return data[0]
  } catch (error) {
    console.error(error)

    return undefined
  }
}
