import React from 'react'
import ContentCart from './ContentCart'

function ShoppingCart (props) {
    const {cart, delCart} = props

    return (
        <>
            {cart.map((prod, index) => 
                <ContentCart key={index} prod={prod} delCart={() => delCart(prod)}/>
            )}
        </>
    )
}

export default ShoppingCart;