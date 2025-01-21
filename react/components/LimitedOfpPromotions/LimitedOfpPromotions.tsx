import React, { useState, useEffect } from "react";
import { useProduct } from "vtex.product-context";
import { useRenderSession } from "vtex.session-client";

import { SkeletonLoading } from "./SkeletonLoading";
import type { ConfigType } from "./Types/configType";
import { GetProductData } from "./Logic/logic";

import styles from "./styles.css";

import { ConfigLimitedOfpPromotions } from "./Types/limitedOfpPromotions";
import { GetPageType } from "./utils/getPageType";
import generateBaseUrlToSv from "../../utils/generateBaseUrlToSv";
import { useRuntime } from "vtex.render-runtime";

const LimitedOfpPromotions = () => {
    const productContext = useProduct();

    const skuId = productContext?.selectedItem?.itemId;
    const productId = productContext?.product?.productId;

    const [loading, setLoading] = useState(true);
    const [productData, setProductData] = useState<ConfigType>();
    const [tagStyles, setTagStyles] = useState<ConfigLimitedOfpPromotions["configs"]>();

    const { session } = useRenderSession();
    const pageType = GetPageType();

    const { account, workspace } = useRuntime()
    const sallesChannelId = session?.namespaces?.store?.channel?.value;
    const baseUrl = generateBaseUrlToSv(account, workspace)

    useEffect(() => {
        const fetchData = async () => {
            // eslint-disable-next-line vtex/prefer-early-return
            if (sallesChannelId) {
                const result = await GetProductData(
                    productId,
                    skuId,
                    sallesChannelId,
                    productContext,
                    baseUrl
                );

                const styleSettings = result?.styles ?? null;

                if (styleSettings) setTagStyles(styleSettings);

                setProductData(result);
                setLoading(false);
            }
        };

        fetchData();

        return () => {
            setProductData(undefined);
            setTagStyles(undefined);
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
                className={styles["tag-preview__config"]}
                style={{
                    justifyContent: tagStyles?.text.position === "left" ? "flex-start" : "flex-end",
                }}
            >
                {tagStyles?.text.active && (
                    <p
                        className={styles["tag-preview__info-text"]}
                        style={{
                            ...tagStyles?.text.styles,
                        }}
                    >
                        {tagStyles?.text.phrase} x{productData.available}
                    </p>
                )}
            </div>
        </div>
    );
};

export default LimitedOfpPromotions;