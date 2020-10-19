import React, { useState } from 'react'
import uniq from 'lodash/uniq'

import SearchBar from './SearchBar.js'
import './FilterableProductTable.css'

const FilterableProductTable = ({productsObject}) => {
    const [filterText, setText] = useState("")
    const [inStockOnly, setStock] = useState(false)
    const [products, setProducts] = useState(productsObject)

    const categories = uniq(productsObject.map(product => product.category))

    const handleFilterChange = function (e) {
        const result = productsObject.filter(product => {
            if (e.currentTarget.type === "checkbox")
            {
                setStock(e.target.checked)
                if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1)
                    return false
                if (e.target.checked && !product.stocked)
                    return false
            }
            else
            {
                setText(e.target.value)
                if (product.name.toLowerCase().indexOf(e.target.value.toLowerCase()) === -1)
                    return false
                if (inStockOnly && !product.stocked)
                    return false
            }
            return product
        })
        setProducts(result)
    }

    return (
        <>
            <SearchBar 
                filterText={filterText} 
                onFilterTextChange={handleFilterChange}
                inStockOnly={inStockOnly}
                onStockChange={handleFilterChange}
            />
            {categories.map(category => 
                <>
                    <p>{category}</p>
                    {products.filter(product => product.category === category).map(product => 
                        <div>
                            <p>{product.name}</p> 
                            <p>{product.price}</p>
                        </div>
                    )}
                </>
            )}
        </>
    )
}

export default FilterableProductTable;