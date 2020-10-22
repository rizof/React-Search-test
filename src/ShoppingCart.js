import React  from 'react'
import ShoppingCountArticles from './ShoppingCountArticles.js'
const ShoppingCart = React.memo(function ShoppingCart(props) {
    const {cart, handleRemoveCart, updateQuantityCart} = props

    const total = cart.reduce((total, prod) => {
        console.log(prod.quantity,(prod.price.substr(1)) )
        return  total += parseFloat((prod.price.substr(1)) * prod.quantity)
    }, 0)

    return (
        <>
            {cart.map((prod, index) =>
                <div key={index}>
                    <ul key={index}>
                        <li> {prod.name}</li>
                    </ul>
                    <ul>
                        <li> {prod.realPrice}</li>
                    </ul>
                    <ul>
                        <li>
                            Qt : {prod.quantity}
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <ShoppingCountArticles
                                product={prod}
                                updateQuantity={updateQuantityCart}
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
export default React.memo(ShoppingCart)
