import React, { useState, useEffect } from "react";
import { FormattedCurrency } from "vtex.format-currency";
import { useProduct } from "vtex.product-context";
import { ConfigGroup, CredisimanType } from "./Types/credisimanTypes";
import { GetCrediSimanProductData } from "./Logic/logic";
// import CrediSimanImage from "../../utils/CredisimanImage/CredisimanImage";
import GetPageType from "../../utils/getPageType";
import { useRenderSession } from "vtex.session-client";
import styles from "./CrediSimanPrice.css";
import { calculateDiscountPercentage } from "./utils/calculateDiscontPercentage";

interface CredisimanPriceProps {
  isShelf?: boolean;
}

const CrediSimanPrice: StorefrontFunctionComponent<CredisimanPriceProps> = ({ isShelf }) => {
    const productContext = useProduct();

    const pageType = GetPageType();
    const skuId = productContext?.selectedItem?.itemId;
    const productId = productContext?.product?.productId;

    const [productData, setProductData] = useState<CredisimanType>();
    const [credisimanTagStyles, setCredisimanTagStyles] = useState<ConfigGroup['configs']>();

    const { session } = useRenderSession();

    const sallesChannelId = session?.namespaces?.store?.channel?.value;

    useEffect(() => {
        const fetchData = async () => {
            if (sallesChannelId) {
                const result = await GetCrediSimanProductData(
                    productId,
                    skuId,
                    sallesChannelId,
                    productContext
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
            order: credisimanTagStyles?.viewFields.text.position === 'right' ? 1 : 2,
          }}
        >
          {credisimanTagStyles?.viewFields.price.active && (
            <span
              className={styles['tag-preview__credisiman-price']}
              style={{
                color: credisimanTagStyles?.viewFields.price.color,
                fontSize: `${credisimanTagStyles?.tagStyles.fontSize}px`,
                order: credisimanTagStyles?.image.position === 'right' ? 1 : 2,
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
                order: credisimanTagStyles?.image.position === 'right' ? 2 : 3,
              }}
            >
              {calculateDiscountPercentage({ 
                type: credisimanTagStyles?.percentageBasis,
                totalWithCredisiman: productData?.totalWithDiscount,
                listPrice: productContext?.product?.items[0].sellers[0].commertialOffer.ListPrice,
                discount: productData.discountValue
              })}
            </span>
          )}

          {credisimanTagStyles?.viewFields.img && (
            <img
              src={
                credisimanTagStyles?.image.src.length
                  ? credisimanTagStyles?.image.src
                  : 'https://simanqa.vtexassets.com/assets/simanqa.file-manager/images/visa-tag___bbbaf9ca29725b058b26414be9398435.svg'
              }
              alt="Credisiman Tag"
              width={24}
              height={24}
              style={{
                order: credisimanTagStyles?.image.position === 'right' ? 3 : 1,
              }}
            />
          )}
        </div>

        {credisimanTagStyles?.viewFields.text.active && (
          <p
            className={styles['tag-preview__info-text']}
            style={{
              color: credisimanTagStyles?.viewFields.text.color,
              order: credisimanTagStyles?.viewFields.text.position === 'right' ? 2 : 1,
            }}
          >
            {credisimanTagStyles?.viewFields.text.phrase}
          </p>
        )}
      </div>
    );
};

export { CrediSimanPrice };
