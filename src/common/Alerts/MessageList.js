import React from 'react'
import Message from './Message'
import './alerts.scss'

const MessageList = props => (
    <div className="message-list">
        {props.data.map( item => ( 
            <Message danger={item.error} removeAlert={props.removeAlert} item={item} key={item.id} />
        ))}
    </div>
)

export default MessageList