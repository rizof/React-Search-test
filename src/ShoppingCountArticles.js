import React from 'react'

const FormCartShopping= (props) => {
    const {product, updateQuantity, handleShoppingCart, delOrAdd} = props

    return (
        <>
            <div onClick={(e) => updateQuantity(product, '-')}>-</div>
            <div onClick={(e) => updateQuantity(product, '+')}>+</div>
            <button onClick={() => handleShoppingCart(product)}>
                {delOrAdd ? "add panier" : "del panier"}
            </button>
        </>
    )
}

export default FormCartShopping;