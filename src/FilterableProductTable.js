import React, { useState } from 'react'
import ProductTable from './ProductTable.js' 
import SearchBar from './SearchBar.js'
import ProductCategoryRow from './ProductCategoryRow.js'
import ProductRow from './ProductRow.js'
import './FilterableProductTable.css'

function indexProducts(products) {
    let lastCategoriy = []
    const categoriesAndProduct = []

    products.map((product, index) => {
        if (!lastCategoriy.includes(product.category)){
            lastCategoriy.push(product.category)
            categoriesAndProduct.push(
                <ProductCategoryRow 
                    key={product.category} 
                    category={product.category} 
                />
            )
        }
        const name = product.stocked ? product.name : <span className='danger'>{product.name}</span>
        const price = product.price 
        categoriesAndProduct.push(<ProductRow 
                key={index} 
                name={name} 
                price={price}
            />
        )
        return true
    })
    return categoriesAndProduct
}

function FilterableProductTable ({productsObject}) {
    const [filterText, setText] = useState("")
    const [inStockOnly, setStock] = useState(false)
    const [products, setProducts] = useState(productsObject)
    
    let categoriesAndProduct = []

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

    categoriesAndProduct = indexProducts(products)
    
    return (<>
        <SearchBar 
            filterText={filterText} 
            onFilterTextChange={handleFilterChange}
            inStockOnly={inStockOnly}
            onStockChange={handleFilterChange}
        />
        <ProductTable 
            products={products} 
            rows={categoriesAndProduct}
        />
    </>)
}

export default FilterableProductTable;