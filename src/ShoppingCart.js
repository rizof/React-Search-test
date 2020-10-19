import React from 'react'

function ShoppingCart (props) {
    const {cart, handleRemoveCart} = props
    console.log(cart)
    return (
        <>
            {cart.map((prod, index) => 
                <div key={index}>
                    <ul key={index}>
                        <li> {prod.name}</li>
                    </ul>
                    <ul>
                        <li> {prod.price}</li>
                    </ul>
                    <ul>
                        <li><button onClick={() => handleRemoveCart(prod)}>Delete Article</button></li>
                    </ul>
                </div>
            )}
        </>
    )
}

export default ShoppingCart;
