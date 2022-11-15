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
                  
                    if(property.name == 'Atributos PLP'){
                        return (
                            <div>
                                <h3>Especificaciones:</h3>
                                <ul>
                                    {
                                        property.values.map((value) => {
                                            return (
                                                <li>{value}</li>
                                            )
                                        }
                                        )
                                    }
                                </ul>
                            </div>
                        )
                    } else if ( property.name == 'Atributos PLP 2'){
                        return (
                            <div>
                                <h3>Especificaciones:</h3>
                                <ul>
                                    {
                                        property.values.map((value) => {
                                            return (
                                                <li>{value}</li>
                                            )
                                        }
                                        )
                                    }
                                </ul>
                            </div>
                        )
                    } else if ( property.name == 'Atributos PLP 3'){
                        return (
                            <div>
                                <h3>Especificaciones:</h3>
                                <ul>
                                    {
                                        property.values.map((value) => {
                                            return (
                                                <li>{value}</li>
                                            )
                                        }
                                        )
                                    }
                                </ul>
                            </div>
                        )
                    } else if ( property.name == 'Atributos PLP 4'){
                        return (
                            <div>
                                <h3>Especificaciones:</h3>
                                <ul>
                                    {
                                        property.values.map((value) => {
                                            return (
                                                <li>{value}</li>
                                            )
                                        }
                                        )
                                    }
                                </ul>
                            </div>
                        )
                    } else if ( property.name == 'Atributos PLP 5'){
                        return (
                            <div>
                                <h3>Especificaciones:</h3>
                                <ul>
                                    {
                                        property.values.map((value) => {
                                            return (
                                                <li>{value}</li>
                                            )
                                        }
                                        )
                                    }
                                </ul>
                            </div>
                        )
                    } else {
                        return null;
                    }

                })
            }
        </div>
    )

}

export {PlpsAttributes}