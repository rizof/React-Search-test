import React from 'react'

const InfoAlert = function (props) {

    return (
        <span style={{color: props.color}}>{props.children}</span>
    )
}

export default InfoAlert;