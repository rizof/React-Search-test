import React from 'react'
import FormCartShopping from './FormCartShopping.js'

const ShoppingCart = React.memo(function ShoppingCart(props) {
    const {cart, handleRemoveCart, updateQuantity, quantity} = props  
    const total = cart.reduce((total, prod) => {
        return  total + parseFloat((prod.price.substr(1)) * prod.quantity)
    }, 0)

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
                        <li> {prod.quantity}</li>
                    </ul>
                    <ul>
                        <li>
                            <FormCartShopping 
                                product={prod} 
                                quantity={quantity} 
                                updateQuantity={updateQuantity}
                                handleShoppingCart={handleRemoveCart}
                                delOrAdd={false}
                            />
                        </li>
                    </ul>
                </div>
            )}
            <div>
                total : ${total}
            </div>
        </>
    )
})

export default React.memo(ShoppingCart);
