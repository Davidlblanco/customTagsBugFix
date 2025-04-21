import React, { useCallback, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import RenderCustomTags from "./components/RenderCustomTags/RenderCustomTags";
import RenderTagsInsignia from "./components/RenderTagsInsignia/RenderTagsInsignia";
import useProductTags from "../../hooks/useProductTags";
import { compareProductIdsInURL } from "./utils/compareProductIdsInURL";
import { ConfigGroup } from "../../typings/config";
import sleep from "../../helpers/sleep";
import { waitForEl } from "./utils/waitForEl";

interface CustomTagsElProps {
    visibility: "pdp" | "productSummary";
    container: string;
    positionTop: PositionProps;
    positionCenter: PositionProps;
    positionBottom: PositionProps;
    containerInsignia?: string;
    positionInsignia: PositionProps;
    algoliaProductContext?: AlgoliaProductContext | undefined;
}

type PositionProps = {
    insert: "before" | "after";
    class: string;
};

const CustomTagsEl = ({
    algoliaProductContext,
    visibility,
    container,
    positionTop,
    positionCenter,
    positionBottom,
    containerInsignia,
    positionInsignia,
}: CustomTagsElProps) => {
    const { filteredTags, hrefProduct, skuId } = useProductTags(algoliaProductContext);
    const originalContainer = useRef<HTMLDivElement>(null);

    async function removeTags(containerSelector: string, renderedTags: string) {
        await waitForEl(`${containerSelector}`, 100, false, 1000);

        const containers = document.querySelectorAll(containerSelector);

        if (!containers) {
            return;
        }

        containers.forEach((container: Element) => {
            const removeTag = container.querySelector(`.${renderedTags}`);
            removeTag?.remove();
        });
    }

    const insertTags = async (
        tagArray: ConfigGroup[],
        containerSelector: string,
        positionClass: PositionProps,
        renderedTags: string,
        tagsNotRendered: string,
        isCustomTag: boolean
    ) => {
        await waitForEl(`${containerSelector}`, 5000, false, 1000);

        const containers = document.querySelectorAll(containerSelector);

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

                const tags = isCustomTag ? (
                    <RenderCustomTags tagArray={tagArray} visibility={visibility} />
                ) : (
                    <RenderTagsInsignia tagArray={tagArray} visibility={visibility} />
                );

                ReactDOM.render(<>{tags}</>, renderContainer);
            }
        });
    };

    const addTags = useCallback(async () => {
        if (!filteredTags) return;
        const containerInsigniaValid = containerInsignia ?? container;

        insertTags(filteredTags.top, container, positionTop, "rendered-tag-top", "tag-top-not-rendered", true);
        insertTags(
            filteredTags.center,
            container,
            positionCenter,
            "rendered-tag-center",
            "tag-center-not-rendered",
            true
        );
        insertTags(
            filteredTags.bottom,
            container,
            positionBottom,
            "rendered-tag-bottom",
            "tag-bottom-not-rendered",
            true
        );
        insertTags(
            filteredTags.tagInsignia,
            containerInsigniaValid,
            positionInsignia,
            "rendered-tag-insignia",
            "tag-insignia-not-rendered",
            false
        );
    }, [filteredTags, container, positionTop, positionCenter, positionBottom, containerInsignia, positionInsignia]);

    useEffect(() => {
        addTags();
        sleep(2000).then(addTags);
    }, [filteredTags]);

    useEffect(() => {
        removeTags(container, "rendered-tag-top");
        removeTags(container, "rendered-tag-center");
        removeTags(container, "rendered-tag-bottom");
        removeTags(container, "rendered-tag-insignia");
    }, [skuId]);

    useEffect(() => {
        const time = setTimeout(() => {
            addTags();
            sleep(2000).then(addTags);
        }, 1000);

        return () => {
            clearTimeout(time);
        };
    }, []);

    useEffect(() => {
        if (originalContainer.current?.parentElement) {
            originalContainer.current.parentElement.style.height = "";
        }
    }, [originalContainer]);

    return <div ref={originalContainer}></div>;
};

export default CustomTagsEl;
