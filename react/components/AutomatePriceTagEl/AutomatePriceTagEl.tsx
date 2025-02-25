import React, { useCallback, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import RenderCustomTags from "./RenderCustomTags/RenderCustomTags";

import { compareProductIdsInURL } from "./utils/compareProductIdsInURL";
import { ConfigGroupPromotions } from "../../typings/config";
import sleep from "../../helpers/sleep";
import useProductPromotionsTags from "../../hooks/useProductPromotionsTags";

import { useRenderSession } from "vtex.session-client";
import { useRuntime } from "vtex.render-runtime";

import { useIntl } from "react-intl";
import { formatCurrency } from "vtex.format-currency";

interface AutomatePriceTagElProps {
    visibility: "pdp" | "productSummary";
    container: string;
    positionTop: PositionProps;
    positionCenter: PositionProps;
    positionBottom: PositionProps;
    algoliaProductContext?: AlgoliaProductContext;
}

type PositionProps = {
    insert: "before" | "after";
    class: string;
};

const AutomatePriceTagEl = ({
    visibility,
    container,
    positionTop,
    positionCenter,
    positionBottom,
    algoliaProductContext,
}: AutomatePriceTagElProps) => {
    const { session } = useRenderSession();
    const { account, workspace, culture } = useRuntime();
    const intl = useIntl();

    const { filteredTags, hrefProduct, skuId } = useProductPromotionsTags(
        session,
        account,
        workspace,
        algoliaProductContext
    );

    const originalContainer = useRef<HTMLDivElement>(null);

    const formatTotalCalculation = (configGroupPromotions: ConfigGroupPromotions[]) => {
        const item = configGroupPromotions?.map((promotion) => {
            const totalCalculationValue = promotion?.totalCalculation / 100 || 0;
            const formattedTotalCalculation = formatCurrency({ intl, culture, value: totalCalculationValue });

            return {
                ...promotion,
                totalCalculation: formattedTotalCalculation,
            };
        });
        return item;
    };

    const insertTags = async (
        tagArray: ConfigGroupPromotions[],
        containerSelector: string,
        positionClass: PositionProps,
        renderedTags: string,
        tagsNotRendered: string
    ) => {
        const containers = document.querySelectorAll(containerSelector);

        if (!containers) {
            return;
        }

        containers.forEach((container: Element) => {
            if (container instanceof HTMLAnchorElement && visibility === "productSummary") {
                if (!compareProductIdsInURL(hrefProduct, container.href)) {
                    return;
                }
            }

            if (container.querySelector(`.${renderedTags}`)) {
                const removeNotTag = container.querySelector(`.${tagsNotRendered}`);

                if (removeNotTag) {
                    removeNotTag.remove();
                }

                return;
            }

            const elementWithPositionClass = container.querySelector(positionClass.class);

            if (elementWithPositionClass) {
                if (tagArray.length === 0 && visibility === "productSummary") {
                    if (container.querySelector(`.${tagsNotRendered}`)) {
                        return;
                    }
                    const renderContainer = document.createElement("div");
                    renderContainer.classList.add(tagsNotRendered);
                    if (positionClass.insert === "before") {
                        elementWithPositionClass?.parentNode?.insertBefore(renderContainer, elementWithPositionClass);
                    } else {
                        elementWithPositionClass?.parentNode?.insertBefore(
                            renderContainer,
                            elementWithPositionClass.nextSibling
                        );
                    }
                    return;
                }

                if (tagArray.length === 0) {
                    return;
                }

                const renderContainer = document.createElement("div");
                renderContainer.classList.add(renderedTags);

                if (positionClass.insert === "before") {
                    elementWithPositionClass?.parentNode?.insertBefore(renderContainer, elementWithPositionClass);
                } else {
                    elementWithPositionClass?.parentNode?.insertBefore(
                        renderContainer,
                        elementWithPositionClass.nextSibling
                    );
                }

                ReactDOM.render(<RenderCustomTags tagArray={tagArray} visibility={visibility} />, renderContainer);
            }
        });
    };

    const addTags = useCallback(async () => {
        if (!filteredTags) return;

        insertTags(
            formatTotalCalculation(filteredTags?.top),
            container,
            positionTop,
            "tag-automate-price-top",
            "tag-top-not-rendered"
        );
        insertTags(
            formatTotalCalculation(filteredTags?.center),
            container,
            positionCenter,
            "tag-automate-price-center",
            "tag-center-not-rendered"
        );
        insertTags(
            formatTotalCalculation(filteredTags?.bottom),
            container,
            positionBottom,
            "tag-automate-price-bottom",
            "tag-bottom-rendered"
        );
    }, [filteredTags, container, positionTop, positionCenter, positionBottom]);

    useEffect(() => {
        addTags();
        sleep(500).then(addTags);
    }, [addTags, skuId, originalContainer.current]);

    useEffect(() => {
        if (originalContainer.current?.parentElement) {
            originalContainer.current.parentElement.style.height = "";
        }
    }, [originalContainer]);

    return <div ref={originalContainer}></div>;
};

export default AutomatePriceTagEl;
