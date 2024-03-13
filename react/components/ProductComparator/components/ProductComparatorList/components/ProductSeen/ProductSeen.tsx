import React, { FC } from "react"

const ProductSeen: FC = ({ children }) => {
    return (
        <div>
            <span>Producto visto</span>
            {children}
        </div>
    )
}

export default ProductSeen;