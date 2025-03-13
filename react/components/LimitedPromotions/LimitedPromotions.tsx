import React, { useState, useEffect } from "react";
import { useProduct } from "vtex.product-context";
import { useRenderSession } from "vtex.session-client";
import { useRuntime } from "vtex.render-runtime";

import { SkeletonLoading } from "./SkeletonLoading";
import type { CredisimanType } from "./Types/configCredisimanTypes";
import { GetCrediSimanProductData } from "./Logic/logic";

import styles from "./styles.css";

import { ConfigLimitedPromotions } from "./Types/limitedPromotions";
import generateBaseUrlToSv from "./utils/generateBaseUrlToSv";
import { GetPageType } from "./utils/getPageType";

interface LimitedPromotionsProps {
    algoliaProductContext?: AlgoliaProductContext;
}

const LimitedPromotions: StorefrontFunctionComponent<LimitedPromotionsProps> = ({ algoliaProductContext }) => {
    const productContext = useProduct();

    const skuId = productContext?.selectedItem?.itemId ?? algoliaProductContext?.selectedItem?.SkuId?.toString();
    const productId = productContext?.product?.productId ?? algoliaProductContext?.skuId?.toString();

    const [loading, setLoading] = useState(true);
    const [productData, setProductData] = useState<CredisimanType>();
    const [credisimanTagStyles, setCredisimanTagStyles] = useState<ConfigLimitedPromotions["configs"]>();

    const { session } = useRenderSession();
    const pageType = GetPageType();

    const sallesChannelId = session?.namespaces?.store?.channel?.value;

    const { account, workspace } = useRuntime();
    const baseUrl = generateBaseUrlToSv(account, workspace);

    useEffect(() => {
        const fetchData = async () => {
            // eslint-disable-next-line vtex/prefer-early-return
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
                setLoading(false);
            }
        };

        fetchData();

        return () => {
            setProductData(undefined);
            setCredisimanTagStyles(undefined);
        };
    }, [productId, skuId, sallesChannelId]);

    if (loading) return <SkeletonLoading />;

    if (!productData) return <></>;

    if (Number(productData.available) <= 0) return <></>;

    return (
        <div
            className={`flex flex-column ${pageType === "product" ? "mb3" : ""}`}
            style={{
                gap: "5px",
            }}
        >
            <div
                className={styles["tag-preview__credisiman"]}
                style={{
                    justifyContent: credisimanTagStyles?.text.position === "left" ? "flex-start" : "flex-end",
                }}
            >
                {credisimanTagStyles?.text.active && (
                    <p
                        className={styles["tag-preview__info-text"]}
                        style={{
                            ...credisimanTagStyles?.text.styles,
                        }}
                    >
                        {credisimanTagStyles?.text.phrase} {productData.available}/u
                    </p>
                )}
            </div>
        </div>
    );
};

export default LimitedPromotions;
