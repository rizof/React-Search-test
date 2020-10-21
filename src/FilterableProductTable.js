import React, { useState} from 'react'
import SearchBar from './SearchBar.js'
import './FilterableProductTable.css'
import ShowCart from './ShowCart.js'
import ShoppingCart from './ShoppingCart.js'
import uniq from 'lodash/uniq'
import ShoppingCountArticles from './ShoppingCountArticles.js'

function FilterableProductTable ({productsObject}) {
    const [filterText, setText] = useState("")
    const [inStockOnly, setStock] = useState(false)
    const [products, setProducts] = useState(productsObject)
    const [cart, setCart] = useState([])
    const [showPanier, setPanier] = useState(false)
    const [quantity, setQuantity] = useState([])

    const categories = uniq(productsObject.map(product => product.category))

    const handleShoppingCart = function (product) {
        let found = (cart.find(ele => ele.id === product.id))

        if (!found) {
            found = product
            cart.push(found)
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

    const updateQuantity = function (name, sym) {
        if (name in quantity) {
            if (Number.isInteger(sym) > 0)
                quantity[name] = sym
            else if (sym === '-')
                quantity[name] = (name in quantity && quantity[name] > 1) ? quantity[name] - 1 : 1
            else if (sym === '+')
                quantity[name] = (name in quantity && quantity[name] > 1) ? quantity[name] + 1 : 2
            console.log(quantity, "ezae")
            console.log(quantity, "ezae")
        }
        else{
            quantity[name] = 2
        }
        setQuantity(quantity)
    }

    return (<>
        {console.log("render")}
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
                                        <ShoppingCountArticles 
                                            product={product} 
                                            quantity={quantity} 
                                            updateQuantity={updateQuantity} 
                                            handleShoppingCart={handleShoppingCart}
                                            delOrAdd={true}
                                        />
                                    </td>
                                </tr>
                        </tbody>
                    )}
            </table>
        )}
        {showPanier && <ShoppingCart 
                            cart={cart} 
                            handleRemoveCart={handleRemoveCart}
                            updateQuantity={updateQuantity}
                            quantity={quantity}
                        />}
    </>)
}

export default FilterableProductTable;
