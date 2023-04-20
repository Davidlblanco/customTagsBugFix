/* 
  *Opción 1, Ocultando el producto en PLP 
*/

/* import React, { useEffect, useState } from 'react'
import { useProduct } from 'vtex.product-context'

import styles from "./index.css";

const HideProducts = () => {
    const productContextValue = useProduct();

    const [hideClass, setHideClass] = useState("show_this_product")

    useEffect(() => {
      let highPrice = productContextValue?.product?.priceRange?.sellingPrice?.highPrice
      let lowPrice = productContextValue?.product?.priceRange?.sellingPrice?.lowPrice
        console.log("HideProducts highPrice: ", highPrice)
        console.log("HideProducts lowPrice: ", lowPrice)
        if(highPrice === 10000000 && lowPrice === 10000000 ){
          setHideClass("hide_this_product")
        }

    }, [productContextValue])

    return (
        <div className={hideClass === "hide_this_product" ? styles.hide_this_product : styles.show_this_product}>
        </div>
    )

}


export {HideProducts} */

import React, { useEffect, useState } from 'react'
import { useProduct } from 'vtex.product-context'

import styles from "./index.css";



const HideProducts = () => {
    const productContextValue = useProduct();

    const [hideClass, setHideClass] = useState("show_this_product")
    const [item, setItem] = useState("")
    console.log("selectedItem-0", item)
    
    let selectedItem = productContextValue?.selectedItem?.itemId
    
    useEffect(() => {
      let highPrice = productContextValue?.product?.priceRange?.sellingPrice?.highPrice
      let lowPrice = productContextValue?.product?.priceRange?.sellingPrice?.lowPrice
      console.log("selectedItem-1", selectedItem)
      setItem(selectedItem!)
  
        console.log("HideProducts highPrice: ", highPrice)
        console.log("HideProducts lowPrice: ", lowPrice)
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