import React from 'react'


const ShoppingCart = React.memo(function ShoppingCart(props) {
    const {cart, handleRemoveCart} = props
    
    const total = cart.reduce((total, prod) => {
        return  total += (parseFloat((prod.price.substr(1)) * prod.quantity))
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
                        <li>{prod.quantity}</li>
                    </ul>
                    <ul>
                        <li><button onClick={() => handleRemoveCart(prod)}>Delete Article</button></li>
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
