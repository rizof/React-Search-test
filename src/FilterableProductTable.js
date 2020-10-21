import React, { useState } from 'react'
import SearchBar from './SearchBar.js'
import './FilterableProductTable.css'
import ShowCart from './ShowCart.js'
import ShoppingCart from './ShoppingCart.js'
import uniq from 'lodash/uniq'
import ProductTable from './ProductTable.js'

function FilterableProductTable ({productsObject}) {
    const [filterText, setText] = useState("")
    const [inStockOnly, setStock] = useState(false)
    const [products, setProducts] = useState(productsObject)
    const [cart, setCart] = useState([])
    const [showPanier, setPanier] = useState(false)

    const categories = uniq(productsObject.map(product => product.category))

    const handleShoppingCart = function (e, product) {
        e.preventDefault();
        const found = [] 
        console.log(product)
        found.push(cart.find(ele => ele.id === product.id))

        if (!found[0]) {
            cart.push(product)
            setCart(cart)
        }
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

   const handleFilterChange = function (e, product) {
        const result = productsObject.filter(product => {
            if (e.currentTarget.type === "checkbox") {
                setStock(e.target.checked)
                if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1)
                    return false
                if (e.target.checked && !product.stocked)
                    return false
            }
            else {
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

    const updateQuantity = function (operator, prod) {
        const result = productsObject.filter(product => {
            if (prod.id === product.id && operator === '-' && prod.quantity > 1){
                prod.quantity--
                return prod
            }
            else if (prod.id === product.id && operator === '+') { 
                prod.quantity++
                return prod
            }
            else if (prod.id === product.id && Number.isInteger(operator)
                    && operator > 0){
                prod.quantity = parseInt(operator, 10)
                return prod
            }
            else
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
            <table key={index}>
                <thead>
                    <tr>
                        <th>{category}</th>
                    </tr>
                </thead>
                    {products.filter(product => product.category === category).map((product, index) => 
                        <tbody key={index}>
                                <tr>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>
                                        <form onSubmit={(e) => handleShoppingCart(e, product)}>
                                            <input 
                                                type="number" 
                                                min="1" 
                                                max="100" 
                                                defaultValue={1}
                                                onChange={(e) => updateQuantity(parseInt(e.target.value, 10), product)}
                                            />
                                            <div  onClick={(e) => updateQuantity('-', product)}>-</div>
                                            <div  onClick={(e) => updateQuantity('+', product)}>+</div>
                                            <input type="submit" value="Add panier" />
                                        </form>
                                    </td>
                                </tr>
                        </tbody>
                    )}
            </table>
        )}
        {showPanier && <ShoppingCart cart={cart} handleRemoveCart={handleRemoveCart}/>}
    </>)
}

export default FilterableProductTable;
