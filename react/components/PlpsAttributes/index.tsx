import React, { useEffect } from 'react'
import { useProduct } from 'vtex.product-context'

import styles from "./index.css";

const PlpsAttributes = () => {
    const productContextValue = useProduct();

    useEffect(() => {
        console.log(productContextValue)
    }, [productContextValue])

    return (
        <div className={styles.PlpsAttributes}>
                {
                     productContextValue?.product?.properties.map((property, index) => {
                        if (property.name === 'Atributos PLP') {
                            return (
                                <div key={index}>
                                    <h3>Especificaciones:</h3>
                                </div>
                            )
                        } else {
                            return null
                        }
                    })
                }
                <ul>
                    {
                        productContextValue?.product?.properties.map((property) => { 
                          const canRender =  
                            property.name == 'Atributos PLP' || 
                            property.name == 'Atributos PLP 2' || 
                            property.name == 'Atributos PLP 3' || 
                            property.name == 'Atributos PLP 4' ||
                            property.name == 'Atributos PLP 5';

                          if(canRender) {
                            return (
                              property.values.map((value) => (<li>{value}</li>))
                            )
                          }
                          return null;
                        })
                    }
                 </ul>
        </div>
    )

}

export {PlpsAttributes}