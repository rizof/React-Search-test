import React from 'react';
import './Modal.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faPlus, faMinusCircle, faPlusCircle, faTrashAlt} from '@fortawesome/free-solid-svg-icons'

const Modal = (props) => {
    const {product, updateQuantity, handleShoppingCart, delOrAdd, hide, prodQuantity} = props
    
    return (
        <>
            <div className="modal-overlay"/>
                <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
                    <div className="modal">
                        <div className="modal-header">
                        <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                        </div>
                        <h1>{product.name}</h1>
                        <table className="tablePopup">
                            <tr  className="modalPopup">
                                <td>{product.price}</td>
                                <td>qt: {prodQuantity}</td>
                                <div onClick={(e) => updateQuantity(product, '-')}><FontAwesomeIcon icon={faMinusCircle}/></div>
                                <div onClick={(e) => updateQuantity(product, '+')}><FontAwesomeIcon icon={faPlusCircle}/></div>
                                <button onClick={() => handleShoppingCart(product)}>
                                    {delOrAdd ? <FontAwesomeIcon icon={faShoppingCart} /> : <FontAwesomeIcon icon={faTrashAlt} />}
                                </button>  
                            </tr>
                        </table>
                    </div>
                </div>
        </>
    )
}

export default Modal;