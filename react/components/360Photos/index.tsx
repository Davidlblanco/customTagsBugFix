import axios from "axios";
import React, { useEffect, useState } from "react";
import { PreviewImages360 } from "./PreviewImages";
import { useProduct } from "vtex.product-context";
import style from "./styles.module.css";
import Icon from "./Icons/Open360";

export interface ImagesProps {
   images: string;
   url: string;
}

export interface ImagesApiProps {
   active: boolean;
   childrenSkus: Array<{ skuId: string; active: boolean }>;
   id: string;
   images: Array<ImagesProps>;
   skuId: string;
   skuName: string;
}

export function Photos360() {
   const [imageInfoApi, setImageInfoApi] = useState<{
      active: boolean;
      images: Array<ImagesProps>;
      childrenSkus: Array<{ skuId: string; active: boolean }>;
      skuSelected?: { skuId: string; active: boolean };
      allImages?: ImagesApiProps[];
      standardSku?: string;
   }>({
      active: false,
      images: [],
      childrenSkus: [],
      allImages: [],
   });
   const [loading, setLoading] = useState<boolean>(false);
   const [visibleImgs, setVisibleImgs] = useState<boolean>(false);

   const productCtx = useProduct();

   if (!productCtx) return <></>;

   async function getImgs() {
      setLoading(true);

      try {
         const { data } = await axios(`/_v/admin-360-photos/config`);
         const imgsApi = data as ImagesApiProps[];

         let filterOfSkuId = imgsApi.filter((img) => img.skuId === productCtx?.selectedItem?.itemId);
         if(!filterOfSkuId.length) filterOfSkuId = imgsApi.filter((img) => img.childrenSkus?.find(children => children.skuId == productCtx?.selectedItem?.itemId && children.active));
         const skuChildrenId = filterOfSkuId?.map((img) => img?.childrenSkus)[0];

         setImageInfoApi({
            active: filterOfSkuId.map((img) => img.active)[0],
            images: filterOfSkuId.map((img) => img.images)[0],
            childrenSkus: skuChildrenId,
            skuSelected: {
               skuId: productCtx?.selectedItem?.itemId ?? "",
               active: true,
            },
            allImages: imgsApi,
            standardSku: productCtx?.selectedItem?.itemId,
         });
      } catch (error) {
         console.warn("API 360:", error);
         setLoading(false);
      }

      setLoading(false);
   }

   useEffect(() => {
      getImgs();
   }, []);

   useEffect(() => {
      const filterOfProductSelected = imageInfoApi.allImages?.filter(
         (sku) => sku.skuId === productCtx.selectedItem?.itemId
      );
      const returnToDefaultSku = imageInfoApi.allImages?.filter((img) => img.skuId === imageInfoApi.standardSku);

      if (filterOfProductSelected?.length) {
         setImageInfoApi({
            ...imageInfoApi,
            images: filterOfProductSelected.map((img) => img.images)[0],
            active: filterOfProductSelected.map((img) => img.active)[0],
            skuSelected: {
               skuId: productCtx.selectedItem?.itemId ?? "",
               active: true,
            },
         });
      } else if (returnToDefaultSku?.length) {
         setImageInfoApi({
            ...imageInfoApi,
            active: returnToDefaultSku.map((img) => img.active)[0],
            images: returnToDefaultSku.map((img) => img.images)[0],
            skuSelected: imageInfoApi.childrenSkus.find((sku) => sku.skuId === productCtx.selectedItem?.itemId),
         });
      }
   }, [productCtx.selectedItem?.itemId]);

   if (loading)
      return (
         <div className={style["skeleton-container"]}>
            <div className={style["skeleton-loader"]} />
         </div>
      );

   if (!imageInfoApi.images?.length || !imageInfoApi.active) return <></>;

   return (
      <>
         <button
            className={`${style.button} ${style.gradientBorder}`}
            onClick={() => {
               setVisibleImgs(true);
            }}
            disabled={!imageInfoApi.skuSelected?.active}
         >
            <Icon />
            Vista 360°
         </button>

         {visibleImgs && (
            <PreviewImages360 value={imageInfoApi.images} isVisible={(visible) => setVisibleImgs(visible)} />
         )}
      </>
   );
}
