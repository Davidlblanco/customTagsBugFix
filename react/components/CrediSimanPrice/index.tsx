import React, { useState, useEffect } from "react";
import { FormattedCurrency } from "vtex.format-currency";
import { useProduct } from "vtex.product-context";
import { CredisimanType } from "./Types/credisimanTypes";
import { GetCrediSimanProductData } from "./Logic/logic";
// import CrediSimanSVG from "./Assets/CredisimanImage";
import styles from "./CrediSimanPrice.css";
import GetPageType from "../../utils/getPageType";
import { useRenderSession } from "vtex.session-client";

const CrediSimanPrice: StorefrontFunctionComponent = () => {
    const productContext = useProduct();
    const pageType = GetPageType();
    const skuId = productContext?.selectedItem?.itemId;
    const productId = productContext?.product?.productId;

    console.log(productContext);

    const [productData, setProductData] = useState<CredisimanType>();

    const { session } = useRenderSession();

    const sallesChannelId = session?.namespaces?.store?.channel?.value;
    // const countryAccount: string =
    //     session?.namespaces?.account?.accountName?.value ?? "siman";

    const IsProductPage = (): boolean => {
        return pageType === "product";
    };

    useEffect(() => {
        const fetchData = async () => {
            if (sallesChannelId) {
                const result = await GetCrediSimanProductData(
                    productId,
                    skuId,
                    sallesChannelId,
                    productContext
                );
                setProductData(result);
            }
        };

        fetchData();
    }, [productId, skuId, sallesChannelId]);

    if (!productData) return <></>;

    const shouldShowTag = productData?.discountValue > 0;

    return (
        <div
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
            {shouldShowTag && (
                <div className={styles.customCrediSimanTag}>
                    <span className={styles.customCrediSimanTagText}>
                        -{productData?.discountValue}%
                    </span>
                </div>
            )}
            {/* <CrediSimanSVG countryAccount={countryAccount} /> */}
        </div>
    );
};

export { CrediSimanPrice };
