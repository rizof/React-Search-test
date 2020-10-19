import React, { useState } from 'react'
import ProductTable from './ProductTable.js' 
import SearchBar from './SearchBar.js'
import ProductRow from './ProductRow.js'
import './FilterableProductTable.css'
import ShowCart from './ShowCart.js'
import ShoppingCart from './ShoppingCart.js'

function FilterableProductTable ({productsObject}) {
    const [filterText, setText] = useState("")
    const [inStockOnly, setStock] = useState(false)
    const [products, setProducts] = useState(productsObject)
    const [cart, setCart] = useState([])
    const [showPanier, setPanier] = useState(false)

    let tableProducts = []

    const handleShoppingCart = function (product, index) {
        let add = true

        cart.filter((prod) => {
            if (prod.id === product.id)
                add = false
            return true
        })
        if (add === true)
            setCart ([...cart, product])
    }

    const handleRemoveCart = function (product) {
        let dell = [...cart]
        dell = dell.filter((prod) => prod.id !== product.id)
        setCart (dell)
    }
    
    const handleInFilterText = function (e) {
        setText (e.target.value)
    }

    const handleInStockOnlyChange = function (e) {
        setStock (e.target.checked)
    }

    const handlePanier = function () {
        let currentPanier = !showPanier
        setPanier (currentPanier)
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
                        handleShoppingCart={handleShoppingCart}
                        product={product}
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
        <ShowCart cart={cart} handlePanier={handlePanier} showPanier={showPanier} />
        {!showPanier && <table>{tableProducts}</table>}
        {showPanier && <ShoppingCart delCart={handleRemoveCart} cart={cart} />}
    </>)
}

export default FilterableProductTable;