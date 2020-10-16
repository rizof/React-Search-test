import React from 'react'
import ContentCart from './ContentCart'

function indexCartProducts(cart, delCart) {
    const tableCart = []
    cart.map((prod, index) => 
        tableCart.push(<ContentCart key={index} prod={prod} delCart={() => delCart(prod)}/>)
    )
    return tableCart
}

function ShoppingCart (props) {
    const {cart, delCart} = props

    let tableCart = indexCartProducts(cart, delCart)
    return (
        <>
            {tableCart}
        </>
    )
}

export default ShoppingCart;