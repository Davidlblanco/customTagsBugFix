import React, { useState, useEffect } from 'react'
import { useProduct } from 'vtex.product-context'
import { useRenderSession } from 'vtex.session-client'
import { FormattedCurrency } from 'vtex.format-currency'
import { useRuntime } from 'vtex.render-runtime'

import { SkeletonLoading } from './SkeletonLoading'
import type { CredisimanType } from './Types/configCredisimanTypes'
import { GetCrediSimanProductData } from './Logic/logic'

import styles from './styles.css'

import { ConfigLimitedPromotions } from './Types/limitedPromotions'
import generateBaseUrlToSv from './utils/generateBaseUrlToSv'
import { GetPageType } from './utils/getPageType'

const LimitedPromotions = () => {
  const productContext = useProduct()

  const skuId = productContext?.selectedItem?.itemId
  const productId = productContext?.product?.productId

  const [loading, setLoading] = useState(true)
  const [productData, setProductData] = useState<CredisimanType>()
  const [credisimanTagStyles, setCredisimanTagStyles] =
    useState<ConfigLimitedPromotions['configs']>()

  console.log('credisimanTagStyles', credisimanTagStyles)

  const { session } = useRenderSession()
  const pageType = GetPageType()

  const sallesChannelId = session?.namespaces?.store?.channel?.value

  const { account, workspace } = useRuntime()
  const baseUrl = generateBaseUrlToSv(account, workspace)

  useEffect(() => {
    const fetchData = async () => {
      // eslint-disable-next-line vtex/prefer-early-return
      if (sallesChannelId) {
        const result = await GetCrediSimanProductData(
          productId,
          skuId,
          sallesChannelId,
          productContext,
          baseUrl
        )

        const styleSettings = result?.styles ?? null

        if (styleSettings) setCredisimanTagStyles(styleSettings)

        setProductData(result)
        setLoading(false)
      }
    }

    fetchData()

    return () => {
      setProductData(undefined)
      setCredisimanTagStyles(undefined)
    }
  }, [productId, skuId, sallesChannelId])

  if (loading) return <SkeletonLoading />

  if (!productData) return <></>

  if (Number(productData.available) <= 0) return <></>

  return (
    <div
      className={`flex flex-column ${pageType === 'product' ? 'mb3' : ''}`}
      style={{
        gap: '5px',
      }}
    >
      <div
        className={styles['tag-preview__credisiman']}
        style={{
          justifyContent:
            credisimanTagStyles?.text.position === 'left'
              ? 'flex-start'
              : 'flex-end',
        }}
      >
        {credisimanTagStyles?.text.active && (
          <p
            className={styles['tag-preview__info-text']}
            style={{
              ...credisimanTagStyles?.text.styles,
            }}
          >
            {credisimanTagStyles?.text.phrase} {productData.available}x
          </p>
        )}
      </div>

      <div className={styles['tag-preview__credisiman']}>
        <span className={styles['tag-preview__credisiman_limited-price']}>
          <FormattedCurrency value={productData?.totalWithDiscount} />
        </span>

        <span className={styles['tag-preview__credisiman_limited-porcentage']}>
          -{productData.discountValue}%
        </span>

        <img
          src="https://simanqa.vtexassets.com/assets/simanqa.file-manager/images/visa-tag___bbbaf9ca29725b058b26414be9398435.svg"
          alt="Credisiman Tag"
          width={24}
          height={24}
        />
      </div>
    </div>
  )
}

export { LimitedPromotions };