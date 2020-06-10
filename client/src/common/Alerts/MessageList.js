import React from 'react'
import Message from './Message'
import './alerts.scss'

const MessageList = props => (
    <div className="messages-list-outer-container">
        <div className="container">
            <div className="messages-list">
            {props.data.map( item => ( 
                <Message danger={item.error} removeAlert={props.removeAlert} item={item} key={item.id} />
            ))}
            </div>
        </div>
    </div>
)

export default MessageList