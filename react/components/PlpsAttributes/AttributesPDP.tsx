import React from 'react'
import { useProduct } from 'vtex.product-context'
import styles from "./index.css";

const AttributesPDP = () => {
    const productContextValue = useProduct();

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