import React from "react";
import { useProduct } from "vtex.product-context";

import { CrediSimanPrice } from "../../CrediSimanPrice";
import { QuickViewProductPrice } from "./components/ProductPrice";

import { SellerIcon } from "../assets/seller-icon";
import { XIcon } from "../assets/x-icon";

import styles from './styles.css'
import { Cuotas } from "../../Cuotas";
import { Link } from "vtex.render-runtime";
import { MoreIcon } from "../assets/more-icon";

interface QuickViewModalProps {
  images: React.ReactNode
  skuSelector: React.ReactNode
  addToCart: React.ReactNode
}

// interface QuickViewModalProps {
//   modal: {
//     open: boolean
//     onOpenChange: (open: boolean) => void;
//   }
// }

export function QuickViewModal({ images, skuSelector, addToCart }: QuickViewModalProps) {
  const productContext = useProduct()

  if (!productContext) return <></>

  const product = productContext.product

  return (
    <>
      <div className={styles['modal-overlay']} />

      <div className={styles.modal}>
        <div className={styles['modal__header']}>
          <span className={styles['modal__header-reference']}>
            <span className="ttu">{product?.brand}</span>{' '}
            Referencia: {product?.productReference}
          </span>

          <h2 className={styles['modal__header-product-name']}>
            {productContext.product?.productName}
          </h2>

          <div className={styles['modal__header-sold-by']}>
            <SellerIcon />

            <span>
              Vendido por{' '}
              <span className={styles['modal__header-sold-by__name']}>
                {productContext.selectedItem?.sellers[0].sellerName}
              </span>
            </span>
          </div>

          <button type="button" className={styles['modal__header-close-modal']}>
            <XIcon />
          </button>
        </div>

        <div className={styles['modal__content']}>
          <div className={styles['modal__content-images']}>
            {images}
          </div>

          <div className={styles['modal__content-info']}>
            <CrediSimanPrice />

            <QuickViewProductPrice 
              sellingPrice={product?.priceRange.sellingPrice.highPrice ?? 0} 
              listPrice={product?.priceRange.listPrice.highPrice ?? 0}
            />

            <div className="mv5">
              <Cuotas visibility="product-summary" />
            </div>
            
            {skuSelector}

            <div className="mv5">
              <span className={styles['modal__content-view-more-title']}>
                Especificaciones
              </span>

              <Link className={styles['modal__content-view-more']}>
                <MoreIcon />
                Ver más detalles
              </Link>
            </div>

            {addToCart}
          </div>
        </div>
      </div>
    </>
  )
}