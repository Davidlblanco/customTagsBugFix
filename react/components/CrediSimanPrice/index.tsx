import React, { useState, useEffect } from "react";
import { FormattedCurrency } from "vtex.format-currency";
import { useProduct } from "vtex.product-context";
import { ConfigGroup, CredisimanType } from "./Types/credisimanTypes";
import { GetCrediSimanProductData } from "./Logic/logic";
import getCredisimanImageSource from "../../utils/getCredisimanImageSource";
import GetPageType from "../../utils/getPageType";
import { useRenderSession } from "vtex.session-client";
import styles from "./CrediSimanPrice.css";
import { calculateDiscountPercentage } from "./utils/calculateDiscontPercentage";
import { useRuntime } from "vtex.render-runtime";
import generateBaseUrlToSv from "../../utils/generateBaseUrlToSv";


interface CredisimanPriceProps {
  isShelf?: boolean;
  algoliaProductContext?: AlgoliaProductContext
}

const CrediSimanPrice: StorefrontFunctionComponent<CredisimanPriceProps> = ({ isShelf, algoliaProductContext }) => {
  const productContext = useProduct();

  const pageType = GetPageType();
  const skuId = productContext?.selectedItem?.itemId ?? algoliaProductContext?.selectedItem?.SkuId?.toString();
  const productId = productContext?.product?.productId ?? algoliaProductContext?.skuId?.toString();

  const [productData, setProductData] = useState<CredisimanType>();
  const [credisimanTagStyles, setCredisimanTagStyles] = useState<ConfigGroup['configs']>();

  const { session } = useRenderSession();

  const sallesChannelId = session?.namespaces?.store?.channel?.value;

  const { account, workspace } = useRuntime();
  const baseUrl = generateBaseUrlToSv(account, workspace);

  useEffect(() => {
    const fetchData = async () => {
      if (sallesChannelId) {
        const result = await GetCrediSimanProductData(
          productId,
          skuId,
          sallesChannelId,
          productContext,
          algoliaProductContext,
          baseUrl
        );

        const styleSettings = result?.styles ?? null;
        if (styleSettings) setCredisimanTagStyles(styleSettings);

        setProductData(result);
      }
    };

    fetchData();

  }, [productId, skuId, sallesChannelId]);

  if (!productData) return <></>

  return (
    <div
      className={`
          ${styles['tag-preview__credisiman-container']} 
          ${isShelf ? styles.shelf : ''}
          ${pageType === 'product' && !isShelf ? styles.pdp : ''}
        `}
    >
      <div
        className={styles['tag-preview__credisiman']}
        style={{
          fontSize: `${credisimanTagStyles?.tagStyles.fontSize}`,
        }}
      >
        {credisimanTagStyles?.viewFields.price.active && (
          <span
            className={styles['tag-preview__credisiman-price']}
            style={{
              color: credisimanTagStyles?.viewFields.price.color,
              fontSize: `1em`,
              order: credisimanTagStyles?.image.position === 'right' ? 2 : 3,
            }}
          >
            <FormattedCurrency value={productData?.totalWithDiscount} />
          </span>
        )}

        {credisimanTagStyles?.viewFields.porcentage && (
          <span
            className={styles['tag-preview__credisiman-porcentage']}
            style={{
              borderRadius: `${credisimanTagStyles?.tagStyles.borderRadius}px`,
              borderColor: credisimanTagStyles?.tagStyles.borderColor,
              color: credisimanTagStyles?.tagStyles.color,
              backgroundColor: credisimanTagStyles?.tagStyles.backgroundColor,
              order: credisimanTagStyles?.image.position === 'right' ? 3 : 4,
              fontSize: `clamp(12px, 0.5em, 24px)`,
            }}
          >
            {calculateDiscountPercentage({
              type: credisimanTagStyles?.percentageBasis,
              totalWithCredisiman: productData?.totalWithDiscount,
              listPrice: productContext?.selectedItem?.sellers[0]?.commertialOffer.ListPrice ?? 0,
              discount: productData?.discountValue ?? 0,
            })}
          </span>
        )}

        {credisimanTagStyles?.viewFields.img && (
          <img
            src={
              credisimanTagStyles?.image.src.length
                ? credisimanTagStyles?.image.src
                : getCredisimanImageSource(account)
            }
            alt="Credisiman Tag"
            width={24}
            height={24}
            style={{
              order: credisimanTagStyles?.image.position === 'right' ? 4 : 2,
            }}
          />
        )}

        {credisimanTagStyles?.viewFields.text.active && (
          <p
            className={styles['tag-preview__info-text']}
            style={{
              color: credisimanTagStyles?.viewFields.text.color,
              order: credisimanTagStyles?.viewFields.text.position === 'right' ? 5 : 1,
              fontSize: `${credisimanTagStyles?.tagStyles.fontSize}`,
            }}
          >
            {credisimanTagStyles?.viewFields.text.phrase}
          </p>
        )}
      </div>
    </div>
  );
};

export { CrediSimanPrice };