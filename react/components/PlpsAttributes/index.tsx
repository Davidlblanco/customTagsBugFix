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
                productContextValue?.product?.properties.map((property) => {
                    return (
                        property.name == 'Atributos PLP' && (
                            <div>
                                <h3>Especificaciones:</h3>
                                <ul>
                                    {
                                        property.values.toString().split('//').map((value) => {
                                            return (
                                                <li>{value}</li>
                                            )
                                        }
                                        )
                                    }
                                </ul>
                            </div>
                        )
                    )
                })
            }
        </div>
    )

}

export {PlpsAttributes}