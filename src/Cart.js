import React from 'react'
import ContentCart from './ContentCart.js'

function Cart (props) {
    return (
        <div>
            <button onClick={() => props.panier}>Panier</button>
        </div>
    )
}

export default Cart