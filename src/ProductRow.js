import React from 'react'

const ProductRow = React.memo(function ({name, price, index, addCart, product}) {
    return ( 
        <tr>
            <td>{name}</td>
            <td>{price}</td>
            <td><button onClick={() => addCart(product)}>Add panier</button></td>
        </tr>
    )
})

export default ProductRow;