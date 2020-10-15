import React from 'react'

function ProductCategoryRow (props) {
    const {category} = props

   return (
        <thead>
            <tr>
                <th colSpan='2'>{category}</th>
            </tr>  
        </thead>
    )
}

export default ProductCategoryRow;