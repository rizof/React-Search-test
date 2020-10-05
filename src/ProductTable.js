import React from 'react'

const ProductTable = ({products, rows}) => (
    <table className="table"> 
        <thead>
            <tr>
                <th>Nom</th>
                <th>Prix</th>
            </tr>
        </thead>
        <tbody>
            {rows}
        </tbody>
    </table>
)
export default ProductTable;