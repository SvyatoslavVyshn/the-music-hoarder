import React from 'react'
import { useSelector } from 'react-redux'
import { removeAlert } from '../../store/alerts/actions'
import MessageList from './MessageList'

const Alerts = props => {
    const alerts = useSelector(state => state.alerts)
    
    if(props.alerts.length > 0) {
        return <MessageList removeAlert={removeAlert} data={alerts} />
    }
    return null
}

export default Alerts
