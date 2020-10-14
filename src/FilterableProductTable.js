import React, { useState } from 'react'
import ProductTable from './ProductTable.js' 
import SearchBar from './SearchBar.js'
import ProductRow from './ProductRow.js'
import './FilterableProductTable.css'
import InfoUtileSpan from './InfoUtileSpan.js'
import ContentCart from './ContentCart.js'

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

function listProductsAndCategories (products, handleShoppingCart) {
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
                    addCart={handleShoppingCart}
                    product={product}
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
    const [panier, setPanier] = useState(false)
    const table = [] 
    let categoriesAndProduct = []

    const handleShoppingCart = function (product) {
        let add = true
        console.log(cart)

        cart.filter((prod) => {
            if (prod.id === product.id)
                add = false
        })
        if (add == true)
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
        console.log(panier)
        setPanier (panier = !panier)
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
    categoriesAndProduct = listProductsAndCategories(products, handleShoppingCart)
    table.push(createTableProducts(categoriesAndProduct, categories))
    return (
        <>
            <header>
                        <div className="contentTopRightHeader">            
                            <SearchBar 
                                filterText={filterText} 
                                onFilter={handleFilterChange}
                                inStockOnly={inStockOnly}
                                shoppingContentCart={handleShoppingCart}
                                panier={handlePanier}
                            />
                            </div>
            </header>
            {panier && <ContentCart />}
            {!panier &&
            <div className="contentTableProduct">
                {table[0].length === 0 ? <InfoUtileSpan info={"Il n'y a pas de produit"}/> : table}
            </div>}
        </>
    )
}

export default FilterableProductTable;