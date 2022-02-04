import React, { useState, useEffect } from "react";
import styles from "./styles.css";
import { useOrderForm } from "vtex.order-manager/OrderForm";
import { PROMOTION_ID } from "./config/const";
import getPromotionData from "./api/getPromotionData";
import { FREIGHT_BAR_SCHEMA } from "./config/schema";
import usePriceFormarter from "../../hooks/usePriceFormarter";
import * as dateMath from "date-arithmetic";
import useProductSearch from "../../hooks/useProductSearch";
interface IPromotionData {
    totalValueFloor?: number;
    isActive?: boolean;
    endDateUtc?: string;
    beginDateUtc?: string;
    categories?: {id: string}[];
    brands?: {id: string}[];
    collections?: {id: string}[];
    skus?: {id: string}[];
    products?: {id: string}[];
    collectionsIsInclusive?: boolean;
    categoriesAreInclusive?: boolean;
    skusAreInclusive?: boolean;
    productsAreInclusive?: boolean;
    brandsAreInclusive?: boolean;
}
interface IProps {
    promotionId: String;
}

interface productData {
      productClusters: {
        id: string;
      }[],
      brandId: string,
      productId: string
}

function promotionIsValid(promotionData: IPromotionData) {
    const today = new Date();
    const endDate = new Date(
        promotionData.endDateUtc ? promotionData.endDateUtc : ""
    );
    const beginDate = new Date(
        promotionData.beginDateUtc ? promotionData.beginDateUtc : ""
    );

    const validDate =
        dateMath.gte(today, beginDate) && dateMath.lte(today, endDate);

    const isValid = promotionData.isActive && validDate;

    return isValid;
}

function findProductData(listProductData : productData[], id : string) : productData | undefined{
  let productData;
  listProductData.forEach((data : any) => {
    if(data.productId == id) productData = data; 
  })

  return productData;
}

function calculateValue(orderform: any, promotionData: IPromotionData, listProductData : productData[]) {     
  const validBrands : string[] = [], validCategories : string[] = [], validCollections : string[] = [], validSkus : string[] = [], validProducts : string[] = [], finalProducts : any[] = [];
  let items = [];

    if (orderform) {
      promotionData.categories?.map((category) => {
          validCategories.push(category.id);
      })

      promotionData.brands?.map((brand) => {
          validBrands.push(brand.id);
      })

      promotionData.collections?.map((collection) => {
          validCollections.push(collection.id);
      })

      promotionData.skus?.map((sku) => {
          validSkus.push(sku.id);
      })

      promotionData.products?.map((product) => {
        validProducts.push(product.id);
      })

      items = orderform.items;

      items.map((item : any) => {
        let isValid = false;

        //SKU Validation
        if(validSkus.length > 0) isValid = validSkus.includes(item.id);

        if(isValid) {
          if(promotionData.skusAreInclusive) finalProducts.push(item);
          return;
        }

        // Product validation 
        if(validProducts.length > 0) isValid = validProducts.includes(item.productId);

        if(isValid) {
          if(promotionData.productsAreInclusive) finalProducts.push(item);
          return;
        }


        //Categories validation
        if(validCategories.length > 0) {
            const productCategories = Object.keys(item.productCategories ? item.productCategories : {});
          productCategories.every(category => {
            isValid = validCategories.includes(category);
            if(isValid) return;
          })
        }

        if(isValid) {
          if(promotionData.categoriesAreInclusive) finalProducts.push(item);
          return;
        }


        const productData : productData | undefined = findProductData(listProductData, item.productId);
        if(!productData) return;


        //Brands validation
        if(validBrands.length > 0) isValid = validBrands.includes(productData.brandId.toString());

        if(isValid) {
          if(promotionData.brandsAreInclusive) finalProducts.push(item);
          return;
        }

        //Collection validation
        if(validCollections.length > 0) {
          productData.productClusters.every((cluster : any) => {
            isValid = validCollections.includes(cluster.id)
            if(isValid) return;
          })
        }

        if(isValid ) {
          if(promotionData.collectionsIsInclusive)finalProducts.push(item);
          return
        }

        //
        if(!promotionData.collectionsIsInclusive || !promotionData.brandsAreInclusive || !promotionData.skusAreInclusive || !promotionData.categoriesAreInclusive || !promotionData.productsAreInclusive) finalProducts.push(item);
      });

    }

    let finalPrice = 0;

    finalProducts.forEach((product : any) => {
      if(product.priceDefinition){
        finalPrice += product.priceDefinition.total;
      }else finalPrice += product.price;
      
    });

    return finalPrice;
}
function FreightBar({ promotionId }: IProps) {
    const { formatPrice } = usePriceFormarter();
    const ID = promotionId ? promotionId : PROMOTION_ID;
    const { orderForm } = useOrderForm();

    const listIDs: string[] = orderForm.items.map((item: any) => item.productId ).filter((item : string, index : number, self : string[]) => self.indexOf(item) == index);

    const listProductData : productData[] = useProductSearch({ IDs: listIDs ? listIDs : [""] });

    //useState
    const [promotionDataPromisse, setPromotionDataPromisse] = useState<
        Promise<{}>
    >();
    const [loading, setLoading] = useState(true);
    const [promotionData, setPromotionData] = useState<IPromotionData>({});
    const [FREIGHT_VALUE, setFreightValue] = useState<number | null>(null);
    const [progress, setProgress] = useState(0);
    const [value, setValue] = useState(0);

    //useEffect
    useEffect(() => {
        setPromotionDataPromisse(getPromotionData(ID));
    }, []);
    useEffect(() => {
        if (promotionDataPromisse) {
            promotionDataPromisse.then(data => {
                setPromotionData(data);
            });
        }
    }, [promotionDataPromisse]);
    useEffect(() => { 
        const fullData = listProductData.length == listIDs.length; 
        if (promotionIsValid(promotionData) && fullData) {
            let freightValue = null;

            if (promotionData.totalValueFloor) {
                freightValue = promotionData.totalValueFloor;
                setLoading(false);
            }

            setFreightValue(freightValue);
            setValue(calculateValue(orderForm, promotionData, listProductData));
        }
    }, [listProductData, promotionData, orderForm]);
    useEffect(() => {
        if (FREIGHT_VALUE) {
            const progress = value / FREIGHT_VALUE;
            setProgress(progress);
        }
    }, [value, FREIGHT_VALUE]);

    //
    const progressClassName = () => {
        if (progress < 60) return styles["progress-low"];
        else if (progress < 100) return styles["progress-medium"];
        else return styles["progress-high"];
    };

    return (
        <>
            {loading ? (
                <div />
            ) : (
                <div className={styles.shippingContent}>
                    <span className={styles.shippingContentTitle}>
                        Compra mínima de {formatPrice(FREIGHT_VALUE)} para envío
                        gratis.
                    </span>
                    <div className={styles.progressBar}>
                        <div
                            className={` ${
                                styles.progress
                            } ${progressClassName()} `}
                            style={{ width: `${progress}%` }}
                        >
                            {formatPrice(value / 100)}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

FreightBar.schema = FREIGHT_BAR_SCHEMA;

export default FreightBar;
