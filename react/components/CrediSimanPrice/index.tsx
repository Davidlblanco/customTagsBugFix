import React, { useState, useEffect } from "react";
import { FormattedCurrency } from "vtex.format-currency";
import { useProduct } from "vtex.product-context";
import { ConfigGroup, CredisimanType } from "./Types/credisimanTypes";
import { GetCrediSimanProductData } from "./Logic/logic";
// import CrediSimanImage from "../../utils/CredisimanImage/CredisimanImage";
import styles from "./CrediSimanPrice.css";
// import GetPageType from "../../utils/getPageType";
import { useRenderSession } from "vtex.session-client";
import { handleCredisimanStyles } from "./utils/handleCredisimanStyles";

interface CredisimanPriceProps {
  isShelf?: boolean;
}

const CrediSimanPrice: StorefrontFunctionComponent<CredisimanPriceProps> = ({ children, isShelf }) => {
    const productContext = useProduct();
    // const pageType = GetPageType();
    const skuId = productContext?.selectedItem?.itemId;
    const productId = productContext?.product?.productId;

    const [productData, setProductData] = useState<CredisimanType>();
    const [credisimanTagStyles, setCredisimanTagStyles] = useState<ConfigGroup['configs']>();

    const { session } = useRenderSession();

    const sallesChannelId = session?.namespaces?.store?.channel?.value;
    // const countryAccount: string =
    //     session?.namespaces?.account?.accountName?.value ?? "siman";

    // const IsProductPage = (): boolean => {
    //     return pageType === "product";
    // };

    useEffect(() => {
        const fetchData = async () => {
            if (sallesChannelId) {
                const result = await GetCrediSimanProductData(
                    productId,
                    skuId,
                    sallesChannelId,
                    productContext
                );

                if (result?.promotionId) {
                  const styles = await handleCredisimanStyles(result?.promotionId)

                  setCredisimanTagStyles(styles)
                }

                setProductData(result);
            }
        };

        fetchData();

    }, [productId, skuId, sallesChannelId]);

    // if (!children) return <></>
    
    if (!productData) return (
      <div className={`${styles['tag-preview__price']} ${styles['no-promotion']}`}>
        {children}
      </div>
    );


    //const shouldShowTag = productData?.discountValue > 0;

    return (
          <div>
            <div className={styles['tag-preview__credisiman']}>
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
                  {productData?.discountValue}%
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

            <div
              className={`${styles['tag-preview__price-container']} ${
                isShelf ? styles.shelf : ''
              }`}
            >
              <div
                className={styles['tag-preview__price']}
                style={{
                  order: credisimanTagStyles?.viewFields.text.position === 'right' ? 1 : 2,
                }}
              >
                {children}
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
          </div>

          /* <div
              className={
                  IsProductPage()
                      ? styles.customCrediSimanContainer
                      : styles.customCrediSimanContainerCategory
              }
          >
              <span
                  className={
                      IsProductPage()
                          ? styles.customCrediSimanPriceProduct
                          : styles.customCredisimanPriceCategory
                  }
              >
                  <FormattedCurrency value={productData?.totalWithDiscount} />
              </span>
              {/* shouldShowTag && (
                  <div className={styles.customCrediSimanTag}>
                      <span className={styles.customCrediSimanTagText}>
                          -{productData?.discountValue}%
                      </span>
                  </div>
              )
          </div> */
    );
};

export { CrediSimanPrice };
