import React from 'react'

const ProductRow = React.memo(function (props) {
    const {name, handleShoppingCart, product} = props

    return ( 
        <tr>
            <td>{name}</td>
            <td>{product.price}</td>
            <td><button onClick={() => handleShoppingCart(product)}>Add panier</button></td>
        </tr>
    )
})

export default ProductRow;
