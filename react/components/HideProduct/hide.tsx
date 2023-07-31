import React, { useEffect, useState } from 'react'
import { useProduct } from 'vtex.product-context'
import styles from "./index.css";

const HideProducts = () => {
    const productContextValue = useProduct();

    const [hideClass, setHideClass] = useState("show_this_product")
    const [item, setItem] = useState("")
    
    let selectedItem = productContextValue?.selectedItem?.itemId
    
    useEffect(() => {
      let highPrice = productContextValue?.product?.priceRange?.sellingPrice?.highPrice
      let lowPrice = productContextValue?.product?.priceRange?.sellingPrice?.lowPrice
      setItem(selectedItem!)
  
        if(highPrice === 10000000 || lowPrice === 10000000){
          setHideClass("hide_this_product")
        }
        else{
          setHideClass("show_this_product")
        }

    }, [item])

    return (
        <div className={hideClass === "hide_this_product" ? styles.hide_this_product : styles.show_this_product}>
        </div>
    )

}


export {HideProducts}