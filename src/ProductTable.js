import React from 'react'

const ProductTable = ({rows, category}) => (
    <>
        <thead>
            <tr>
                <th>
                    {category}     
                </th>
            </tr>
        </thead>
        <tbody>
            {rows}
        </tbody>
    </>
)

export default ProductTable;
