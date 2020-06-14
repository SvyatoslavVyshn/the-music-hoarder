import React, { Component } from "react"

import "./progressbar.scss"

class ProgressBar extends Component {
    interval = null

    step = 0

    state = {
        width: 0,
    }

    componentDidMount() {
        this.step = (this.props.interval / this.props.duration) * 100

        this.interval = setInterval(this.handleProgress, this.props.interval)
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    handleProgress = () => {
        if (this.state.width >= 100) {
            setTimeout(this.props.onFinish, 400)

            clearInterval(this.interval)
        } else {
            this.setState((state) => ({ width: state.width + this.step }))
        }
    }

    render() {
        return (
            <div
                style={{ width: `${this.state.width}%` }}
                id="application-progress"
                className="application-progress-bar"
            />
        )
    }
}

export default ProgressBar

// import React, { useState, useEffect } from "react"
// import "./progressbar.scss"

// const ProgressBar = (props) => {
//     let interval = null
//     let step = 0

//     const [stateWidth, setStateWidth] = useState(0)

//     const handleProgress = () => {
//         if (stateWidth >= 100) {
//             setTimeout(props.onFinish, 400)
//             clearInterval(interval)
//         } else {
//             setStateWidth(stateWidth + step)
//         }
//     }

//     useEffect(() => {
//         step = (props.interval / props.duration) * 360
//         interval = setInterval(handleProgress, props.interval)

//         return () => {
//             clearInterval(interval)
//         }
//     }, [props.interval, props.duration])

//     return (
//         <div
//             id="application-progress"
//             className="application-progress-bar"
//             style={{ width: `${stateWidth}` }}
//         />
//     )
// }

// export default ProgressBar
