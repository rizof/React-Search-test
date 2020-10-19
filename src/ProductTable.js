import React from 'react'

const ProductTable = ({rows, category}) => (
    <>
    <table>
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
    </table>
    </>
)

export default ProductTable;