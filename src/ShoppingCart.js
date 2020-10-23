import React  from 'react'
import ShoppingCountArticles from './ShoppingCountArticles.js'
import './ShoppingCart.css'
import InfoAlert from './InfoAlert.js'

const ShoppingCart = React.memo(function ShoppingCart(props) {
    const {cart, handleRemoveCart, updateQuantityCart} = props

    const total = cart.reduce((total, prod) => {
        console.log(prod.quantity,(prod.price.substr(1)) )
        return  total += parseFloat((prod.price.substr(1)) * prod.quantity)
    }, 0)
    const showAlert = (cart.find(ele => ele.stocked === false)) ? true : false


    return (
        <div className="ShoppingCart">
            <h1>Panier</h1>
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
                    <div className="line"></div>
                </div>
            )}
            <div id='total'>
                total : ${total.toFixed(2)}
            </div>
            {showAlert ? <InfoAlert color="red" children="Vous avez selectionné des produits pas en stock"/> : ""}
        </div>
    )
})
export default React.memo(ShoppingCart)
