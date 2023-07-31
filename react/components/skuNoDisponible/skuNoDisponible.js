
import React, { useEffect } from "react";

const skuNoDisponible = () => {
    useEffect(
        () => {
            const container = document.getElementsByClassName('vtex-store-components-3-x-skuSelectorOptionsList') ?? false;
            // I not find a sku selector
            if (!container) {
                return false;
            }

            //Map the children
            Array.from(container[0].children).map((child, index) => {
                // Evaluation if its available
                const isUnavailable = child.querySelector('.vtex-store-components-3-x-valueWrapper--unavailable');

                if (child.classList.contains("vtex-store-components-3-x-seeMoreButton")) {
                    child.style.order = container[0].children.length + 1;
                }

                if (isUnavailable != null) {
                    // Add a order to the unavailable items
                    child.style.order = index + 1;
                }
            });
            //Add classes to modify the container behavior in order to have the unavailable items at the beginning
            //container[0].style.flexFlow = 'row-reverse wrap-reverse';
            // container[0].style.justifyContent = 'flex-end';
        }, []
    )
    return (
        <div></div>
    )
}
export default skuNoDisponible;

