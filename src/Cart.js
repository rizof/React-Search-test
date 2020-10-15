import React from 'react'

function Cart (props) {
    return (
        <div>
            <button onClick={() => props.panier()}>Panier</button>
        </div>
    )
}

export default Cart