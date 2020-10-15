import React from 'react'

const ContentCart = (props) => {
    return (
        <table>
            <ul>
                <li> {props.prod.name}</li>
            </ul>
            <ul>
                <li> {props.prod.price}</li>
            </ul>
        </table>
    )
}         

export default ContentCart;