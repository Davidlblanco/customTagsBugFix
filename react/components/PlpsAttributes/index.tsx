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
            <div>
                <h3>Especificaciones:</h3>
                <ul>
                    {
                        productContextValue?.product?.properties.map((property) => {                   
                                if(property.name == 'Atributos PLP'){
                                    return (
                                            property.values.map((value) => {
                                                return (
                                                    <li>{value}</li>
                                                )
                                            }
                                            )
                                    )
                                } else if ( property.name == 'Atributos PLP 2'){
                                    return (
                                            property.values.map((value) => {
                                                return (
                                                    <li>{value}</li>
                                                )
                                            }
                                            )
                                    )
                                } else if ( property.name == 'Atributos PLP 3'){
                                    return (
                                            property.values.map((value) => {
                                                return (
                                                    <li>{value}</li>
                                                )
                                            }
                                            )
                                    )
                                } else if ( property.name == 'Atributos PLP 4'){
                                    return (
                                        property.values.map((value) => {
                                            return (
                                                <li>{value}</li>
                                            )
                                        }
                                        )
                                    )
                                } else if ( property.name == 'Atributos PLP 5'){
                                    return (
                                        property.values.map((value) => {
                                            return (
                                                <li>{value}</li>
                                            )
                                        }
                                        )
                                    )
                                } else {
                                    return null;
                                }
                        }
                        )
                    }
                 </ul>
            </div>
        </div>
    )

}

export {PlpsAttributes}