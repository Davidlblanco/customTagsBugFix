import React, { MouseEvent, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link } from "vtex.render-runtime";

import LimitedPromotions from "../../LimitedPromotions/LimitedPromotions";
import { CrediSimanPrice } from "../../CrediSimanPrice";
import { QuickViewProductPrice } from "./components/ProductPrice";
import { Cuotas } from "../../Cuotas";

import { ProductContextState } from "vtex.product-context/react/ProductTypes";

import { SellerIcon } from "../assets/seller-icon";
import { XIcon } from "../assets/x-icon";
import { MoreIcon } from "../assets/more-icon";

import styles from "./styles.css";

interface QuickViewModalProps {
    components: {
        images: React.ReactNode;
        skuSelector: React.ReactNode;
        addToCart: React.ReactNode;
        tags: React.ReactNode;
    };
    productContext: Partial<ProductContextState>;
    onOpenChange: (open: boolean) => void;
    isOpen: boolean;
}

export function QuickViewModal({ components, productContext, onOpenChange, isOpen }: QuickViewModalProps) {
    const { images, skuSelector, addToCart, tags } = components;

    const product = productContext.product;

    function handleOnCloseModal(e: MouseEvent) {
        e.preventDefault();
        e.stopPropagation();
        onOpenChange(false);
    }

    function listenEvent(e: any) {
        if (e) {
            if (e?.data?.eventName === "vtex:cartChanged" || e?.data?.eventName === "vtex:addToCart") {
                setTimeout(() => {
                    onOpenChange(false);
                }, 1500);
            }
        }
    }

    useEffect(() => {
        window.addEventListener("message", listenEvent);
    }, []);

    return createPortal(
        <>
            {tags}
            <div
                className={`${styles["modal-overlay"]} ${isOpen ? styles.show : ""}`}
                id="quickview-modal"
                onClick={handleOnCloseModal}
                data-quickview-id={productContext.selectedItem?.itemId}
            />

            <div
                className={`${styles.modal} ${isOpen ? styles.show : ""}`}
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                }}
            >
                <div className={styles["modal__header"]}>
                    <span className={styles["modal__header-reference"]}>
                        <span className="ttu">{product?.brand}</span> Referencia: {product?.productReference}
                    </span>

                    <h2 className={styles["modal__header-product-name"]}>{product?.productName}</h2>

                    <div className={styles["modal__header-sold-by"]}>
                        <SellerIcon />

                        <span>
                            Vendido por{" "}
                            <span className={styles["modal__header-sold-by__name"]}>
                                {productContext.selectedItem?.sellers[0].sellerName}
                            </span>
                        </span>
                    </div>

                    <button type="button" className={styles["modal__header-close-modal"]} onClick={handleOnCloseModal}>
                        <XIcon />
                    </button>
                </div>

                <div className={styles["modal__content"]}>
                    <div className={styles["modal__content-images"]}>{images}</div>

                    <div className={styles["modal__content-info"]}>
                        <LimitedPromotions />
                        <CrediSimanPrice />

                        <QuickViewProductPrice />

                        <div className="mv5">
                            <Cuotas visibility="product-summary" />
                        </div>

                        {skuSelector}

                        <div className="mv5">
                            <span className={styles["modal__content-view-more-title"]}>Especificaciones</span>

                            <Link className={styles["modal__content-view-more"]} to={`/${product?.linkText}/p`}>
                                <MoreIcon />
                                Ver más detalles
                            </Link>
                        </div>

                        {addToCart}
                    </div>
                </div>
            </div>
        </>,
        document.body
    );
}
