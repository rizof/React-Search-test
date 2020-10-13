import React, { useState } from 'react'
import ProductTable from './ProductTable.js' 
import SearchBar from './SearchBar.js'
import ProductRow from './ProductRow.js'
import './FilterableProductTable.css'
import Column2 from './Column2.js'

function createTableProducts(categoriesAndProduct, categories){
    const table = []
    let isEmpty = Object.keys(categories).length
    for (const property in categoriesAndProduct) {
            if (isEmpty === 0|| categories.includes(property)) 
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

const NoProduct = ()  => (
    <tr>
        <td>il n'y a pas de product</td>
    </tr>
)

function listProductsAndCategories (products) {
    const categoriesAndProduct = []
    let lastCategoriy = []

    products.map((product, index) => {
            if (!lastCategoriy.includes(product.category)){
                lastCategoriy.push(product.category)
                categoriesAndProduct[product.category] = []
            }
            const name = product.stocked ? product.name : <span className='danger'>{product.name}</span>
            const price = product.price 
            categoriesAndProduct[product.category].push(
                <ProductRow 
                    key={index} 
                    name={name}
                    price={price}
                    index={index}
                />
            )
        return categoriesAndProduct
    })
    return categoriesAndProduct
}

function FilterableProductTable ({productsObject}) {
    const [filterText, setText] = useState("")
    const [inStockOnly, setStock] = useState(false)
    const [products, setProducts] = useState(productsObject)
    const [categories, setCategories] = useState([])
    const [cart, setCart] = useState([])

    const table = [] 
    let categoriesAndProduct = []

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
    categoriesAndProduct = listProductsAndCategories(products)
    table.push(createTableProducts(categoriesAndProduct, categories))
    return (
        <>
            <header>
                <Column2 
                    left={
                        <img className="imgLogo" alt="logo" src="https://fr.freelogodesign.org/Content/img/logo-samples/flooop.png"/>
                    }
                    right={
                        <div className="contentTopRightHeader">            
                            <SearchBar 
                                filterText={filterText} 
                                onFilter={handleFilterChange}
                                inStockOnly={inStockOnly}
                            />
                        </div>
                    }
                />
            </header>
            <div className="contentTableProduct">
                {table[0].length === 0 ? <NoProduct /> : table}
            </div>
        </>
    )
}

export default FilterableProductTable;