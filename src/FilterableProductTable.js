import React, { useState } from 'react'
import ProductTable from './ProductTable.js' 
import SearchBar from './SearchBar.js'
import ProductRow from './ProductRow.js'
import './FilterableProductTable.css'

function FilterableProductTable ({productsObject}) {
    const [filterText, setText] = useState("")
    const [inStockOnly, setStock] = useState(false)
    const [products, setProducts] = useState(productsObject)
    
    let tableProducts = []
    
    const handleInFilterText = function (e) {
        setText (e.target.value)
    }

    const handleInStockOnlyChange = function (e) {
        setStock (e.target.checked)
    }

   const handleFilterChange = function (e) {
        const result = productsObject.filter(product => {
            if (e.currentTarget.type === "checkbox")
            {
                handleInStockOnlyChange(e)
                if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1)
                    return false
                if (e.target.checked && !product.stocked)
                    return false
            }
            else
            {
                handleInFilterText(e)
                if (product.name.toLowerCase().indexOf(e.target.value.toLowerCase()) === -1)
                    return false
                if (inStockOnly && !product.stocked)
                    return false
            }
            return product
        })
        setProducts(result)
    }

    const indexProducts = function () {
        const categoriesAndProduct = []
        let lastCategoriy = []
    
        products.map((product, index) => {
                if (!lastCategoriy.includes(product.category)){
                    lastCategoriy.push(product.category)
                    categoriesAndProduct[product.category] = []
                }
                const name = product.stocked ? product.name : <span className='danger'>{product.name}</span>
                categoriesAndProduct[product.category].push(
                    <ProductRow 
                        key={index} 
                        name={name}
                        price={product.price }
                    />
                )
            return categoriesAndProduct
        })
        return categoriesAndProduct
    }

    const createTableProducts = function (categoriesAndProduct) {
        const table = []

        for (const property in categoriesAndProduct) {
                    table.push(
                        <ProductTable 
                            category = {property}
                            key={property}
                            rows={categoriesAndProduct[property]}
                        />
                    )
         }
         return table
    }

    tableProducts = createTableProducts(indexProducts())

    return (<>
        <SearchBar 
            filterText={filterText} 
            onFilterTextChange={handleFilterChange}
            inStockOnly={inStockOnly}
            onStockChange={handleFilterChange}
        />
        {tableProducts}
    </>)
}

export default FilterableProductTable;