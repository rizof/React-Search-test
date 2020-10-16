import React from 'react'

const ProductRow = React.memo(function (props) {
    const {name, price, addCart, product} = props

    return ( 
        <tr>
            <td>{name}</td>
            <td>{price}</td>
            <td><button onClick={() => addCart(product)}>Add panier</button></td>
        </tr>
    )
})

export default ProductRow;