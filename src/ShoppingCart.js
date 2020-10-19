import React from 'react'
import ContentCart from './ContentCart'

function ShoppingCart (props) {
    const {cart, delCart} = props

    const indexCartProducts = function () {
        const tableCart = []
        cart.map((prod, index) => 
            tableCart.push(<ContentCart key={index} prod={prod} delCart={() => delCart(prod)}/>)
        )
        return tableCart
    }

    let tableCart = indexCartProducts()

    return (
        <>
            {tableCart}
        </>
    )
}

export default ShoppingCart;