import React from 'react'
import Cart from './Cart.js'

function SearchBar (props) {
    const {filterText, onFilter, inStockOnly, shoppingContentCart, panier} = props

    return (
        <div>
                <div>
                    <input type="text" placeholder="Rechercher" value={filterText} onChange={(e) => onFilter(e)}/>
                </div>
                <div>
                    <input type="checkbox" id="stock" checked={inStockOnly} onChange={(e) => onFilter(e)}/>
                    <label htmlFor="stock">Produit en stock</label>
                </div>
                <Cart shoppingContentCart={shoppingContentCart} panier={panier}/>
        </div>
    )
}

export default SearchBar;