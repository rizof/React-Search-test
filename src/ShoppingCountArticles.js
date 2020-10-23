import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faMinusCircle, faPlusCircle, faTrashAlt} from '@fortawesome/free-solid-svg-icons'

const FormCartShopping= (props) => {
    const {product, updateQuantity, handleShoppingCart, delOrAdd} = props
    return (
        <div className="quantityFlex">
            <div onClick={(e) => updateQuantity(product, '-')}><FontAwesomeIcon icon={faMinusCircle}/></div>
            <div onClick={(e) => updateQuantity(product, '+')}><FontAwesomeIcon icon={faPlusCircle}/></div>
            <button onClick={() => handleShoppingCart(product)}>
                {delOrAdd ? <FontAwesomeIcon icon={faShoppingCart} /> : <FontAwesomeIcon icon={faTrashAlt} />}
            </button>
        </div>
    )
}

export default FormCartShopping;