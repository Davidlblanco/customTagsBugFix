import type { ProductContextState } from 'vtex.product-context/react/ProductContextProvider'

import type {
  ConfigType,
  ConfigStorage,
} from '../Types/configType'
import { getWithExpiry, setWithExpiry } from '../Cache/configCache'
import { minutesToExpiryCache } from '../Config/constants'
import { simulation } from '../Api/simulation'

const CalculateDiscount = (
  productData: ConfigType,
  productContext: Partial<ProductContextState> | undefined,
  algoliaProductContext: Partial<AlgoliaProductContext> | undefined
) => {
  const { discountValue, method, totalWithDiscount } = productData
  const productPrice =
    productContext?.selectedItem?.sellers[0]?.commertialOffer.ListPrice ?? algoliaProductContext?.price?.listPrice;

  if (method === 'nominal' && discountValue !== 0) {
    const totalValue = totalWithDiscount + discountValue
    const value = 1 - totalWithDiscount / totalValue

    productData.discountValue = Math.abs(Math.round(value * 100))
  } else if (discountValue === 0) {
    if (productPrice) {
      const percent = totalWithDiscount / productPrice

      productData.discountValue = Math.abs(Math.round((1 - percent) * 100))
    }
  }
}

const fetchProductData = async ({
  productId,
  skuId,
  channelId,
  sellerId,
  baseUrl
}: {
  productId: string | undefined
  skuId: string | undefined
  channelId: string | undefined
  sellerId: string | undefined
  baseUrl: string
}) => {
  const data = await simulation({
    productId,
    skuId,
    channelId,
    sellerId,
    baseUrl
  })

  return data
}

let mutex = false

export const GetProductData = async (
  productId: string | undefined,
  skuId: string | undefined,
  channelId: string | undefined,
  productContext: Partial<ProductContextState> | undefined,
  algoliaProductContext: Partial<AlgoliaProductContext> | undefined,
  baseUrl: string
  // eslint-disable-next-line max-params
): Promise<ConfigType | undefined> => {
  while (mutex) {
    // eslint-disable-next-line no-await-in-loop
    await new Promise((resolve) => setTimeout(resolve, 10))
  }

  mutex = true

  const configStorage: ConfigStorage | undefined =
    getWithExpiry('limited-ofp-promotions')

  const allProductsData = configStorage?.value ?? {}
  const productDataInCache = allProductsData[skuId ?? '']
  const sellerId = productContext?.selectedItem?.sellers[0]?.sellerId || algoliaProductContext?.items?.[0]?.sellers?.[0]?.sellerId

  if (!productDataInCache) {
    const newProductData = await fetchProductData({
      productId,
      skuId,
      channelId,
      sellerId,
      baseUrl
    })

    if (newProductData) {
      CalculateDiscount(newProductData, productContext, algoliaProductContext)
      allProductsData[skuId ?? ''] = newProductData

      const expiryTime =
        configStorage?.remainingMillisecondsExpire ??
        minutesToExpiryCache * 60 * 1000

      setWithExpiry('limited-ofp-promotions', allProductsData, expiryTime)

      mutex = false

      return newProductData // Return the new product data from the API
    }
  } else {
    mutex = false

    return productDataInCache // Return the product data from the cache instead of fetching it from the API
  }

  mutex = false

  return undefined
}