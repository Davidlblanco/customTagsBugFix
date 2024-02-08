import React, { useState, useEffect } from "react";
import { FormattedCurrency } from "vtex.format-currency";
import { useProduct } from "vtex.product-context";
import { CredisimanType } from "./Types/credisimanTypes";
import { GetCrediSimanProductData } from "./Logic/logic";
import CrediSimanSVG from "./Assets/credisiman-sv";
import styles from "./CrediSimanPrice.css";
import GetPageType from "../../utils/getPageType";

const CrediSimanPrice: StorefrontFunctionComponent = () => {
   const productContext = useProduct();
   const pageType = GetPageType();
   const skuId = productContext?.selectedItem?.itemId;
   const productId = productContext?.product?.productId;
   const sellerId = productContext?.selectedItem?.sellers[0].sellerId;

   const [productData, setProductData] = useState<CredisimanType>();

   const IsProductPage = (): boolean => {
      return pageType === "product";
   };

   useEffect(() => {
      const fetchData = async () => {
         const result = await GetCrediSimanProductData(productId, skuId, sellerId);
         setProductData(result);
      };

      fetchData();
   }, [productId, skuId, sellerId]);

   if (!productData) return <></>;

   const shouldShowTag = productData?.discountValue > 0;

   console.log("shouldShowTag: ", shouldShowTag)

   return (
      <div className={IsProductPage() ? styles.customCrediSimanContainer : styles.customCrediSimanContainerCategory}>
         <span className={IsProductPage() ? styles.customCrediSimanPriceProduct : styles.customCredisimanPriceCategory}>
            <FormattedCurrency value={productData?.totalWithDiscount} />
         </span>
         {shouldShowTag ? <div className={styles.customCrediSimanTag}>
            <span className={styles.customCrediSimanTagText}>-{productData?.discountValue}%</span>
         </div> : <> </>}
         <CrediSimanSVG />
      </div>
   );
};

export { CrediSimanPrice };
