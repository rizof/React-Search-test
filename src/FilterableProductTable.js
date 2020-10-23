import React, { useState} from 'react'
import SearchBar from './SearchBar.js'
import './FilterableProductTable.css'
import ShoppingCart from './ShoppingCart.js'
import uniq from 'lodash/uniq'
import ShoppingCountArticles from './ShoppingCountArticles.js'

function FilterableProductTable ({productsObject}) {
    const [filterText, setText] = useState("")
    const [inStockOnly, setStock] = useState(false)
    const [products, setProducts] = useState(productsObject)
    const [cart, setCart] = useState([])
    const [quantity, setQuantity] = useState([])

    const categories = uniq(products.map(product => product.category))
                    
    // HANDLE CART

    const handleShoppingCart = function (product) {
        let found = (cart.find(ele => ele.id === product.id))

        if (!found) {
            found = product
            found.quantity = quantity[found.name] ? quantity[found.name] : 1
            found.realPrice = calculator(found)
            cart.push(found)
            setCart([...cart])
        }else{
            let newArr = [...cart]
            newArr = newArr.map((e) => {
                if (e.id === found.id) {
                    e.quantity += quantity[e.name] ?  quantity[e.name] : 1
                    found.realPrice = calculator(found)
                }
                return e
            })
            setCart(newArr)
        }
        quantity[product.name] = 1
        setQuantity(quantity)
    }

    const calculator = function (prod) {
        return prod.realPrice = (parseFloat((prod.price.substr(1))) * prod.quantity).toFixed(2)
    }

    const updateQuantityCart = function (prod, sym) {
        let found = (cart.find(ele => ele.id === prod.id))

        let newArr = [...cart]
            newArr = newArr.map((e) => {
                if (e.id === found.id && sym === '+'){
                    e.quantity++ 
                    e.realPrice = calculator(e)
                }
                else if (e.id === found.id && sym === '-' && e.quantity > 1){
                    e.quantity-- 
                    e.realPrice = calculator(e)
                }
                return e
            })
            setCart(newArr)
    }

    const handleRemoveCart = function (product) {
        let dell = [...cart]
        dell = dell.filter((prod) => prod.id !== product.id)
        setCart (dell)
    }

    // recherche and stock
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

    //quantity product for add to cart
    const updateQuantity = function (product, sym) {
        let cpyQuantity = []
        let name = product.name
    
        if (Number.isInteger(sym) > 0)
            cpyQuantity[name] = sym
        else if (sym === '-')
            cpyQuantity[name] = (name in quantity && quantity[name] > 1) ? quantity[name] - 1 : 1
        else if (sym === '+')
            cpyQuantity[name] = (name in quantity && quantity[name] > 1) ? quantity[name] + 1 : 2
        else
        cpyQuantity[name] = 2
        setQuantity(cpyQuantity)
    }

    return (<>
        {console.log("render")}
        <header>
            <img className="imgLogo"src="https://stock.flashmode.tn/wp-content/uploads/2020/06/dj-music-logo-png-810.png" alt='logo'/>
            <SearchBar
                filterText={filterText}
                onFilterTextChange={handleFilterChange}
                inStockOnly={inStockOnly}
                onStockChange={handleFilterChange}
            />
        </header>
        <div className='contentBoard'>
            <div className='contentTable'>
                {console.log(products.length)}
                {products.length > 0  && categories.map((category, index) =>
                    <table className='tableCategorie' key={index}>
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
                                                Qt : {!quantity[product.name] ? 1 : quantity[product.name]}
                                            </td>
                                            <td>
                                                <ShoppingCountArticles
                                                    product={product}
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
                {products.length <= 0 && 'pas de products...'}
            </div>
            <aside className='panierAside'>
                {(cart.length > 0) &&
                <ShoppingCart
                    cart={cart}
                    handleRemoveCart={handleRemoveCart}
                    updateQuantity={updateQuantity}
                    quantity={quantity}
                    updateQuantityCart={updateQuantityCart}
                />}
            </aside>
        </div>
    </>)
}

export default FilterableProductTable;
