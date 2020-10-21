import React  from 'react'
import ShoppingCountArticles from './ShoppingCountArticles.js'

const ShoppingCart = React.memo(function ShoppingCart(props) {
    const {cart, handleRemoveCart, updateQuantity, quantity} = props 

    const total = cart.reduce((total, prod) => {
        console.log(prod.quantity,(prod.price.substr(1)) )
        return  total + parseFloat((prod.price.substr(1)) * quantity[prod.name])
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
                        <li> {quantity[prod.name]}</li>
                    </ul>
                    <ul>
                        <li>
                            <ShoppingCountArticles 
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
            <div id='total'>
                total : ${total}
            </div>
        </>
    )
})

export default React.memo(ShoppingCart);
