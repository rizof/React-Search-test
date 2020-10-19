import React from 'react'


function ShowCart (props) {
    const {handlePanier, showPanier} = props

    const show = (showPanier) => {
        if (showPanier)
            return 'Show Article'
        else
            return 'Show Panier'
    }

    return (
        <>
            <div>
                <button onClick={() => handlePanier()}>{show(showPanier)}</button>
            </div>
        </>
    )
}

export default ShowCart;
