import React, { MouseEvent, useEffect, useState } from "react";

import { useProduct } from "vtex.product-context";
import { canUseDOM } from "vtex.render-runtime";

import { useQuickView } from "../../contexts/QuickViewContext";
import { QuickViewModal } from "./QuickViewModal";

import styles from "./styles.css";

interface QuickViewProps {
    children: React.ReactNode[];
}

export function QuickView({ children }: QuickViewProps) {
    const productContext = useProduct();
    const { categoryHasQuickview } = useQuickView();

    const [shouldShowQuickView, setShouldShowQuickView] = useState(false);

    useEffect(() => {
        if (shouldShowQuickView) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [shouldShowQuickView]);

    if (!productContext || !canUseDOM) return <></>;

    if (!categoryHasQuickview(productContext)) {
        return <>{children[3]}</>;
    }

    function handleOpenQuickview(e: MouseEvent) {
        e.preventDefault();
        e.stopPropagation();

        setShouldShowQuickView(true);
    }

    return (
        <>
            {
                productContext != null && productContext.product != null && productContext?.product.priceRange?.listPrice.highPrice !== 0 ? (
                    <button type="button" className={styles["quickview-open-button"]} onClick={handleOpenQuickview}>
                        Agregar al carrito
                    </button>)
                    : (<button type="button" className={styles["quickview-open-button"]} disabled={true}>
                        No Disponible
                    </button>)
            }

            {shouldShowQuickView && (
                <QuickViewModal
                    isOpen={shouldShowQuickView}
                    onOpenChange={(open) => setShouldShowQuickView(open)}
                    productContext={productContext}
                    components={{
                        images: children[0],
                        skuSelector: children[1],
                        addToCart: children[2],
                        tags: children[4],
                    }}
                />
            )}
        </>
    );
}
