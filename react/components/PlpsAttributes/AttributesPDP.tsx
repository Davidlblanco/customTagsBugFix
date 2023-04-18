import React, { useEffect } from 'react'
import { useProduct } from 'vtex.product-context'

import styles from "./index.css";

const AttributesPDP = () => {
    const productContextValue = useProduct();

    useEffect(() => {
        console.log(productContextValue)
    }, [productContextValue])

    return (
      <React.Fragment>
        {
          productContextValue?.product?.properties.map((property) => {
          if (property.name === 'Atributos PLP') {
              return (
                <div className={styles.AttributesPDP}>
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

                <a href="#product-description-id" className={styles.AttributesPDP_link}>Ver más</a>

        </div>
              )
          } else {
              return null
          }
      })      
        }
      </React.Fragment>
    )

}

export {AttributesPDP}