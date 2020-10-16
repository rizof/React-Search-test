import React from 'react'

const ContentCart = (props) => {
    return (
        <>
            <ul>
                <li> {props.prod.name}</li>
            </ul>
            <ul>
                <li> {props.prod.price}</li>
            </ul>
            <ul>
                <li><button onClick={props.delCart}>Delete Article</button></li>
            </ul>
        </>
    )
}         

export default ContentCart;