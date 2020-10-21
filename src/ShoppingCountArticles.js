import React from 'react'

const FormCartShopping= (props) => {
    const {product, quantity, updateQuantity, handleShoppingCart, delOrAdd} = props

    return (
        <>
            <div >{!quantity[product.name] ? 1 : quantity[product.name]}</div>
            <div onClick={(e) => updateQuantity(product.name, '-')}>-</div>
            <div onClick={(e) => updateQuantity(product.name, '+')}>+</div>
            <button onClick={() => handleShoppingCart(product)}> 
                {delOrAdd ? "add panier" : "del panier"} 
            </button>
        </>
    )
}

export default FormCartShopping;