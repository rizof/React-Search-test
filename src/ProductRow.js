import React from 'react'

const ProductRow = React.memo(function ({name, price}) {
    return ( 
        <tr>
            <td>{name}</td>
            <td>{price}</td>
        </tr>
    )
})

export default ProductRow;