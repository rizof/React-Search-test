import uniq from 'lodash/uniq'
import React, { useState } from 'react'
import './FilterableProductTable.css'
import SearchBar from './SearchBar.js'
import ShoppingCart from './ShoppingCart.js'
import ShowCart from './ShowCart.js'
// import ShoppingCountArticles from './ShoppingCountArticles.js'

function FilterableProductTable ({productsObject}) {
    const [filterText, setText] = useState("")
    const [inStockOnly, setStock] = useState(false)
    const [products, setProducts] = useState(productsObject)
    const [cart, setCart] = useState([])
    const [showPanier, setPanier] = useState(false)

    const categories = uniq(productsObject.map(product => product.category))

    const handleShoppingCart = function (product) {
        let found = (cart.find(ele => ele.id === product.id))

        if (!found) {
            found = product
            found.quantity = 1
            cart.push(found)
            setCart([...cart])
        }else{
            let newArr = [...cart]
            newArr.map((e) => {
                if (e.id === found.id)
                    e.quantity++
            })
            setCart(newArr)
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

    // const updateQuantity = function (name, sym) {

    // }

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
        {categories.map((category, index) => 
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
                                        <button onClick={() => handleShoppingCart(product)}>add panier</button>
                                    </td>
                                </tr>
                        </tbody>
                    )}
            </table>
        )}
        <ShoppingCart 
            cart={cart} 
            handleRemoveCart={handleRemoveCart}
        />
    </>)
}

export default FilterableProductTable;
