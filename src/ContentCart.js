import React from 'react'

const ContentCart = (props) => {
    const {name, price} = props.prod
    
    return (
        <>
            <ul>
                <li> {name}</li>
            </ul>
            <ul>
                <li> {price}</li>
            </ul>
            <ul>
                <li><button onClick={props.delCart}>Delete Article</button></li>
            </ul>
        </>
    )
}         

export default ContentCart;