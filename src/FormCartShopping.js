import React from 'react'

const FormCartShopping= (props) => {
    const {product, quantity, updateQuantity, handleShoppingCart, delOrAdd} = props
    console.log(delOrAdd)
    return (
        <>
            <input 
                type="number" 
                min="1"
                defaultValue={1}
                value={quantity[product.name]}
                onChange={(e) => updateQuantity(product.name, parseInt(e.target.value, 10))}
            />
            <div  onClick={(e) => updateQuantity(product.name, '+')}>-</div>
            <div  onClick={(e) => updateQuantity(product.name, '-')}>+</div>
            <button onClick={() => handleShoppingCart(product)}> 
                {delOrAdd ? "add panier" : "del panier"} 
            </button>
        </>
    )
}

export default FormCartShopping;