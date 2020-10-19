import React, { useState } from 'react'
import SearchBar from './SearchBar.js'
import './FilterableProductTable.css'
import ShowCart from './ShowCart.js'
import ShoppingCart from './ShoppingCart.js'
import uniq from 'lodash/uniq'

function FilterableProductTable ({productsObject}) {
    const [filterText, setText] = useState("")
    const [inStockOnly, setStock] = useState(false)
    const [products, setProducts] = useState(productsObject)
    const [cart, setCart] = useState([])
    const [showPanier, setPanier] = useState(false)

    const categories = uniq(productsObject.map(product => product.category))

    const handleShoppingCart = function (product) {
        let add = true

        cart.filter((prod) => {
            if (prod.id === product.id){
                add = false
                prod.quantity += product.quantity
            }
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

    const handlePanier = function () {
        let currentPanier = !showPanier
        setPanier (currentPanier)
    }

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
                setText (e.target.value)
                if (product.name.toLowerCase().indexOf(e.target.value.toLowerCase()) === -1)
                    return false
                if (inStockOnly && !product.stocked)
                    return false
            }
            return product
        })
        setProducts(result)
    }

    return (<>
        <SearchBar 
            filterText={filterText} 
            onFilterTextChange={handleFilterChange}
            inStockOnly={inStockOnly}
            onStockChange={handleFilterChange}
        />
        <ShowCart cart={cart} 
            handlePanier={handlePanier} 
            showPanier={showPanier} 
        />
        {!showPanier && categories.map((category, index) => 
            <div key={index}>
                <p>{category}</p>
                    {products.filter(product => product.category === category).map((product, index) => 
                        <div key={index}>
                            <p>{product.name}</p> 
                            <p>{product.price}</p>
                            <p><button onClick={() => handleShoppingCart(product)}>Add panier</button></p>
                        </div>
                    )}
            </div>
        )}
        {showPanier && <ShoppingCart cart={cart} handleRemoveCart={handleRemoveCart}/>}
    </>)
}

export default FilterableProductTable;
